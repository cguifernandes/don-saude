import type { Dispatch } from "react";
import CaretDown from "../assets/icons/CaretDown";

interface Props {
	setPage: Dispatch<React.SetStateAction<number>>;
	page: number;
	totalPages: number;
}

const Pagination = ({ page, setPage, totalPages }: Props) => {
	return (
		<div className="text-xs gap-x-2 flex items-center font-medium text-gray-400">
			<button
				type="button"
				disabled={page === 1}
				onClick={() => setPage(page - 1)}
				className="flex items-center justify-center size-3 disabled:opacity-30 disabled:cursor-not-allowed"
			>
				<CaretDown className="!size-[6px] -rotate-90 stroke-2 text-gray-700" />
			</button>
			{page}
			<button
				disabled={page === totalPages}
				type="button"
				onClick={() => setPage(page + 1)}
				className="flex items-center justify-center size-3 disabled:opacity-30 disabled:cursor-not-allowed"
			>
				<CaretDown className="!size-[6px] rotate-90 stroke-2 text-gray-700" />
			</button>
		</div>
	);
};

export default Pagination;
