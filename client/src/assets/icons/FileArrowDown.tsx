const FileArrowDown = ({ className }: { className?: string }) => {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			className={className}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>File Arrow Down</title>
			<path
				d="M12.2188 13.625H3.78125C3.65693 13.625 3.5377 13.5756 3.44979 13.4877C3.36189 13.3998 3.3125 13.2806 3.3125 13.1562V2.84375C3.3125 2.71943 3.36189 2.6002 3.44979 2.51229C3.5377 2.42439 3.65693 2.375 3.78125 2.375H9.40625L12.6875 5.65625V13.1562C12.6875 13.2806 12.6381 13.3998 12.5502 13.4877C12.4623 13.5756 12.3431 13.625 12.2188 13.625Z"
				stroke="currentColor"
				strokeWidth="1.33333"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M9.40625 2.375V5.65625H12.6875"
				stroke="currentColor"
				strokeWidth="1.33333"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M6.35938 9.64062L8 11.2812L9.64062 9.64062"
				stroke="currentColor"
				strokeWidth="1.33333"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M8 7.53125V11.2812"
				stroke="currentColor"
				strokeWidth="1.33333"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default FileArrowDown;
