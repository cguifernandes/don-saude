import { type FormEvent, useState, useEffect, type ChangeEvent } from "react";
import File from "../file";
import Input from "../input";
import Button from "../button";
import InputPassword from "../input-password";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { CollaboratorProps } from "../../types/types";
import { useCollaboratorContext } from "../../context/CollaboratorContext";

interface Props {
	isEditAction?: boolean;
	defaultValues?: CollaboratorProps;
	isLoadingComponents?: boolean;
}

const FormCollaborators = ({
	isEditAction = false,
	isLoadingComponents,
	defaultValues,
}: Props) => {
	const { addCollaborator, updateCollaborator } = useCollaboratorContext();
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const [errors, setErrors] = useState<{
		[key: string]: {
			message: string;
		} | null;
	} | null>({});
	const [formData, setFormData] = useState<{
		name: string;
		cpf: string;
		tel: string;
		email: string;
		password: string;
		confirmPassword: string;
		selectedFile: File | null;
		nameFile: string;
	}>({
		name: defaultValues?.name ?? "",
		cpf: defaultValues?.cpf ?? "",
		tel: defaultValues?.tel ?? "",
		email: defaultValues?.email ?? "",
		password: "",
		confirmPassword: "",
		selectedFile: null,
		nameFile: defaultValues?.nameFile ?? "",
	});

	useEffect(() => {
		if (defaultValues) {
			setFormData({
				name: defaultValues.name ?? "",
				cpf: defaultValues.cpf ?? "",
				tel: defaultValues.tel ?? "",
				email: defaultValues.email ?? "",
				password: "",
				confirmPassword: "",
				selectedFile: null,
				nameFile: defaultValues.nameFile ?? "",
			});
		}
	}, [defaultValues]);

	const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value, files } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: files ? files[0] : value,
		}));
	};

	const handleSubmitNewCollaborators = async (
		e: FormEvent<HTMLFormElement>,
	) => {
		e.preventDefault();

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

		validateField("name", formData.name, "O nome não pode ser vazio");
		validateField("cpf", formData.cpf, "O CPF não pode ser vazio");
		validateField("tel", formData.tel, "O telefone não pode ser vazio");
		validateField("email", formData.email, "O e-mail não pode ser vazio");

		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailPattern.test(formData.email)) {
			newErrors.email = { message: "Email inválido" };
		}

		if (!isEditAction) {
			validateField(
				"password",
				formData.password,
				"A senha não pode ser vazia",
			);
			validateField(
				"confirmPassword",
				formData.confirmPassword,
				"A confirmação da senha não pode ser vazia",
			);

			if (formData.password !== formData.confirmPassword) {
				newErrors.password = { message: "As senhas devem ser iguais" };
				newErrors.confirmPassword = { message: "As senhas devem ser iguais" };
			}
		}

		if (formData.selectedFile) {
			if (formData.selectedFile.size >= 5 * 1024 * 1024) {
				newErrors.selectedFile = {
					message: "O arquivo deve ter no máximo 5MB",
				};
			}
		} else if (!formData.nameFile) {
			newErrors.selectedFile = {
				message: "Selecione um arquivo",
			};
		}

		setErrors(newErrors);

		if (Object.keys(newErrors).length === 0) {
			try {
				setIsLoading(true);

				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				const collaboratorData: any = {
					name: formData.name,
					cpf: formData.cpf,
					tel: formData.tel,
					email: formData.email,
					nameFile: formData.selectedFile?.name ?? formData.nameFile,
				};

				if (isEditAction) {
					await updateCollaborator(defaultValues?.id ?? "", collaboratorData);

					toast.success("Colaborador atualizado com sucesso!", {
						position: "bottom-right",
					});
				} else {
					collaboratorData.password = formData.password;

					await addCollaborator(collaboratorData);
					toast.success("Colaborador criado com sucesso!", {
						position: "bottom-right",
					});
				}

				navigate("/dashboard/collaborators");
			} catch (error) {
				toast.error("Ocorreu um erro ao processar a operação", {
					position: "bottom-right",
				});
				console.error("Erro ao processar a operação:", error);
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
					value={formData.name}
					onChange={handleChangeInput}
					disabled={isLoadingComponents}
				/>
				<Input
					id="cpf"
					className="w-2/4"
					label="CPF"
					name="cpf"
					placeholder="Apenas números"
					maxLength={11}
					value={formData.cpf}
					error={errors?.cpf?.message}
					onChange={handleChangeInput}
					disabled={isLoadingComponents}
				/>
			</div>
			<div className="flex justify-between items-center gap-x-4">
				<Input
					id="tel"
					className="w-2/4"
					label="Telefone"
					name="tel"
					maxLength={22}
					value={formData.tel}
					placeholder="DDD + Número"
					error={errors?.tel?.message}
					onChange={handleChangeInput}
					disabled={isLoadingComponents}
				/>
				<Input
					id="email"
					className="w-2/4"
					label="E-mail"
					name="email"
					value={formData.email}
					placeholder="Digite aqui"
					error={errors?.email?.message}
					onChange={handleChangeInput}
					disabled={isLoadingComponents}
				/>
			</div>
			{!isEditAction && (
				<div className="flex justify-between items-center gap-x-4">
					<InputPassword
						id="password"
						className="w-2/4"
						name="password"
						label="Senha"
						placeholder="Digite aqui"
						value={formData.password}
						maxLength={16}
						error={errors?.password?.message}
						onChange={handleChangeInput}
						disabled={isLoadingComponents}
					/>
					<InputPassword
						id="confirm-password"
						className="w-2/4"
						name="confirmPassword"
						label="Confirme a senha"
						value={formData.confirmPassword}
						maxLength={16}
						placeholder="Digite novamente aqui"
						error={errors?.confirmPassword?.message}
						onChange={handleChangeInput}
						disabled={isLoadingComponents}
					/>
				</div>
			)}
			<File
				file={formData.selectedFile}
				setFile={(file: File | null) =>
					setFormData((prevFormData) => ({
						...prevFormData,
						selectedFile: file,
					}))
				}
				defaultValue={formData.nameFile}
				id="input-file"
				label="Foto"
				error={errors?.selectedFile?.message}
				disabled={isLoadingComponents}
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

export default FormCollaborators;
