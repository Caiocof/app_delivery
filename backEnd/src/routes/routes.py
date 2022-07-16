from fastapi import FastAPI

from src.routes.auth_routes import auth_router


def include_routes(app: FastAPI):
    app.include_router(auth_router)
