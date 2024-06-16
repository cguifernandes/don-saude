import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import type { FC, ReactNode } from "react";

interface Props {
	component: ReactNode;
}

const ProtectedRoute: FC<Props> = ({ component }: Props) => {
	const { token } = useAuth();

	if (!token) {
		return <Navigate to="/login" replace />;
	}

	return <>{component}</>;
};

export default ProtectedRoute;
