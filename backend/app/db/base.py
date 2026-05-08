from __future__ import annotations

from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


# Ensure model metadata is registered for Alembic autogenerate (and clarity).
from app import models as _models  # noqa: E402,F401
