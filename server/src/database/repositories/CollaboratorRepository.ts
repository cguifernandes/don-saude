import { AppDataSource } from "../../database/data-source";
import { type CollaboratorProps, HttpStatusCode } from "../../types/types";
import Collaborator from "../entities/Collaborator";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../entities/User";
require("dotenv").config();

const collaboratorRepository = AppDataSource.getRepository(Collaborator);
const userRepository = AppDataSource.getRepository(User);

export const setCollaborator = async (
	newCollaborator: CollaboratorProps & { password?: string; token?: string },
) => {
	if (
		!newCollaborator.cpf ||
		!newCollaborator.email ||
		!newCollaborator.name ||
		!newCollaborator.tel ||
		!newCollaborator.password ||
		!newCollaborator.token
	) {
		return {
			status: HttpStatusCode.noContent,
			data: undefined,
			message: "Usuário inválido",
		};
	}
	const decodedToken = jwt.verify(
		newCollaborator.token,
		process.env.JWT_SECRET ?? "",
	) as { userId: string };

	if (!decodedToken || !decodedToken.userId) {
		return {
			status: HttpStatusCode.unauthorized,
			data: undefined,
			message: "Token inválido",
		};
	}

	const user = await userRepository.findOne({
		where: { id: decodedToken.userId },
	});

	if (!user) {
		return {
			status: HttpStatusCode.notFound,
			data: undefined,
			message: "Usuário não encontrado",
		};
	}

	const comparedPassword = await bcrypt.compare(
		newCollaborator.password,
		user.password,
	);

	if (!comparedPassword) {
		return {
			status: HttpStatusCode.unauthorized,
			data: undefined,
			message: "Senha inválida",
		};
	}

	const collaborator = collaboratorRepository.create({
		...newCollaborator,
		user: user,
	});
	await collaboratorRepository.save(collaborator);

	return {
		data: collaborator,
		status: HttpStatusCode.created,
		message: "Colaborador cadastrado com sucesso",
	};
};

export const getCollaborator = async () => {
	const collaborator = await collaboratorRepository.find({
		relations: ["user"],
	});

	return {
		data: collaborator,
		status: HttpStatusCode.ok,
		message: "Colaboradores encontrados",
	};
};
