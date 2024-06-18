const Star = ({ className }: { className?: string }) => {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Star</title>
			<path
				d="M10.3437 14.8984L14.2812 17.3984C14.7891 17.7187 15.4141 17.2422 15.2656 16.6562L14.125 12.1719C14.0942 12.0476 14.0991 11.9171 14.1391 11.7954C14.1792 11.6738 14.2529 11.566 14.3516 11.4844L17.8828 8.53905C18.3437 8.15624 18.1094 7.3828 17.5078 7.34374L12.8984 7.04686C12.7727 7.03955 12.6518 6.99575 12.5505 6.92083C12.4492 6.84591 12.3719 6.74311 12.3281 6.62499L10.6094 2.29686C10.5639 2.17179 10.481 2.06374 10.372 1.98739C10.263 1.91104 10.1331 1.87009 10 1.87009C9.8669 1.87009 9.73703 1.91104 9.62802 1.98739C9.519 2.06374 9.43612 2.17179 9.39062 2.29686L7.67187 6.62499C7.62807 6.74311 7.5508 6.84591 7.44952 6.92083C7.34824 6.99575 7.22733 7.03955 7.10156 7.04686L2.49218 7.34374C1.89062 7.3828 1.65625 8.15624 2.11718 8.53905L5.64843 11.4844C5.74713 11.566 5.82077 11.6738 5.86085 11.7954C5.90094 11.9171 5.90584 12.0476 5.875 12.1719L4.82031 16.3281C4.64062 17.0312 5.39062 17.6016 5.99218 17.2187L9.65625 14.8984C9.75899 14.8331 9.87823 14.7984 10 14.7984C10.1218 14.7984 10.241 14.8331 10.3437 14.8984V14.8984Z"
				stroke="currentColor"
				strokeWidth="1.66667"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default Star;
