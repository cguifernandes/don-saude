import { Link } from "react-router-dom";
import CaretDown from "../../assets/icons/CaretDown";
import FormCollaborators from "../Forms/form-collaborators";
import { useEffect } from "react";

const NewCollaborators = () => {
	useEffect(() => {
		document.title = "Don Saúde | Novo colaborador";
	}, []);

	return (
		<main className="flex-1 min-h-full bg-[#F2F4F7] px-10 py-8">
			<header className="flex justify-between">
				<Link
					to="/dashboard/collaborators"
					className="text-2xl font-bold text-gray-700 flex gap-x-2 items-center"
				>
					<CaretDown className="-rotate-90 size-[19px]" /> Novo colaborador
				</Link>
			</header>
			<FormCollaborators />
		</main>
	);
};

export default NewCollaborators;
