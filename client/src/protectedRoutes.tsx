import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import type { FC, ReactNode } from "react";
import toast from "react-hot-toast";

interface Props {
	component: ReactNode;
}

const ProtectedRoute: FC<Props> = ({ component }: Props) => {
	const { token } = useAuth();
	const hasToastBeenShown = useRef(false);

	useEffect(() => {
		if (!token && !hasToastBeenShown.current) {
			hasToastBeenShown.current = true;
			toast.error(
				"Você não está logado. Crie uma conta ou faça login para acessar esta página",
				{
					position: "bottom-right",
				},
			);
		}
	}, [token]);

	if (!token) {
		return <Navigate to="/login" replace />;
	}

	return <>{component}</>;
};

export default ProtectedRoute;
