import clsx from "clsx";
import { forwardRef, useState, type InputHTMLAttributes } from "react";
import Check from "../assets/icons/Check";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, Props>(
	({ label, id, ...props }, ref) => {
		const [checkValue, setCheckValue] = useState(false);

		return (
			<div className="flex gap-x-2 items-center">
				<div className="flex items-center justify-center relative">
					<input
						type="checkbox"
						ref={ref}
						id={id}
						checked={checkValue}
						onChange={(e) => setCheckValue(e.target.checked)}
						{...props}
						className={clsx(
							"w-4 h-4 appearance-none shadow-default border-gray-100 border rounded",
							checkValue ? "bg-pure-pink-400 border-none" : "bg-transparent",
						)}
					/>
					{checkValue && (
						<Check className="size-3 absolute bg-pure-pink-400 text-white" />
					)}
				</div>
				{label && (
					<label
						htmlFor={id}
						className="text-gray-500 select-none font-normal text-sm"
					>
						{label}
					</label>
				)}
			</div>
		);
	},
);

export default Checkbox;
