import { Link } from "react-router-dom";
import CaretDown from "../../assets/icons/CaretDown";
import FormCollaborators from "../Forms/form-collaborators";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useCollaboratorContext } from "../../context/CollaboratorContext";

const EditCollaborator = () => {
	const { fetchCollaboratorById, collaborator } = useCollaboratorContext();
	useEffect(() => {
		document.title = "Don Saúde | Editar colaborador";
	}, []);

	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setIsLoading(true);

		fetchCollaboratorById(id)
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
			<FormCollaborators
				isLoadingComponents={isLoading}
				defaultValues={collaborator}
				isEditAction
			/>
		</main>
	);
};

export default EditCollaborator;
