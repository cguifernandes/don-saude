import clsx from "clsx";
import { forwardRef, useState, type InputHTMLAttributes } from "react";
import EyeOpen from "../assets/icons/Check.svg";

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
							checkValue ? "bg-pure-pink border-none" : "bg-transparent",
						)}
					/>
					{checkValue && (
						<img
							className="size-3 absolute"
							src={EyeOpen.toString()}
							alt="EyeOpen icon"
						/>
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
