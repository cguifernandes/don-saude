import type { Request, Response } from "express";
import { setCollaborator } from "../repositories/CollaboratorRepository";

export const setCollaboratorController = async (
	req: Request,
	res: Response,
) => {
	const newCollaborator = req.body;

	res.json(await setCollaborator(newCollaborator));
};
