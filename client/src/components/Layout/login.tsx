import Logo from "../../assets/Logo";
import BackgroundImage from "../../assets/backgroudLogin.png";
import FormLogin from "../Forms/form-login";

const Login = () => {
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
