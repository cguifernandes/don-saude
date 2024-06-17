const MagnifyingGlass = ({ className }: { className?: string }) => {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>MagnifyingGlass</title>
			<path
				d="M9.0625 15.625C12.6869 15.625 15.625 12.6869 15.625 9.0625C15.625 5.43813 12.6869 2.5 9.0625 2.5C5.43813 2.5 2.5 5.43813 2.5 9.0625C2.5 12.6869 5.43813 15.625 9.0625 15.625Z"
				stroke="currentColor"
				stroke-width="1.66667"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M13.7031 13.7031L17.5 17.5"
				stroke="currentColor"
				stroke-width="1.66667"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};

export default MagnifyingGlass;