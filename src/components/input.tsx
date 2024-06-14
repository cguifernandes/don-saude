import { type InputHTMLAttributes, forwardRef, type ReactNode } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	icon?: ReactNode;
	addOn?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, Props>(
	({ label, icon, addOn, id, ...props }, ref) => {
		return (
			<div className="flex flex-col gap-y-1">
				{label && (
					<label
						htmlFor={id}
						className="text-gray-500 select-none font-medium text-sm"
					>
						{label}
					</label>
				)}
				<div className="flex items-center gap-x-2 rounded-xl border px-3.5 shadow-default h-[41px] text-sm font-normal border-gray-100">
					{icon}
					<input
						id={id}
						className="text-gray-400 flex-1"
						ref={ref}
						{...props}
					/>
					{addOn}
				</div>
			</div>
		);
	},
);

export default Input;
