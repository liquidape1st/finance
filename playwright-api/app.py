import os
from typing import Optional, Dict, Any

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, HttpUrl
from playwright.async_api import async_playwright, TimeoutError as PwTimeoutError

app = FastAPI(title="Playwright API", version="1.0.0")


class FetchRequest(BaseModel):
    url: HttpUrl
    wait_until: str = "domcontentloaded"  # "load" | "domcontentloaded" | "networkidle"
    timeout_ms: int = 30000
    user_agent: Optional[str] = None
    headers: Optional[Dict[str, str]] = None
    cookies: Optional[Dict[str, str]] = (
        None  # cookie dạng {"name":"value"} áp vào domain URL
    )
    javascript_enabled: bool = True
    block_resources: bool = True  # chặn ảnh/font/media để nhanh hơn
    viewport: Optional[Dict[str, int]] = None  # {"width": 1366, "height": 768}
    take_screenshot: bool = False  # trả về screenshot base64 (png)


class FetchResponse(BaseModel):
    ok: bool
    url: str
    final_url: str
    status: int
    title: str
    html: str
    text: str
    screenshot_base64: Optional[str] = None


def _env_bool(key: str, default: bool) -> bool:
    val = os.getenv(key)
    if val is None:
        return default
    return val.strip().lower() in ("1", "true", "yes", "y", "on")


@app.get("/health")
async def health():
    return {"ok": True}


@app.post("/fetch", response_model=FetchResponse)
async def fetch(req: FetchRequest):
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(
                headless=True,
                args=[
                    "--no-sandbox",
                    "--disable-dev-shm-usage",
                ],
            )

            context_kwargs: Dict[str, Any] = {
                "java_script_enabled": req.javascript_enabled,
            }
            if req.user_agent:
                context_kwargs["user_agent"] = req.user_agent
            if req.viewport:
                context_kwargs["viewport"] = req.viewport

            context = await browser.new_context(**context_kwargs)

            if req.headers:
                await context.set_extra_http_headers(req.headers)

            # set cookies nếu có
            if req.cookies:
                # Playwright cần list cookies có domain/path.
                # Ta suy ra domain từ URL req.url
                from urllib.parse import urlparse

                u = urlparse(str(req.url))
                domain = u.hostname
                if not domain:
                    raise HTTPException(
                        status_code=400, detail="Invalid URL hostname for cookies"
                    )
                cookies = []
                for name, value in req.cookies.items():
                    cookies.append(
                        {
                            "name": name,
                            "value": value,
                            "domain": domain,
                            "path": "/",
                        }
                    )
                await context.add_cookies(cookies)

            page = await context.new_page()

            if req.block_resources:

                async def route_handler(route):
                    rtype = route.request.resource_type
                    if rtype in ("image", "media", "font"):
                        await route.abort()
                    else:
                        await route.continue_()

                await page.route("**/*", route_handler)

            resp = await page.goto(
                str(req.url),
                wait_until=req.wait_until,
                timeout=req.timeout_ms,
            )

            if resp is None:
                raise HTTPException(
                    status_code=502,
                    detail="No response (possibly blocked or navigation failed)",
                )

            status = resp.status
            final_url = page.url
            title = await page.title()

            # html/text
            html = await page.content()
            text = await page.evaluate(
                "() => document.body ? document.body.innerText : ''"
            )

            screenshot_b64 = None
            if req.take_screenshot:
                import base64

                png_bytes = await page.screenshot(full_page=True, type="png")
                screenshot_b64 = base64.b64encode(png_bytes).decode("utf-8")

            await context.close()
            await browser.close()

            return FetchResponse(
                ok=True,
                url=str(req.url),
                final_url=final_url,
                status=status,
                title=title,
                html=html,
                text=text,
                screenshot_base64=screenshot_b64,
            )

    except PwTimeoutError:
        raise HTTPException(status_code=504, detail=f"Timeout after {req.timeout_ms}ms")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
