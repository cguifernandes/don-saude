import { Link } from "react-router-dom";
import CaretDown from "../../assets/icons/CaretDown";
import FormNewCollaborators from "../Forms/form-collaborators";
import { useEffect, useState } from "react";
import { url } from "../../utils/utils";
import type { CollaboratorProps } from "../../types/types";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const EditCollaborator = () => {
	const { id } = useParams();
	const [collaborator, setCollaborator] = useState<CollaboratorProps>();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		if (!id) {
			toast.error("Ocorreu um erro ao editar um colaborador", {
				position: "bottom-right",
			});

			return;
		}

		fetch(`${url}/api/collaborator/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(async (response) => {
				const data = await response.json();

				setCollaborator(data.data);
			})
			.catch((err) => {
				toast.error("Ocorreu um erro ao buscar os colaboradores", {
					position: "bottom-right",
				});
				console.log(`Ocorreu um erro: ${err}`);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [id]);

	return (
		<main className="flex-1 min-h-full bg-[#F2F4F7] px-10 py-8">
			<header className="flex justify-between">
				<Link
					to="/dashboard/collaborators"
					className="text-2xl font-bold text-gray-700 flex gap-x-2 items-center"
				>
					<CaretDown className="-rotate-90 size-[19px]" /> Editar colaborador
				</Link>
			</header>
			<FormNewCollaborators defaultValues={collaborator} isEditAction />
		</main>
	);
};

export default EditCollaborator;
