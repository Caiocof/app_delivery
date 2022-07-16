from fastapi import FastAPI
from src.routes.routes import include_routes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

include_routes(app=app)


@app.get("/")
async def root():
    return {"message": "Hello World"}
