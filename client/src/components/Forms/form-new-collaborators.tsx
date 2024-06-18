import { type FormEvent, useState } from "react";
import File from "../file";
import Input from "../input";
import Button from "../button";
import InputPassword from "../input-password";

const FormNewCollaborators = () => {
	const [selectedFile, setSelectedFile] = useState<File>();
	const [errors, setErrors] = useState<{
		[key: string]: {
			message: string;
		} | null;
	} | null>({});

	const handleSubmitNewCollaborators = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const name = formData.get("name") as string;
		const cpf = formData.get("cpf") as string;
		const tel = formData.get("tel") as string;
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const confirmPassword = formData.get("confirm-password") as string;
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

		if (name.trim() === "") {
			newErrors = {
				...newErrors,
				name: { message: "O nome não pode ser vazio" },
			};
		}

		if (cpf.trim() === "") {
			newErrors = {
				...newErrors,
				cpf: { message: "O CPF não pode ser vazio" },
			};
		}

		if (tel.trim() === "") {
			newErrors = {
				...newErrors,
				tel: { message: "O telefone não pode ser vazio" },
			};
		}

		if (email.trim() === "") {
			newErrors = {
				...newErrors,
				email: { message: "O e-mail não pode ser vazio" },
			};
		}

		if (confirmPassword.trim() === "") {
			newErrors = {
				...newErrors,
				confirmPassword: {
					message: "A confirmação da senha não pode ser vazia",
				},
			};
		}

		if (password !== confirmPassword) {
			newErrors = {
				...newErrors,
				password: { message: "As senhas devem ser iguais" },
				confirmPassword: { message: "As senhas devem ser iguais" },
			};
		}

		if (!selectedFile) {
			newErrors = {
				...newErrors,
				selectedFile: { message: "Selecione um arquivo" },
			};
		}

		if (selectedFile && selectedFile.size >= 5 * 1024 * 1024) {
			newErrors = {
				...newErrors,
				selectedFile: { message: "O arquivo deve ter no máximo 5MB" },
			};
		}

		setErrors(newErrors);

		if (!newErrors) {
			console.log({
				name,
				cpf,
				tel,
				email,
				password,
				confirmPassword,
				selectedFile,
			});
		}
	};

	console.log(errors);

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
				<Button className="w-60" type="submit" theme="solid">
					Salvar
				</Button>
			</div>
		</form>
	);
};

export default FormNewCollaborators;
