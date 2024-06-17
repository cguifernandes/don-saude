import BellSimple from "../../assets/icons/BellSimple";
import MagnifyingGlass from "../../assets/icons/MagnifyingGlass";
import PlusCircle from "../../assets/icons/PlusCircle";
import Star from "../../assets/icons/Star";
import User from "../../assets/icons/User";
import Button from "../button";
import Input from "../input";

const Header = () => {
	return (
		<header className="px-12 h-[88px] w-full flex items-center justify-between">
			<div className="flex items-center gap-x-4">
				<Button
					icon={<PlusCircle />}
					className="font-bold flex items-center gap-x-2"
					theme="soft"
				>
					Novo orçamento/atendimento
				</Button>
				<Input
					className="!rounded-full !h-[37px] w-80"
					placeholder="Buscar"
					icon={<MagnifyingGlass className="text-gray-400" />}
				/>
			</div>
			<div className="flex gap-x-4">
				<button
					type="button"
					className="size-9 rounded-xl flex items-center transition-colors justify-center hover:bg-pure-pink-200"
				>
					<Star className="text-gray-500" />
				</button>
				<button
					type="button"
					className="size-9 rounded-xl flex items-center transition-colors justify-center hover:bg-pure-pink-200"
				>
					<BellSimple className="text-gray-500" />
				</button>
				<div className="h-9 w-px bg-gray-100" />
				<button
					type="button"
					className="size-8 rounded-full flex items-center transition-colors justify-center bg-pure-pink-100"
				>
					<User className="size-4 text-pure-pink-400" />
				</button>
			</div>
		</header>
	);
};

export default Header;
