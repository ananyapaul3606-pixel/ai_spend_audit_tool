from __future__ import annotations

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_ignore_empty=True, extra="ignore")

    app_env: str = "development"
    app_name: str = "AI Spend Audit Tool API"
    app_cors_origins: str = "http://localhost:5173"

    database_url: str
    nvidia_api_key: str | None = None
    nvidia_model: str | None = None
    nvidia_chat_completions_url: str = "https://integrate.api.nvidia.com/v1/chat/completions"

    # SMTP (lead confirmation) - optional
    smtp_host: str | None = None
    smtp_port: int = 587
    smtp_user: str | None = None
    smtp_password: str | None = None
    smtp_from: str | None = None
    smtp_starttls: bool = True

    # Public sharing
    frontend_public_base_url: str = "http://localhost:5173"

    @property
    def sqlalchemy_database_url(self) -> str:
        if self.database_url.startswith("postgresql://"):
            return self.database_url.replace("postgresql://", "postgresql+psycopg://", 1)
        return self.database_url

    @property
    def cors_origins(self) -> list[str]:
        return [o.strip() for o in self.app_cors_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
