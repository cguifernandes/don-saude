import type { Request, Response } from "express";
import {
	getCollaborator,
	setCollaborator,
} from "../repositories/CollaboratorRepository";

export const setCollaboratorController = async (
	req: Request,
	res: Response,
) => {
	const newCollaborator = req.body;

	res.json(await setCollaborator(newCollaborator));
};

export const getCollaboratorController = async (
	req: Request,
	res: Response,
) => {
	res.json(await getCollaborator());
};
