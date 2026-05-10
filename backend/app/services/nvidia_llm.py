from __future__ import annotations

import httpx

from app.core.config import get_settings


class NvidiaLLMError(RuntimeError):
    pass


def nvidia_chat_completion(prompt: str) -> str:
    """
    Calls NVIDIA's OpenAI-compatible Chat Completions endpoint.

    If the key/model is missing, raise NvidiaLLMError so callers can fallback.
    """
    settings = get_settings()
    if not settings.nvidia_api_key:
        raise NvidiaLLMError("NVIDIA_API_KEY is not set")
    if not settings.nvidia_model:
        raise NvidiaLLMError("NVIDIA_MODEL is not set")

    payload = {
        "model": settings.nvidia_model,
        "messages": [
            {"role": "system", "content": "You are a concise SaaS spend auditor."},
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.2,
        "max_tokens": 220,
    }

    headers = {
        "Authorization": f"Bearer {settings.nvidia_api_key}",
        "Content-Type": "application/json",
    }

    try:
        with httpx.Client(timeout=12.0) as client:
            res = client.post(settings.nvidia_chat_completions_url, json=payload, headers=headers)
    except httpx.HTTPError as e:
        raise NvidiaLLMError(f"NVIDIA request failed: {e}") from e

    if res.status_code >= 400:
        raise NvidiaLLMError(f"NVIDIA returned HTTP {res.status_code}: {res.text}")

    data = res.json()
    try:
        return str(data["choices"][0]["message"]["content"]).strip()
    except Exception as e:  # noqa: BLE001
        raise NvidiaLLMError(f"Unexpected NVIDIA response shape: {data}") from e

