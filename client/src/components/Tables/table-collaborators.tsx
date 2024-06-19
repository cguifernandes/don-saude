import MagnifyingGlass from "../../assets/icons/MagnifyingGlass";
import SlidersHorizontal from "../../assets/icons/SlidersHorizontal";
import Button from "../button";
import Input from "../input";
import User from "../../assets/icons/User";
import PencilSimple from "../../assets/icons/PencilSimple";
import ShieldSlash from "../../assets/icons/ShieldSlash";
import Password from "../../assets/icons/Password";
import ClockCounterClockwise from "../../assets/icons/ClockCounterClockwise";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Skeleton from "../skeleton";
import { useCollaboratorContext } from "../../context/CollaboratorContext";
import Select from "../select";
import Pagination from "../pagination";

const TableCollaborators = ({ selectedItem }: { selectedItem: number }) => {
	const { fetchCollaborators, collaborators, searchCollaborator, count } =
		useCollaboratorContext();
	const [isLoading, setIsLoading] = useState(false);
	const [selectedValueView, setSelectedValueView] = useState("10");
	const [page, setPage] = useState(1);
	const isWithAcessSystem = selectedItem === 0;
	const totalPages = Math.ceil(count / Number.parseInt(selectedValueView));

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setIsLoading(true);

		fetchCollaborators(page, Number.parseInt(selectedValueView))
			.catch((err) => {
				toast.error("Ocorreu um erro ao buscar os colaboradores", {
					position: "bottom-right",
				});
				console.log(`Ocorreu um erro: ${err}`);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [page, selectedValueView]);

	const handlerSearchCollaborator = (query: string) => {
		setIsLoading(true);
		setPage(1);

		if (query.trim() === "") {
			fetchCollaborators(page, Number.parseInt(selectedValueView))
				.catch((err) => {
					toast.error("Ocorreu um erro ao buscar os colaboradores", {
						position: "bottom-right",
					});
					console.log(`Ocorreu um erro: ${err}`);
				})
				.finally(() => {
					setIsLoading(false);
				});
		} else {
			searchCollaborator(query)
				.catch((err) => {
					toast.error("Ocorreu um erro ao buscar os colaboradores", {
						position: "bottom-right",
					});
					console.log(`Ocorreu um erro: ${err}`);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	};

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
								onChange={(e) => handlerSearchCollaborator(e.target.value)}
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
										<Skeleton isRoundedFull className="rounded-full !size-4" />
										<Skeleton isRoundedFull className="rounded-full !size-4" />
										<Skeleton isRoundedFull className="rounded-full !size-4" />
										<Skeleton isRoundedFull className="rounded-full !size-4" />
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
										Partner Name
									</td>
								)}
								<td className="py-3 px-3 text-xs text-gray-700 font-medium w-20">
									<div className="flex items-center gap-x-2 w-20">
										<button
											type="button"
											className="rounded-full !size-4 flex items-center justify-center"
										>
											<a
												href={`/dashboard/edit-collaborator/${collaborator.id}`}
											>
												<PencilSimple className="text-gray-400" />
											</a>
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
								<Select
									selectedDefault="10"
									setSelectedValue={setSelectedValueView}
									options={[
										{
											value: "5",
											label: "5",
										},
										{
											value: "10",
											label: "10",
										},
										{
											value: "15",
											label: "15",
										},
									]}
								/>
								&nbsp; de&nbsp;
								<b className="text-gray-700">{count}</b>&nbsp;resultados
							</div>
							<Pagination
								totalPages={totalPages}
								page={page}
								setPage={setPage}
							/>
						</div>
					</td>
				</tr>
			</tfoot>
		</table>
	);
};

export default TableCollaborators;
