from fastapi import FastAPI

from src.routes.tenant_routes import tenant_router
from src.routes.user_routes import user_router
from src.routes.role_routes import role_router


def include_routes(app: FastAPI):
    app.include_router(tenant_router)
    app.include_router(user_router)
    app.include_router(role_router)
