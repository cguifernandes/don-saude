import EyeClosed from "../assets/icons/EyeClosed";
import EyeOpen from "../assets/icons/EyeOpen";
import Input from "./input";
import {
	type HTMLInputTypeAttribute,
	useState,
	type InputHTMLAttributes,
	type ReactNode,
	forwardRef,
} from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	icon?: ReactNode;
	addOn?: ReactNode;
	error?: string | null;
}

const InputPassword = forwardRef<HTMLInputElement, Props>(
	({ addOn, ...props }, ref) => {
		const [typeInput, setTypeInput] =
			useState<HTMLInputTypeAttribute>("password");

		return (
			<Input
				{...props}
				ref={ref}
				type={typeInput}
				addOn={
					typeInput === "password" ? (
						<button
							type="button"
							onClick={() => setTypeInput("text")}
							className="flex items-center justify-center ml-auto"
						>
							<EyeClosed className="size-4 text-gray-400" />
						</button>
					) : (
						<button
							type="button"
							onClick={() => setTypeInput("password")}
							className="flex items-center justify-center ml-auto"
						>
							<EyeOpen className="size-4 text-gray-400" />
						</button>
					)
				}
			/>
		);
	},
);

export default InputPassword;
