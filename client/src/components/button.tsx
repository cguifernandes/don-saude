import type { ButtonHTMLAttributes, ReactNode } from "react";
import { type VariantProps, tv } from "tailwind-variants";

const button = tv({
	base: "text-sm font-bold px-4 h-10",
	variants: {
		theme: {
			solid:
				"bg-pure-pink text-white rounded-full transition-colors hover:bg-pure-pink-500",
			ghost:
				"bg-white text-pure-pink transition-colors rounded-full border border-transparent hover:border-pure-pink-500",
		},
	},
});

interface Props
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof button> {
	isLoading?: boolean;
	children: ReactNode;
}

const Button = ({ isLoading, children, theme, ...props }: Props) => {
	return (
		<button className={button({ theme })} {...props}>
			{children}
		</button>
	);
};

export default Button;
