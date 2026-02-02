import os
from pydoc import html
import traceback
from typing import Optional, Dict, Any
from newspaper import Article
from fastapi import FastAPI, HTTPException
from fastapi.datastructures import URL
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
    
    title: str
    publish_date: str
    authors: list[str]
    top_image: str
    content: str


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
                wait_until="load",
                timeout=req.timeout_ms,
            )

            await page.wait_for_load_state("load")
            await page.wait_for_timeout(10000)
            html = await page.content()
    
            article = Article(str(req.url), language="en")
            article.set_html(html)  # <-- key: inject HTML thay vì download
            article.parse() 
            # Trích xuất dữ liệu
            print("Tiêu đề:", article.title)
            print("Tác giả:", article.authors)
            print("Ngày xuất bản:", article.publish_date)
            print("Nội dung chính:", article.text)
            print("Ảnh nổi bật:", article.top_image)
            print("Video:", article.movies)
            print("-" * 100)

            return FetchResponse(
                ok=True,
                url=str(req.url),
                html=html,
                
                title=article.title,
                publish_date=str(article.publish_date),
                authors=article.authors,
                top_image=article.top_image,
                content=article.text,
            )

    except PwTimeoutError:
        raise HTTPException(status_code=504, detail=f"Timeout after {req.timeout_ms}ms")
    except HTTPException:
        raise
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
