const PlusCircle = ({ className }: { className?: string }) => {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Plus Circle</title>
			<path
				d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
				stroke="currentColor"
				strokeWidth="1.66667"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M6.875 10H13.125"
				stroke="currentColor"
				strokeWidth="1.66667"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M10 6.875V13.125"
				stroke="currentColor"
				strokeWidth="1.66667"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default PlusCircle;
