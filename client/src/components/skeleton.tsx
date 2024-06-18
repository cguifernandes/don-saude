import clsx from "clsx";
import type { CSSProperties } from "react";

type SkeletonProps = {
	width?: string | number;
	height?: string | number;
	className?: string;
	margin?: string | number;
	isRoundedFull?: boolean;
	style?: CSSProperties;
};

const Skeleton = ({
	height,
	width,
	className,
	margin,
	style,
	isRoundedFull,
}: SkeletonProps) => {
	const mergedStyles: CSSProperties = {
		width,
		height,
		margin,
		...style,
	};

	return (
		<div
			style={mergedStyles}
			className={clsx("animate-pulse bg-gray-300", className)}
		>
			<div
				style={
					isRoundedFull ? { borderRadius: "9999px" } : { borderRadius: "6px" }
				}
				className={clsx("h-full w-full bg-grey-400")}
			/>
		</div>
	);
};

export default Skeleton;
