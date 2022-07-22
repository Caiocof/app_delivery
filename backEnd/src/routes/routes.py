from fastapi import FastAPI

from src.routes.tenant_routes import tenant_router


def include_routes(app: FastAPI):
    app.include_router(tenant_router)
