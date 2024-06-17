import {
	createContext,
	useState,
	useContext,
	useEffect,
	type ReactNode,
} from "react";
import type { UserProps } from "../../../common/types";
import type { HttpStatusCode } from "../types/types";
import { url } from "../utils/utils";

interface AuthContextType {
	token: string;
	login: (
		email: string,
		password: string,
		rememberMe: boolean,
	) => Promise<{
		data: UserProps;
		status: HttpStatusCode;
		message: string;
		token: string;
	}>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
	token: "",
	login: async () => {
		throw new Error("AuthProvider não foi fornecido.");
	},
	logout: () => {
		throw new Error("AuthProvider não foi fornecido.");
	},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [token, setToken] = useState<string>(
		localStorage.getItem("token") || "",
	);

	useEffect(() => {
		if (token) {
			localStorage.setItem("token", token);
		} else {
			localStorage.removeItem("token");
		}
	}, [token]);

	const login = async (
		email: string,
		password: string,
		rememberMe: boolean,
	): Promise<{
		data: UserProps;
		status: HttpStatusCode;
		message: string;
		token: string;
	}> => {
		try {
			const response = await fetch(`${url}/api/users`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password, rememberMe }),
			});

			const data: {
				data: UserProps;
				status: HttpStatusCode;
				message: string;
				token: string;
			} = await response.json();
			setToken(data.token);
			return data;
		} catch (error) {
			console.error("Erro ao fazer o login", error);
			throw error;
		}
	};

	const logout = () => {
		setToken("");
	};

	return (
		<AuthContext.Provider value={{ token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
