import User from "../entities/User";
import { AppDataSource } from "../../database/data-source";
import { HttpStatusCode } from "../../types/types";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import type { UserProps } from "../../../../common/types";
require("dotenv").config();

const userRepository = AppDataSource.getRepository(User);

export const setUsers = async (newUser: UserProps) => {
	const existUser = await userRepository.findOne({
		where: { email: newUser.email },
	});

	if (!newUser.email || !newUser.password || !newUser.rememberMe) {
		return {
			status: HttpStatusCode.noContent,
			data: undefined,
			message: "Usuário inválido",
		};
	}

	if (existUser) {
		const token = jwt.sign(
			{ userId: existUser.id, email: existUser.email },
			process.env.JWT_SECRET ?? "",
			{
				expiresIn: newUser.rememberMe ? "7d" : "1h",
			},
		);

		return {
			message: "Login foi um sucesso, você será direcionado",
			status: HttpStatusCode.ok,
			data: existUser,
			token,
		};
	}

	const hash = await bcrypt.hash(newUser.password, 10);
	const user = userRepository.create({ ...newUser, password: hash });
	await userRepository.save(user);

	const token = jwt.sign(
		{ userId: user.id, email: user.email },
		process.env.JWT_SECRET ?? "",
		{
			expiresIn: newUser.rememberMe ? "7d" : "1h",
		},
	);

	return {
		data: user,
		status: HttpStatusCode.created,
		message: "Usuário criado com sucesso",
		token,
	};
};
