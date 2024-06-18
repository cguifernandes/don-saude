import MagnifyingGlass from "../../assets/icons/MagnifyingGlass";
import SlidersHorizontal from "../../assets/icons/SlidersHorizontal";
import Button from "../button";
import Input from "../input";
import User from "../../assets/icons/User";
import PencilSimple from "../../assets/icons/PencilSimple";
import ShieldSlash from "../../assets/icons/ShieldSlash";
import Password from "../../assets/icons/Password";
import ClockCounterClockwise from "../../assets/icons/ClockCounterClockwise";
import CaretDown from "../../assets/icons/CaretDown";
import { useEffect, useState } from "react";
import { url } from "../../utils/utils";
import toast from "react-hot-toast";
import Skeleton from "../skeleton";
import type { CollaboratorProps } from "../../types/types";

const TableCollaborators = ({ selectedItem }: { selectedItem: number }) => {
	const [collaborators, setCollaborators] = useState<CollaboratorProps[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const isWithAcessSystem = selectedItem === 0;

	useEffect(() => {
		setIsLoading(true);

		fetch(`${url}/api/getCollaborators`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(async (response) => {
				const data = await response.json();
				console.log(data);

				setCollaborators(data.data);
			})
			.catch((err) => {
				toast.error("Ocorreu um erro ao buscar os colaboradores");
				console.log(`Ocorreu um erro: ${err}`);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<table className="bg-white w-full rounded-2xl">
			<thead>
				<tr>
					<th colSpan={6} className="px-3 pt-4 pb-2">
						<div className="flex items-center justify-between gap-2">
							<Input
								className="!rounded-full !h-[37px] w-80"
								placeholder="Buscar usuário"
								icon={<MagnifyingGlass className="text-gray-400" />}
							/>
							<Button
								icon={<SlidersHorizontal className="text-gray-400" />}
								theme="empty"
								className="flex items-center font-normal gap-x-2 text-gray-400 border border-gray-100 !rounded-xl w-32"
							>
								Colunas
							</Button>
						</div>
					</th>
				</tr>
				<tr className="text-xs text-gray-400 border-y border-y-gray-100/50">
					<th className="font-medium text-start pt-4 pb-2 px-3">Nome</th>
					<th className="font-medium text-start pt-4 pb-2 px-3">E-mail</th>
					<th className="font-medium text-start pt-4 pb-2 px-3">CPF</th>
					<th className="font-medium text-start pt-4 pb-2 px-3">Telefone</th>
					{isWithAcessSystem && (
						<th className="font-medium text-start pt-4 pb-2 px-3">
							Unidades do grupo
						</th>
					)}
					<th className="font-medium text-start pt-4 pb-2 px-3">Ações</th>
				</tr>
			</thead>
			<tbody>
				{isLoading
					? Array.from({ length: 3 }).map((_, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<tr key={index} className="border-b border-gray-100/50">
								<td className="py-3 px-3 text-xs text-gray-700 font-medium">
									<div className="flex items-center gap-x-2">
										<Skeleton isRoundedFull className="size-5 rounded-full" />
										<Skeleton width={123} height={15} />
									</div>
								</td>
								<td className="py-3 px-3 text-xs text-gray-700 font-medium truncate">
									<Skeleton width={93} height={15} />
								</td>
								<td className="py-3 px-3 text-xs text-gray-700 font-medium">
									<Skeleton width={110} height={15} />
								</td>
								<td className="py-3 px-3 text-xs text-gray-700 font-medium">
									<Skeleton width={100} height={15} />
								</td>
								{isWithAcessSystem && (
									<td className="py-3 px-3 text-xs text-gray-700 font-medium">
										<Skeleton width={100} height={15} />
									</td>
								)}
								<td className="py-3 px-3 text-xs text-gray-700 font-medium w-20">
									<div className="flex items-center gap-x-2 w-20">
										<button
											type="button"
											className="rounded-full !size-4 flex items-center justify-center"
										>
											<PencilSimple className="text-gray-400" />
										</button>
										<button
											type="button"
											className="rounded-full !size-4 flex items-center justify-center"
										>
											<ShieldSlash className="text-gray-400" />
										</button>
										<button
											type="button"
											className="rounded-full !size-4 flex items-center justify-center"
										>
											<Password className="text-gray-400" />
										</button>
										<button
											type="button"
											className="rounded-full !size-4 flex items-center justify-center"
										>
											<ClockCounterClockwise className="text-gray-400" />
										</button>
									</div>
								</td>
							</tr>
						))
					: collaborators.map((collaborator) => (
							<tr
								key={collaborator.id}
								className="text-sm text-gray-700 border-b border-gray-100/50"
							>
								<td className="py-3 px-3 text-xs text-gray-700 font-medium">
									<div className="flex items-center gap-x-2">
										<span className="size-5 bg-gray-200 truncate flex items-center justify-center rounded-full">
											<User className="size-3 text-gray-500" />
										</span>
										<span className="max-w-28 w-full truncate">
											{collaborator.name}
										</span>
									</div>
								</td>
								<td className="py-3 max-w-28 px-3 text-xs text-gray-700 font-medium truncate">
									{collaborator.email}
								</td>
								<td className="py-3 px-3 max-w-28 truncate text-xs text-gray-700 font-medium">
									{collaborator.cpf}
								</td>
								<td className="py-3 px-3 max-w-28 truncate text-xs text-gray-700 font-medium">
									{collaborator.tel}
								</td>
								{isWithAcessSystem && (
									<td className="py-3 px-3 max-w-28 truncate text-xs text-gray-700 font-medium">
										{collaborator.user?.email}
									</td>
								)}
								<td className="py-3 px-3 text-xs text-gray-700 font-medium w-20">
									<div className="flex items-center gap-x-2 w-20">
										<button
											type="button"
											className="rounded-full !size-4 flex items-center justify-center"
										>
											<PencilSimple className="text-gray-400" />
										</button>
										<button
											type="button"
											className="rounded-full !size-4 flex items-center justify-center"
										>
											<ShieldSlash className="text-gray-400" />
										</button>
										<button
											type="button"
											className="rounded-full !size-4 flex items-center justify-center"
										>
											<Password className="text-gray-400" />
										</button>
										<button
											type="button"
											className="rounded-full !size-4 flex items-center justify-center"
										>
											<ClockCounterClockwise className="text-gray-400" />
										</button>
									</div>
								</td>
							</tr>
						))}
			</tbody>
			<tfoot>
				<tr>
					<td colSpan={6}>
						<div className="w-full justify-between flex items-center pt-5 pb-1 px-3">
							<div className="flex items-center text-gray-400 text-xs">
								Mostrando&nbsp;
								<div className="px-2 py-1 rounded-full bg-gray-200 font-medium flex items-center gap-x-1 border border-gray-100 w-fit text-gray-700">
									10
									<CaretDown className="!size-[6px] rotate-180 stroke-2 text-gray-700" />
								</div>
								&nbsp; de&nbsp;
								<b className="text-gray-700">432</b>&nbsp; resultados
							</div>
							<div className="text-xs gap-x-2 flex items-center font-medium text-gray-400">
								<button
									type="button"
									className="flex items-center justify-center size-3"
								>
									<CaretDown className="!size-[6px] -rotate-90 stroke-2 text-gray-700" />
								</button>
								1
								<button
									type="button"
									className="flex items-center justify-center size-3"
								>
									<CaretDown className="!size-[6px] rotate-90 stroke-2 text-gray-700" />
								</button>
							</div>
						</div>
					</td>
				</tr>
			</tfoot>
		</table>
	);
};

export default TableCollaborators;
