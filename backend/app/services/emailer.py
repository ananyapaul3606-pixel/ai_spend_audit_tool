from __future__ import annotations

import smtplib
from email.message import EmailMessage

from app.core.config import get_settings


class EmailSendError(RuntimeError):
    pass


def send_confirmation_email(*, to_email: str) -> None:
    """
    Sends a simple confirmation email via SMTP.
    If SMTP isn't configured, this is a no-op (so the product still works on free plans).
    """
    settings = get_settings()
    if not settings.smtp_host or not settings.smtp_from:
        return

    msg = EmailMessage()
    msg["Subject"] = "Your AI Spend Audit is ready"
    msg["From"] = settings.smtp_from
    msg["To"] = to_email
    msg.set_content(
        "Thanks for trying AI Spend Audit Tool.\n\n"
        "We received your email. If you'd like a deeper audit or help implementing savings, reply to this message.\n"
    )

    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=10) as server:
            if settings.smtp_starttls:
                server.starttls()
            if settings.smtp_user and settings.smtp_password:
                server.login(settings.smtp_user, settings.smtp_password)
            server.send_message(msg)
    except OSError as e:
        raise EmailSendError(str(e)) from e

