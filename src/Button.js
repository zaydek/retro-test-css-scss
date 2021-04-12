import scss from "scss-plugin"

scss.global`
	.btn {
		background-color: unset;
		border: unset;
		&:focus {
			outline: none;
		}
	}
`

function truthy(v) {
	return !!v
}

function cx(...classNames) {
	return classNames.filter(Boolean).join(" ")
}

export default function Button({ className, red, green, indigo, children, ...props }) {
	return (
		<>
			{scss`
				$shadow-px:   0 0 0 0.5px hsl(0, 0%, 0%, 0.25);
				$shadow:      0 1px 4px -2px hsl(0, 0%, 0%, 0.25);
				$shadow-deep: 0 4px 16px -8px hsl(0, 0%, 0%, 0.25);

				$shadow-outline-width: 4px;

				.btn {
					padding: rem(12) rem(16);
					font: 400 rem(18) / 1.5 system-ui;
					border-radius: rem(12);

					transition: background-color 100ms cubic-bezier(0, 0, 0.2, 1),
						box-shadow 100ms cubic-bezier(0, 0, 0.2, 1);

					&#{&}--base {
						$bg: hsl(0, 0%, 100%);
						color: hsla(0, 0%, 0%, 0.75);
						background-color: $bg;
						box-shadow: $shadow-px, $shadow;
						&:focus {
							box-shadow: 0 0 0 0.5px hsl(210, 100%, 50%),
								0 0 0 #{3px + 1px} hsla(210, 100%, 50%, 0.25);
						}
						&:active { background: color.scale($bg, $lightness: -5%); }
					}
					&#{&}--red {
						$bg: hsl(0, 100%, 50%);
						font-weight: 500;
						color: hsla(0, 0%, 100%, 0.975);
						background-color: $bg;
						box-shadow: $shadow;
						&:focus { box-shadow: 0 0 0 3px color.scale($bg, $alpha: -67%); }
						&:active { background: color.scale($bg, $lightness: -5%); }
					}
					&#{&}--indigo {
						$bg: hsl(240, 100%, 70%);
						font-weight: 500;
						color: hsla(0, 0%, 100%, 0.975);
						background-color: $bg;
						box-shadow: $shadow;
						&:focus { box-shadow: 0 0 0 3px color.scale($bg, $alpha: -67%); }
						&:active { background: color.scale($bg, $lightness: -5%); }
					}
					&#{&}--green {
						$bg: hsl(100, 100%, 40%);
						font-weight: 500;
						color: hsla(0, 0%, 100%, 0.975);
						background-color: $bg;
						box-shadow: $shadow;
						&:focus { box-shadow: 0 0 0 3px color.scale($bg, $alpha: -67%); }
						&:active { background: color.scale($bg, $lightness: -5%); }
					}
				}
			`}
			{(!truthy(red) && !truthy(indigo) && !(green)) && (
				<button className={cx("btn btn--base", className)}
					{...props}>
						{children}
				</button>
			)}
			{truthy(red) && (
				<button className={cx("btn btn--red", className)}
					{...props}>
						{children}
				</button>
			)}
			{truthy(indigo) && (
				<button className={cx("btn btn--indigo", className)}
					{...props}>
						{children}
				</button>
			)}
			{truthy(green) && (
				<button className={cx("btn btn--green", className)}
					{...props}>
						{children}
				</button>
			)}
		</>
	)
}
