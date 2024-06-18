import { type FormEvent, useState } from "react";
import File from "../file";
import Input from "../input";
import Button from "../button";
import InputPassword from "../input-password";
import { url } from "../../utils/utils";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const FormNewCollaborators = () => {
	const [selectedFile, setSelectedFile] = useState<File>();
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { token } = useAuth();
	const [errors, setErrors] = useState<{
		[key: string]: {
			message: string;
		} | null;
	} | null>({});

	const handleSubmitNewCollaborators = async (
		e: FormEvent<HTMLFormElement>,
	) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const name = formData.get("name") as string;
		const cpf = formData.get("cpf") as string;
		const tel = formData.get("tel") as string;
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const confirmPassword = formData.get("confirm-password") as string;

		const newErrors: { [key: string]: { message: string } | null } = {};

		const validateField = (
			fieldName: string,
			value: string,
			errorMessage: string,
		) => {
			if (value.trim() === "") {
				newErrors[fieldName] = { message: errorMessage };
			}
		};

		validateField("name", name, "O nome não pode ser vazio");
		validateField("cpf", cpf, "O CPF não pode ser vazio");
		validateField("tel", tel, "O telefone não pode ser vazio");
		validateField("email", email, "O e-mail não pode ser vazio");
		validateField("password", password, "A senha não pode ser vazia");
		validateField(
			"confirmPassword",
			confirmPassword,
			"A confirmação da senha não pode ser vazia",
		);

		if (password !== confirmPassword) {
			newErrors.password = { message: "As senhas devem ser iguais" };
			newErrors.confirmPassword = { message: "As senhas devem ser iguais" };
		}

		if (selectedFile) {
			if (selectedFile.size >= 5 * 1024 * 1024) {
				newErrors.selectedFile = {
					message: "O arquivo deve ter no máximo 5MB",
				};
			}
		} else {
			newErrors.selectedFile = { message: "Selecione um arquivo" };
		}

		setErrors(newErrors);

		if (Object.keys(newErrors).length === 0) {
			try {
				setIsLoading(true);
				const response = await fetch(`${url}/api/collaborator`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ cpf, email, name, tel, password, token }),
				});

				const data: {
					message: string;
					status: number;
				} = await response.json();

				if (data.status >= 400 && data.status < 600) {
					toast.error(data.message, {
						position: "bottom-right",
					});
				} else {
					toast.success(data.message, {
						position: "bottom-right",
					});

					navigate("/dashboard/collaborators");
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
			onSubmit={handleSubmitNewCollaborators}
			className="px-4 py-5 mt-4 gap-y-6 flex flex-col bg-white rounded-2xl"
		>
			<div className="flex justify-between items-center gap-x-4">
				<Input
					className="w-2/4"
					label="Nome"
					id="name"
					name="name"
					maxLength={48}
					placeholder="Digite o nome completo"
					error={errors?.name?.message}
				/>
				<Input
					id="cpf"
					className="w-2/4"
					label="CPF"
					name="cpf"
					placeholder="Apenas números"
					maxLength={11}
					error={errors?.cpf?.message}
				/>
			</div>
			<div className="flex justify-between items-center gap-x-4">
				<Input
					id="tel"
					className="w-2/4"
					label="Telefone"
					name="tel"
					placeholder="DDD + Número"
					error={errors?.tel?.message}
				/>
				<Input
					id="email"
					className="w-2/4"
					label="E-mail"
					name="email"
					placeholder="Digite aqui"
					error={errors?.email?.message}
				/>
			</div>
			<div className="flex justify-between items-center gap-x-4">
				<InputPassword
					id="password"
					className="w-2/4"
					name="password"
					label="Senha"
					placeholder="Digite aqui"
					maxLength={16}
					error={errors?.password?.message}
				/>
				<InputPassword
					id="confirm-password"
					className="w-2/4"
					name="confirm-password"
					label="Confirme a senha"
					maxLength={16}
					placeholder="Digite novamente aqui"
					error={errors?.confirmPassword?.message}
				/>
			</div>
			<File
				file={selectedFile}
				setFile={setSelectedFile}
				id="input-file"
				label="Foto"
				error={errors?.selectedFile?.message}
			/>
			<div className="flex items-center justify-end gap-x-3 mt-24">
				<Button
					className="w-60 font-bold"
					type="button"
					href="/dashboard/collaborators"
					theme="empty"
				>
					Cancelar
				</Button>
				<Button
					isLoading={isLoading}
					className="w-60 font-bold"
					type="submit"
					theme="solid"
				>
					Salvar
				</Button>
			</div>
		</form>
	);
};

export default FormNewCollaborators;
