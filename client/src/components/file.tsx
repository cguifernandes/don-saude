import clsx from "clsx";
import type { ChangeEvent, InputHTMLAttributes } from "react";
import FileArrowDown from "../assets/icons/FileArrowDown";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	className?: string;
	error?: string;
	id: string;
	file?: File | null;
	setFile?: (file: File | null) => void;
}

const File = ({
	className,
	label,
	error,
	file,
	id,
	setFile,
	defaultValue,
	...props
}: Props) => {
	const handlerChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		if (setFile && e.target.files) {
			setFile(e.target.files[0]);
		}
	};

	if (label) {
		return (
			<div className={clsx("flex flex-col gap-y-1", className)}>
				<label
					htmlFor={id}
					className="text-gray-500 select-none font-medium text-sm"
				>
					{label}
				</label>
				<label
					className="border text-gray-400 text-sm border-gray-100 border-dashed px-3 py-2 h-10 gap-x-2 flex justify-center items-center rounded-xl"
					htmlFor={id}
				>
					{file ? file.name : defaultValue ? defaultValue : "Clique ou arraste"}
					<FileArrowDown />
				</label>
				<input
					onChange={handlerChangeInput}
					className="hidden"
					type="file"
					id={id}
					{...props}
				/>
				{error && (
					<span className="text-red-500 text-sm font-semibold">{error}</span>
				)}
			</div>
		);
	}

	return (
		<>
			<label
				htmlFor={id}
				className="text-gray-500 select-none font-medium text-sm"
			>
				{label}
			</label>
			<label
				className="border text-gray-400 text-sm border-gray-100 border-dashed px-3 py-2 h-10 gap-x-2 flex justify-center items-center rounded-xl"
				htmlFor={id}
			>
				Clique ou arraste
				<FileArrowDown />
			</label>
			<input
				onChange={handlerChangeInput}
				className="hidden"
				type="file"
				id={id}
				{...props}
			/>
		</>
	);
};

export default File;
