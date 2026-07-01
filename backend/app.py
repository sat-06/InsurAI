from fastapi import FastAPI

from backend.routes.predict import router as predict_router
from backend.routes.risk import router as risk_router
from backend.routes.segmentation import router as segmentation_router
from backend.routes.underwriting import router as underwriting_router

app = FastAPI(
    title="InsurAI API",
    version="1.0.0",
    description="AI Powered Health Insurance Analytics Platform"
)

app.include_router(predict_router)
app.include_router(risk_router)
app.include_router(segmentation_router)
app.include_router(underwriting_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to InsurAI API"
    }