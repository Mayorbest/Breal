from fastapi import APIRouter,status, Depends
from sqlalchemy.orm import Session
from repository import database
from service import projectService

project_router = APIRouter()


@project_router.get('/client/projects')
def get_client_projects(db: Session = Depends(database.get_db)):
    return projectService.get_projects(db)

@project_router.get('client/projects/{project_id}')
def get_client_project_by_id(project_id, db: Session = Depends(database.get_db)):
    return projectService.get_project_by_id(project_id,db)
