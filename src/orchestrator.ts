import { Application, Request, Response } from "express";
import OrchestratorController from "./controller/orchestrator";

export const startOrchestrator = (app: Application) => {
    app.get('/api/user', OrchestratorController.getUsers)
}