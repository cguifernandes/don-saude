const SymbolIcon = ({ className }: { className?: string }) => {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Symbol</title>
			<path
				d="M10.3529 5.64712L10.3529 6.09759e-05L9.49336 6.09511e-05C7.36943 6.08899e-05 5.64697 1.99657 5.64697 4.46063L5.64697 5.64712L10.3529 5.64712Z"
				fill="currentColor"
			/>
			<path
				d="M10.3529 11.5395L10.3529 10.353L5.64697 10.353L5.64697 16.0001L6.50645 16.0001C8.63178 16.0001 10.3529 14.0024 10.3529 11.5395Z"
				fill="currentColor"
			/>
			<path
				d="M0 5.64706L12.8377 5.64706C14.5848 5.64706 16 6.92564 16 8.50158L16 10.3529L3.16226 10.3529C1.41525 10.3529 7.49067e-08 9.0744 4.04628e-08 7.49843L0 5.64706Z"
				fill="currentColor"
			/>
		</svg>
	);
};

export default SymbolIcon;
