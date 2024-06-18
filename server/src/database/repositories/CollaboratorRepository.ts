import { AppDataSource } from "../../database/data-source";
import { type CollaboratorProps, HttpStatusCode } from "../../types/types";
import Collaborator from "../entities/Collaborator";
import bcrypt from "bcrypt";
require("dotenv").config();

const collaboratorRepository = AppDataSource.getRepository(Collaborator);

export const setCollaborator = async (newCollaborator: CollaboratorProps) => {
	if (
		!newCollaborator.cpf ||
		!newCollaborator.email ||
		!newCollaborator.name ||
		!newCollaborator.tel ||
		!newCollaborator.password ||
		!newCollaborator.nameFile
	) {
		return {
			status: HttpStatusCode.noContent,
			data: undefined,
			message: "Usuário inválido",
		};
	}
	const hash = await bcrypt.hash(newCollaborator.password, 10);
	const collaborator = collaboratorRepository.create({
		...newCollaborator,
		password: hash,
	});

	await collaboratorRepository.save(collaborator);

	return {
		data: collaborator,
		status: HttpStatusCode.created,
		message: "Colaborador cadastrado com sucesso",
	};
};

export const getCollaborator = async () => {
	const collaborator = await collaboratorRepository.find();

	return {
		data: collaborator,
		status: HttpStatusCode.ok,
		message: "Colaboradores encontrados",
	};
};

export const getCollaboratorWithId = async (id?: string) => {
	if (!id) {
		return {
			status: HttpStatusCode.noContent,
			data: undefined,
			message: "O ID não foi fornecido",
		};
	}

	const existUser = await collaboratorRepository.findOne({
		where: { id },
	});

	if (!existUser) {
		return {
			status: HttpStatusCode.notFound,
			data: undefined,
			message: "Colaborador não encontrado",
		};
	}

	return {
		message: "Usuàrio encontrado com sucesso",
		status: HttpStatusCode.ok,
		data: existUser,
	};
};
