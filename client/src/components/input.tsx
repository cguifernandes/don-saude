import clsx from "clsx";
import { type InputHTMLAttributes, forwardRef, type ReactNode } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	icon?: ReactNode;
	addOn?: ReactNode;
	error?: string | null;
}

const Input = forwardRef<HTMLInputElement, Props>(
	({ label, icon, className, error, addOn, id, ...props }, ref) => {
		if (label) {
			return (
				<div className="flex flex-col gap-y-1">
					<label
						htmlFor={id}
						className="text-gray-500 select-none font-medium text-sm"
					>
						{label}
					</label>
					<div
						className={clsx(
							"flex items-center gap-x-2 rounded-xl border px-3.5 shadow-default h-[41px] text-sm font-normal border-gray-100",
							className,
						)}
					>
						{icon}
						<input
							id={id}
							className="text-gray-400 flex-1 placeholder:text-gray-400"
							ref={ref}
							{...props}
						/>
						{addOn}
					</div>
					{error && (
						<span className="text-red-500 text-sm font-semibold">{error}</span>
					)}
				</div>
			);
		}

		return (
			<>
				<div
					className={clsx(
						"flex items-center gap-x-2 rounded-xl border shadow-default px-3.5 h-[41px] text-sm font-normal border-gray-100",
						className,
					)}
				>
					{icon}
					<input
						id={id}
						className="text-gray-400 flex-1 placeholder:text-gray-400"
						ref={ref}
						{...props}
					/>
					{addOn}
				</div>
				{error && (
					<span className="text-red-500 text-sm font-semibold">{error}</span>
				)}
			</>
		);
	},
);

export default Input;
