const ShieldCheck = ({ className }: { className?: string }) => {
	return (
		<svg
			width="13"
			height="12"
			viewBox="0 0 13 12"
			fill="none"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Shield Check</title>
			<path
				d="M2.125 5.37656V2.625C2.125 2.52554 2.16451 2.43016 2.23484 2.35984C2.30516 2.28951 2.40054 2.25 2.5 2.25H10C10.0995 2.25 10.1948 2.28951 10.2652 2.35984C10.3355 2.43016 10.375 2.52554 10.375 2.625V5.37656C10.375 9.31406 7.03281 10.6172 6.36719 10.8375C6.29157 10.8655 6.20843 10.8655 6.13281 10.8375C5.46719 10.6172 2.125 9.31406 2.125 5.37656Z"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M8.3125 4.875L5.56094 7.5L4.1875 6.1875"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default ShieldCheck;
