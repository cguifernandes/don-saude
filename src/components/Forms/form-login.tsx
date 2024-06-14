import User from "../../assets/icons/User.svg";
import Input from "../input";
import InputPassword from "../input-password";
import LockKey from "../../assets/icons/LockKey.svg";
import Checkbox from "../checkbox";
import Button from "../button";

const FormLogin = () => {
	return (
		<form className="flex flex-col flex-1 justify-between gap-y-3">
			<Input
				icon={<img className="size-5" src={User.toString()} alt="User icon" />}
				id="email-input"
				placeholder="Preencha com e-mail"
				label="E-mail"
			/>
			<InputPassword
				placeholder="Preencha sua senha"
				label="Senha"
				id="password-input"
				icon={
					<img className="size-5" src={LockKey.toString()} alt="LockKey icon" />
				}
			/>
			<Checkbox id="checkbox" label="Lembre de mim" />
			<div className="flex flex-col gap-y-2">
				<Button theme="solid">Entrar</Button>
				<Button theme="ghost">Esqueci minha senha</Button>
			</div>
		</form>
	);
};

export default FormLogin;
