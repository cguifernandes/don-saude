import User from "../entities/User";
import { AppDataSource } from "../../database/data-source";
import { HttpStatusCode } from "../../types/types";
import type { CollaboratorProps } from "../../../../common/types";
require("dotenv").config();

const userRepository = AppDataSource.getRepository(User);

export const setCollaborator = async (newCollaborator: CollaboratorProps) => {
	if (
		!newCollaborator.cpf ||
		!newCollaborator.email ||
		!newCollaborator.name ||
		!newCollaborator.tel
	) {
		return {
			status: HttpStatusCode.noContent,
			data: undefined,
			message: "Usuário inválido",
		};
	}

	const user = userRepository.create({ ...newCollaborator });

	return {
		data: user,
		status: HttpStatusCode.created,
		message: "Colaborador cadastrado com sucesso",
	};
};
