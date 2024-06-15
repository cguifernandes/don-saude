import BackgroundImage from "../../assets/backgroudLogin.png";
import Logo from "../../assets/logo.svg";
import FormLogin from "../Forms/form-login";

const Login = () => {
	return (
		<main
			style={{ backgroundImage: `url(${BackgroundImage})` }}
			className="w-full min-h-screen bg-cover flex items-center justify-center flex-col"
		>
			<div className="bg-white rounded-2xl w-[438px] h-[504px] flex flex-col gap-y-14 p-12">
				<img className="h-14" src={Logo.toString()} alt="Logo Don Saúde" />
				<FormLogin />
			</div>
		</main>
	);
};

export default Login;
