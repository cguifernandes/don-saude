import { useState, useRef, useEffect, type Dispatch } from "react";
import CaretDown from "../assets/icons/CaretDown";

interface Props {
	options: {
		value: string;
		label: string;
	}[];
	setSelectedValue: Dispatch<React.SetStateAction<string>>;
	selectedDefault: string;
}

const Select = ({ options, setSelectedValue, selectedDefault }: Props) => {
	const [visibleDropdown, setVisibleDropdown] = useState(false);
	const [selectedLabel, setSelectedLabel] = useState(selectedDefault);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleToggleDropdown = () => {
		setVisibleDropdown((prev) => !prev);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target as Node)
		) {
			setVisibleDropdown(false);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div onClick={handleToggleDropdown} className="relative">
			<div className="px-2 py-1 rounded-full bg-gray-200 font-medium flex items-center gap-x-1 border border-gray-100 w-fit text-gray-700 cursor-pointer">
				{selectedLabel}
				<CaretDown className="!size-[6px] rotate-180 stroke-2 text-gray-700" />
			</div>
			{visibleDropdown && (
				<div
					ref={dropdownRef}
					className="min-w-24 absolute top-full bg-gray-200 rounded-xl mt-1 shadow-default border border-gray-100"
				>
					<ul className="flex flex-col gap-y-1 text-black">
						{options.map((option) => (
							<li
								key={option.value}
								className="hover:bg-gray-100 cursor-pointer first:rounded-t-xl last:rounded-b-xl"
							>
								<button
									type="button"
									onClick={(e) => {
										e.stopPropagation();
										setSelectedValue(option.value);
										setSelectedLabel(option.label);
										setVisibleDropdown(false);
									}}
									className="px-3 py-2 w-full text-start"
								>
									{option.label}
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Select;
