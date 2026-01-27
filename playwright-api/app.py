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


class FetchResponse(BaseModel):
    ok: bool
    url: str
    html: str


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
            )
            page = await browser.new_page()
            await page.goto(
                str(req.url),
                wait_until="networkidle",
                timeout=req.timeout_ms,
            )

            html = await page.content()

            await browser.close()

            return FetchResponse(
                ok=True,
                url=str(req.url),
                html=html,
            )

    except PwTimeoutError:
        raise HTTPException(status_code=504, detail=f"Timeout after {req.timeout_ms}ms")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
