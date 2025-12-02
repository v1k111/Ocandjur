from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# Очень упрошённый вариант: один фиксированный админ‑токен
ADMIN_TOKEN = "supersecret-admin-token"

_security = HTTPBearer()


def get_admin(
    credentials: HTTPAuthorizationCredentials = Depends(_security),
):
    """Проверяет, что пришёл корректный admin‑токен."""
    if credentials.credentials != ADMIN_TOKEN:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authorized",
        )
    return {"role": "admin"}
