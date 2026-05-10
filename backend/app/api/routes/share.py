from __future__ import annotations

from fastapi import APIRouter
from fastapi.responses import HTMLResponse

from app.core.config import get_settings

router = APIRouter()


@router.get("/share/{public_id}", response_class=HTMLResponse)
def share_preview(public_id: str) -> HTMLResponse:
    """
    Minimal HTML with Open Graph tags so shared links render a preview.
    This endpoint does not expose personal data; it links to the public report page.
    """
    settings = get_settings()
    report_url = f"{settings.frontend_public_base_url.rstrip('/')}/report/{public_id}"
    title = "AI Spend Audit Report"
    description = "See the AI Spend Audit results: savings estimate, per-tool recommendations, and summary."

    html = f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>{title}</title>
    <meta property="og:title" content="{title}" />
    <meta property="og:description" content="{description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{report_url}" />
    <meta name="twitter:card" content="summary" />
    <meta http-equiv="refresh" content="0; url={report_url}" />
  </head>
  <body>
    <p>Redirecting to <a href="{report_url}">{report_url}</a>…</p>
  </body>
</html>"""
    return HTMLResponse(content=html, status_code=200)

