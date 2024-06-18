import { type Request, type Response, Router } from "express";
import {
	getCollaboratorController,
	setCollaboratorController,
	getCollaboratorWithIdController,
} from "../database/controller/CollaboratorController";
import { setUsersController } from "../database/controller/UserController";

const routers = Router();

routers.post("/api/users", (req: Request, res: Response) =>
	setUsersController(req, res),
);

routers.post("/api/collaborator", (req: Request, res: Response) =>
	setCollaboratorController(req, res),
);

routers.get("/api/getCollaborators", (req: Request, res: Response) =>
	getCollaboratorController(req, res),
);

routers.get("/api/collaborator/:id", (req: Request, res: Response) =>
	getCollaboratorWithIdController(req, res),
);

export default routers;
