import type { Request, Response } from "express";
import {
	editCollaborator,
	getCollaborator,
	getCollaboratorWithId,
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

export const getCollaboratorWithIdController = async (
	req: Request,
	res: Response,
) => {
	const { id } = req.params;

	res.json(await getCollaboratorWithId(id));
};

export const editCollaboratorController = async (
	req: Request,
	res: Response,
) => {
	const collaborator = req.body;
	const { id } = req.params;

	res.json(await editCollaborator(collaborator, id));
};
