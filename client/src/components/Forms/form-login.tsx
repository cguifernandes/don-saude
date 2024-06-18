import Input from "../input";
import InputPassword from "../input-password";
import Checkbox from "../checkbox";
import Button from "../button";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import User from "../../assets/icons/User";
import LockKey from "../../assets/icons/LockKey";

const FormLogin = () => {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const auth = useAuth();
	const [errors, setErrors] = useState<{
		[key: string]: {
			message: string;
		} | null;
	} | null>({});

	const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
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
			try {
				setIsLoading(true);
				const data = await auth.login(email, password, rememberMe);

				if (data.status >= 400 && data.status < 600) {
					toast.error(data.message, {
						position: "bottom-right",
					});
				} else {
					toast.success(data.message, {
						position: "bottom-right",
					});

					const hasToken = localStorage.getItem("token");

					if (!hasToken) {
						localStorage.setItem("token", data.token);
					}

					navigate("/dashboard");
				}
			} catch (error) {
				console.error("Ocorreu um erro", error);
			} finally {
				setIsLoading(false);
			}
		}
	};

	return (
		<form
			onSubmit={handleSubmitLogin}
			className="flex flex-col my-auto justify-between gap-y-3"
		>
			<Input
				icon={<User className="size-5 text-gray-400" />}
				id="email-input"
				placeholder="Preencha com e-mail"
				label="E-mail"
				name="email"
				error={errors?.email?.message}
			/>
			<InputPassword
				placeholder="Preencha sua senha"
				label="Senha"
				id="password-input"
				name="password"
				maxLength={16}
				error={errors?.password?.message}
				icon={<LockKey className="size-5 text-gray-400" />}
			/>
			<Checkbox name="remember-me" id="checkbox" label="Lembre de mim" />
			<div className="flex flex-col gap-y-2">
				<Button isLoading={isLoading} theme="solid">
					Entrar
				</Button>
				<Button type="button" theme="ghost">
					Esqueci minha senha
				</Button>
			</div>
		</form>
	);
};

export default FormLogin;
