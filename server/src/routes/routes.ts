import { type Request, type Response, Router } from "express";
import {
	getCollaboratorController,
	setCollaboratorController,
	getCollaboratorWithIdController,
	editCollaboratorController,
} from "../database/controller/CollaboratorController";
import { setUsersController } from "../database/controller/UserController";

const routers = Router();

routers.post("/api/user", (req: Request, res: Response) =>
	setUsersController(req, res),
);

routers.post("/api/collaborator", (req: Request, res: Response) =>
	setCollaboratorController(req, res),
);

routers.get("/api/collaborators", (req: Request, res: Response) =>
	getCollaboratorController(req, res),
);

routers.get("/api/collaborator/:id", (req: Request, res: Response) =>
	getCollaboratorWithIdController(req, res),
);

routers.put("/api/collaborator/:id", (req: Request, res: Response) =>
	editCollaboratorController(req, res),
);

export default routers;
