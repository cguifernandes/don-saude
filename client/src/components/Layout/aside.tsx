import { useLocation } from "react-router-dom";
import Logo from "../../assets/Logo";
import CaretDown from "../../assets/icons/CaretDown";
import SymbolIcon from "../../assets/icons/Symbol";
import Item from "../item";
import { itens } from "../../utils/utils";
import clsx from "clsx";

const SideBar = () => {
	const location = useLocation();

	return (
		<aside className="min-w-[211px] flex gap-y-12 flex-col items-center p-6 min-h-full">
			<Logo className="h-9 w-[123px]" />
			<ul className="flex flex-col gap-y-2">
				<div className="flex flex-col gap-y-3">
					{itens.slice(0, 7).map((item) => {
						const isSelected = location.pathname.endsWith(item.path);

						return (
							<Item
								key={item.text}
								text={item.text}
								href={`/dashboard/${item.path}`}
								size="sm"
								addOn={
									item.text === "Configurações" && (
										<CaretDown className="text-gray-400 min-w-[10px]" />
									)
								}
								icon={item.icon}
								className={clsx(
									isSelected
										? "bg-pure-pink-400 rounded-full text-white"
										: "text-gray-400",
									"h-[37px] flex items-center",
								)}
							/>
						);
					})}
				</div>
				<div className="bg-gray-100 w-full h-px" />
				<div className="flex flex-col gap-y-2">
					{itens.slice(7, itens.length).map((item) => {
						const isSelected = location.pathname.endsWith(item.path);

						return (
							<Item
								key={item.text}
								text={item.text}
								href={`/dashboard/${item.path}`}
								size="xs"
								addOn={
									item.text === "Configurações" && (
										<CaretDown className="text-gray-400" />
									)
								}
								icon={item.icon}
								className={clsx(
									isSelected
										? "bg-pure-pink-400 rounded-full text-white"
										: "text-gray-400",
									"h-[34px] flex items-center",
								)}
							/>
						);
					})}
				</div>
			</ul>
			<div className="w-full gap-x-2 mt-auto p-1 flex bg-[#EAECF0] rounded-full">
				<div className="bg-pure-pink-400 size-[26px] flex items-center justify-center rounded-full">
					<SymbolIcon className="text-white" />
				</div>
				<div className="flex flex-col gap-y-px">
					<h1 className="font-bold font-montserrat text-gray-500 text-[10px]">
						Ibiporã
					</h1>
					<span className="text-[8px] font-montserrat text-gray-500">
						Gustavo Borges
					</span>
				</div>
			</div>
		</aside>
	);
};

export default SideBar;
