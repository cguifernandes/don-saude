import clsx from "clsx";

const Check = ({ className }: { className?: string }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
			className={clsx("lucide lucide-check", className)}
		>
			<title>Check</title>
			<path d="M20 6 9 17l-5-5" />
		</svg>
	);
};

export default Check;
