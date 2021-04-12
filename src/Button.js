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

export default function ({ red, green, indigo, children }) {
	return (
		<>
			{scss`
				.btn {
					$bg: whitesmoke;

					padding: 12px 24px;
					font: 400 18px / 1.5 system-ui;
					border-radius: 12px;
					background-color: $bg;
					box-shadow: 0 0 0 0.5px hsl(0, 0%, 0%, 0.25),
						0 0 0 0.5px hsl(0, 0%, 0%, 0.1),
						0 2px 4px -2px hsl(0, 0%, 0%, 0.25);
					&:hover {
						box-shadow: 0 0 0 0.5px hsl(0, 0%, 0%, 0.25),
							0 2px 4px -2px hsl(0, 0%, 0%, 0.25),
							0 12px 24px -12px hsl(0, 0%, 0%, 0.25);
					}
					&:focus {
						box-shadow: 0 0 0 0.5px hsl(210, 100%, 50%),
							0 0 0 3px hsla(210, 100%, 50%, 0.25);
					}
					&:active {
						background: color.scale($bg, $lightness: -5%);
					}
					transition: background 250ms cubic-bezier(0, 0, 0.2, 1),
						box-shadow 250ms cubic-bezier(0, 0, 0.2, 1);

					&#{&}--red {
						$bg: red;
						font-weight: 500;
						color: white;
						background-color: $bg;
						&:focus { box-shadow: 0 0 0 3px color.scale($bg, $alpha: -67%); }
						&:active { background: color.scale($bg, $lightness: -5%); }
					}
					&#{&}--indigo {
						$bg: hsl(240, 100%, 67%);
						font-weight: 500;
						color: white;
						background-color: $bg;
						&:focus { box-shadow: 0 0 0 3px color.scale($bg, $alpha: -67%); }
						&:active { background: color.scale($bg, $lightness: -5%); }
					}
					&#{&}--green {
						$bg: hsl(100, 100%, 40%);
						font-weight: 500;
						color: white;
						background-color: hsl(100, 100%, 40%);
						&:focus { box-shadow: 0 0 0 3px color.scale($bg, $alpha: -67%); }
						&:active { background: color.scale($bg, $lightness: -5%); }
					}
				}
			`}
			{(!red && !indigo && !green) && (
				<button className="btn">
					{children}
				</button>
			)}
			{red && (
				<button className="btn btn--red">
					{children}
				</button>
			)}
			{indigo && (
				<button className="btn btn--green">
					{children}
				</button>
			)}
			{green && (
				<button className="btn btn--indigo">
					{children}
				</button>
			)}
		</>
	)
}
