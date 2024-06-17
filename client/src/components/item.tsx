import type { ReactNode } from "react";
import { type VariantProps, tv } from "tailwind-variants";

const item = tv({
	variants: {
		size: {
			xs: "text-xs",
			sm: "text-sm",
			md: "text-base",
			lg: "text-lg",
		},
	},
});

interface Props extends VariantProps<typeof item> {
	icon?: ReactNode;
	text: string;
	addOn?: ReactNode;
	href?: string;
	className?: string;
}

const Item = ({ text, href, icon, className, size, addOn }: Props) => {
	const sizeClass = item({ size });

	return (
		<li className={className}>
			<a href={href} className="flex items-center w-full px-4 py-2 gap-x-3">
				{icon}
				<span className={sizeClass}>{text}</span>
				{addOn}
			</a>
		</li>
	);
};

export default Item;
