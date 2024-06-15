import User, { type UserProps } from "../entities/User";
import { AppDataSource } from "../../database/data-source";
import { HttpStatusCode } from "../../types/types";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
require("dotenv").config();

const userRepository = AppDataSource.getRepository(User);

export const setUsers = async (newUser: UserProps) => {
	const users = await userRepository.find();
	console.log({ users });
	const existUser = await userRepository.existsBy({
		email: newUser.email,
	});

	if (!newUser.email || !newUser.password || !newUser.rememberMe) {
		return {
			status: HttpStatusCode.badRequest,
			data: undefined,
			message: "Usuário inválido.",
		};
	}

	if (existUser) {
		return {
			message: "Este usuário já existe.",
			status: HttpStatusCode.notFound,
			data: undefined,
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

	console.log({
		user,
		token,
	});

	return {
		data: user,
		status: HttpStatusCode.created,
		message: "Usuário criado com sucesso.",
		token,
	};
};
