import { AppDataSource } from "../../database/data-source";
import { HttpStatusCode } from "../../types/types";
import type { CollaboratorProps } from "../../../../common/types";
import Collaborator from "../entities/Collaborator";
require("dotenv").config();

const collaboratorRepository = AppDataSource.getRepository(Collaborator);

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

	const collaborator = collaboratorRepository.create({ ...newCollaborator });

	return {
		data: collaborator,
		status: HttpStatusCode.created,
		message: "Colaborador cadastrado com sucesso",
	};
};
