import Input from "./input";
import {
	type HTMLInputTypeAttribute,
	useState,
	type InputHTMLAttributes,
	type ReactNode,
	forwardRef,
} from "react";
import EyeClosed from "../assets/icons/EyeClosed.svg";
import EyeOpen from "../assets/icons/EyeOpen.svg";

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
							<img
								className="size-4"
								src={EyeClosed.toString()}
								alt="EyeClosed icon"
							/>
						</button>
					) : (
						<button
							type="button"
							onClick={() => setTypeInput("password")}
							className="flex items-center justify-center ml-auto"
						>
							<img
								className="size-4"
								src={EyeOpen.toString()}
								alt="EyeOpen icon"
							/>
						</button>
					)
				}
			/>
		);
	},
);

export default InputPassword;
