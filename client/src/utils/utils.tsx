import User from "../assets/icons/User";
import UsersFour from "../assets/icons/UsersFour";
import ChartPie from "../assets/icons/ChartPie";
import CurrencyDollar from "../assets/icons/CurrencyDollar";
import DeviceMobileCamera from "../assets/icons/DeviceMobileCamera";
import GearSix from "../assets/icons/GearSix";
import IdentificationBadge from "../assets/icons/IdentificationBadge";
import ShieldCheck from "../assets/icons/ShieldCheck";
import ShieldSlash from "../assets/icons/ShieldSlash";

export const url =
	process.env.NODE_ENV === "development"
		? "http://localhost:3333"
		: "http://localhost:3000";

export const itens = [
	{
		text: "Indicadores",
		icon: <ChartPie className="text-gray-400" />,
		path: "indicators",
	},
	{
		text: "Atendimento",
		icon: <IdentificationBadge className="text-gray-400" />,
		path: "service",
	},
	{
		text: "App Don",
		icon: <DeviceMobileCamera className="text-gray-400" />,
		path: "app",
	},
	{
		text: "Financeiro",
		icon: <CurrencyDollar className="text-gray-400" />,
		path: "financial",
	},
	{
		text: "Parceiros",
		icon: <UsersFour className="text-gray-400" />,
		path: "partners",
	},
	{
		text: "Usuários",
		icon: <User className="text-gray-400" />,
		path: "users",
	},
	{
		text: "Configurações",
		icon: <GearSix className="text-gray-400 min-w-5" />,
		path: "config",
	},
	{
		text: "Campanhas",
		path: "campaigns",
	},
	{
		text: "Categorias",
		path: "categories",
	},
	{
		text: "Colaboradores",
		path: "collaborators",
	},
	{
		text: "Local de atendimento",
		path: "service",
	},
	{
		text: "Metas",
		path: "goals",
	},
	{
		text: "Modelos de orçamento",
		path: "budgets",
	},
	{
		text: "Permissões",
		path: "permissions",
	},
	{
		text: "Procedimentos",
		path: "procedures",
	},
];

export const selectedItens = [
	{ text: "Com acesso ao sistema", icon: ShieldCheck },
	{ text: "Sem acesso ao sistema", icon: ShieldSlash },
];
