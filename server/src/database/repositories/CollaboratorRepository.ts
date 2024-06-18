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

export const editCollaborator = async (
	editCollaborator: CollaboratorProps,
	id: string,
) => {
	if (
		!editCollaborator.cpf ||
		!editCollaborator.email ||
		!editCollaborator.name ||
		!editCollaborator.tel ||
		!editCollaborator.nameFile
	) {
		return {
			status: HttpStatusCode.noContent,
			data: undefined,
			message: "Usuário inválido",
		};
	}

	const existingCollaborator = await collaboratorRepository.findOne({
		where: { id: editCollaborator.id },
	});

	if (!existingCollaborator) {
		return {
			status: HttpStatusCode.noContent,
			data: undefined,
			message: "Colaborador não encontrado",
		};
	}

	await collaboratorRepository.update(id, {
		cpf: editCollaborator.cpf,
		email: editCollaborator.email,
		name: editCollaborator.name,
		tel: editCollaborator.tel,
		password: editCollaborator.password,
		nameFile: editCollaborator.nameFile,
	});

	const updatedCollaborator = await collaboratorRepository.findOne({
		where: { id: editCollaborator.id },
	});

	return {
		data: updatedCollaborator,
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

export const removeCollaborator = async (id?: string) => {
	if (!id) {
		return {
			status: HttpStatusCode.noContent,
			data: undefined,
			message: "O ID não foi fornecido",
		};
	}

	const deletedCollaborator = await collaboratorRepository.delete(id);

	if (deletedCollaborator.affected === 0) {
		return {
			status: HttpStatusCode.notFound,
			data: undefined,
			message: "Colaborador não encontrado",
		};
	}

	return {
		message: "Usuàrio removido com sucesso",
		status: HttpStatusCode.ok,
		data: deletedCollaborator,
	};
};
