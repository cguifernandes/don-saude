import type { Request, Response } from "express";
import { setUsers } from "../repositories/UserRepository";

export const setUsersController = async (req: Request, res: Response) => {
	const newUser = req.body;

	res.json(await setUsers(newUser));
};
