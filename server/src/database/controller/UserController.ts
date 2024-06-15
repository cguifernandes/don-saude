import type { Request, Response } from "express";
import { setUsers } from "../repositories/UserRepository";

export const setUsersController = async (req: Request, res: Response) => {
	const newUser = req.body;

	const result = await setUsers(newUser);

	res.json({
		data: result.data,
		message: result.message,
		token: result.token,
	});
};
