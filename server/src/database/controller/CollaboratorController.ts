import type { Request, Response } from "express";
import { setCollaborator } from "../repositories/CollaboratorRepository";

export const setCollaboratorController = async (
	req: Request,
	res: Response,
) => {
	const newController = req.body;

	res.json(await setCollaborator(newController));
};
