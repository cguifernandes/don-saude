import User from "../../assets/icons/User.svg";
import Input from "../input";
import InputPassword from "../input-password";
import LockKey from "../../assets/icons/LockKey.svg";
import Checkbox from "../checkbox";
import Button from "../button";
import { useState, type FormEvent } from "react";

const FormLogin = () => {
	const [errors, setErrors] = useState<{
		[key: string]: {
			message: string;
		} | null;
	} | null>({});

	const handleSubmitLogin = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const rememberMe = formData.get("remember-me") === "on";
		let newErrors: {
			[key: string]: {
				message: string;
			} | null;
		} | null = null;

		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailPattern.test(email)) {
			newErrors = { email: { message: "Email inválido" } };
		}

		if (password.trim() === "") {
			newErrors = {
				...newErrors,
				password: { message: "A senha não pode ser vazia" },
			};
		}

		setErrors(newErrors);

		if (!newErrors) {
			console.log({
				email,
				password,
				rememberMe,
			});
		}
	};

	return (
		<form
			onSubmit={handleSubmitLogin}
			className="flex flex-col flex-1 justify-between gap-y-3"
		>
			<Input
				icon={<img className="size-5" src={User.toString()} alt="User icon" />}
				id="email-input"
				placeholder="Preencha com e-mail"
				label="E-mail"
				name="email"
				maxLength={32}
				error={errors?.email?.message}
			/>
			<InputPassword
				placeholder="Preencha sua senha"
				label="Senha"
				id="password-input"
				name="password"
				maxLength={16}
				error={errors?.password?.message}
				icon={
					<img className="size-5" src={LockKey.toString()} alt="LockKey icon" />
				}
			/>
			<Checkbox name="remember-me" id="checkbox" label="Lembre de mim" />

			<div className="flex flex-col gap-y-2">
				<Button theme="solid">Entrar</Button>
				<Button type="button" theme="ghost">
					Esqueci minha senha
				</Button>
			</div>
		</form>
	);
};

export default FormLogin;
