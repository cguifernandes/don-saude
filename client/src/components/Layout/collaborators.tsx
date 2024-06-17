import { useState } from "react";
import Four from "../../assets/icons/Four";
import PlusCircle from "../../assets/icons/PlusCircle";
import Button from "../button";
import { selectedItens } from "../../utils/utils";
import clsx from "clsx";
import TableCollaborators from "../Tables/table-collaborators";

const Collaborators = () => {
	const [selectedAccessItemIndex, setSelectedAccessItemIndex] = useState(0);

	return (
		<main className="flex-1 min-h-full bg-[#F2F4F7] px-10 py-8">
			<header className="flex justify-between">
				<h1 className="text-2xl font-bold text-gray-700">Colaborador</h1>
				<Button
					icon={<PlusCircle />}
					theme="solid"
					className="font-bold flex items-center gap-x-2"
				>
					Nova Categoria
				</Button>
			</header>
			<div className="w-full flex my-4 gap-x-4 h-[42px] items-center p-1 rounded-2xl bg-white">
				{selectedItens.map((item, index) => {
					const isSelected = index === selectedAccessItemIndex;
					const Icon = item.icon;

					return (
						<Button
							key={item.text}
							icon={
								<Icon
									className={clsx(
										isSelected ? "text-pure-pink-400" : "text-gray-500",
										"transition-all",
									)}
								/>
							}
							onClick={() => setSelectedAccessItemIndex(index)}
							className={clsx(
								"font-medium transition-all ease-in h-[34px] !shadow-none flex flex-1 items-center justify-center gap-x-2",
								isSelected ? "text-pure-pink-400" : "text-gray-500",
							)}
							theme={isSelected ? "soft" : "empty"}
							addOn={
								<span
									className={clsx(
										"size-3 text-white rounded-full transition-all text-[7px] flex items-center justify-center",
										isSelected ? "bg-pure-pink-400" : "bg-gray-500",
									)}
								>
									<Four />
								</span>
							}
						>
							{item.text}
						</Button>
					);
				})}
			</div>
			<TableCollaborators />
		</main>
	);
};

export default Collaborators;
