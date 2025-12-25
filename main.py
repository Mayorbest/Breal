from fastapi import FastAPI
from routers import userRouter, contractorRouter, projectRouter

app = FastAPI()
app.include_router(userRouter.user_router)
app.include_router(contractorRouter.contractor_router)
app.include_router(projectRouter.project_router)