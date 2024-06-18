import { Router } from "express";
import { setUsersController } from "../database/controller/UserController";
import { setCollaboratorController } from "src/database/controller/CollaboratorController";

const routers = Router();

routers.post("/api/users", setUsersController);

routers.post("/api/collaborator", setCollaboratorController);

export default routers;
