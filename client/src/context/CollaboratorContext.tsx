import {
	createContext,
	useState,
	useContext,
	type ReactNode,
	type FC,
} from "react";
import type { CollaboratorProps } from "../types/types";
import { url } from "../utils/utils";
import toast from "react-hot-toast";

interface CollaboratorContextType {
	collaborators: CollaboratorProps[];
	collaborator: CollaboratorProps;
	fetchCollaborators: () => Promise<void>;
	fetchCollaboratorById: (id: string | undefined) => Promise<void>;
	addCollaborator: (collaborator: CollaboratorProps) => Promise<void>;
	updateCollaborator: (
		id: string,
		collaborator: CollaboratorProps,
	) => Promise<void>;
}

const CollaboratorContext = createContext<CollaboratorContextType>({
	collaborators: [],
	collaborator: {},
	fetchCollaborators: async () => {},
	fetchCollaboratorById: async () => {},
	addCollaborator: async () => {},
	updateCollaborator: async () => {},
});

export const useCollaboratorContext = () => useContext(CollaboratorContext);

export const CollaboratorProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [collaborators, setCollaborators] = useState<CollaboratorProps[]>([]);
	const [collaborator, setCollaborator] = useState<CollaboratorProps>({});

	const fetchCollaboratorById = async (id: string | undefined) => {
		try {
			if (!id) {
				toast.error("ID de colaborador não fornecido", {
					position: "bottom-right",
				});
				return;
			}

			const response = await fetch(`${url}/api/collaborator/${id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data: { data: CollaboratorProps } = await response.json();
			setCollaborator(data.data);
		} catch (error) {
			console.error("Erro ao buscar colaborador:", error);
			throw error;
		}
	};

	const fetchCollaborators = async () => {
		try {
			const response = await fetch(`${url}/api/getCollaborators`);
			const data = await response.json();
			setCollaborators(data.data);
		} catch (error) {
			console.error("Erro ao buscar colaboradores:", error);
			throw error;
		}
	};

	const addCollaborator = async (collaborator: CollaboratorProps) => {
		try {
			const response = await fetch(`${url}/api/postCollaborator`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(collaborator),
			});

			const data = await response.json();
			setCollaborators([...collaborators, data.data]);
		} catch (error) {
			console.error("Erro ao adicionar colaborador:", error);
			throw error;
		}
	};

	const updateCollaborator = async (
		id: string,
		collaborator: CollaboratorProps,
	) => {
		try {
			const response = await fetch(`${url}/api/editCollaborator/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(collaborator),
			});
			const data = await response.json();
			const updatedCollaborators = collaborators.map((c) =>
				c.id === id ? data.collaborator : c,
			);
			setCollaborators(updatedCollaborators);
		} catch (error) {
			console.error("Erro ao atualizar colaborador:", error);
			throw error;
		}
	};

	return (
		<CollaboratorContext.Provider
			value={{
				collaborators,
				collaborator,
				fetchCollaborators,
				fetchCollaboratorById,
				addCollaborator,
				updateCollaborator,
			}}
		>
			{children}
		</CollaboratorContext.Provider>
	);
};
