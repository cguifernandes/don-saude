import { useEffect, useRef } from "react";
import Logo from "../../assets/Logo";
import BackgroundImage from "../../assets/backgroudLogin.png";
import { useAuth } from "../../context/AuthContext";
import FormLogin from "../Forms/form-login";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const Login = () => {
	const { token } = useAuth();
	const hasToastBeenShown = useRef(false);

	useEffect(() => {
		if (token && !hasToastBeenShown.current) {
			hasToastBeenShown.current = true;
			toast.error(
				"Essa página não pode ser acessada enquanto você estiver logado",
				{
					position: "bottom-right",
				},
			);
		}
	}, [token]);

	if (token) {
		return <Navigate to="/dashboard" replace />;
	}

	return (
		<main
			style={{ backgroundImage: `url(${BackgroundImage})` }}
			className="w-full min-h-screen bg-cover flex items-center justify-center flex-col"
		>
			<div className="bg-white rounded-2xl w-[438px] h-[504px] flex flex-col p-12">
				<Logo className="min-h-14 min-w-[188px] mx-auto mb-8" />
				<FormLogin />
			</div>
		</main>
	);
};

export default Login;
