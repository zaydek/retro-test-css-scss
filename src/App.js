import sass from "sass-plugin"

sass`

@use "sass:color";

$gray: hsl(0, 0%, 95%);
$gray-dark:  color.adjust(hsl(0, 0%, 95%), $lightness: -1.25 * 1%);
$gray-light: color.adjust(hsl(0, 0%, 95%), $lightness:  1.25 * 1%);

// Reset
.btn {
	background-color: unset;
	border: unset;
	&:focus {
		outline: none;
	}
}

.center {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 16px;
	min-height: 100vh;
}

.btn {
	padding: 12px 24px;
	font-size: 18px;
	border-radius: 8px;
	background-color: $gray;
	box-shadow:
		0 0 0 0.5px hsl(0, 0%, 0%, 0.25),
		0 0 0 0.5px hsl(0, 0%, 0%, 0.1),
		0 2px 4px -2px hsl(0, 0%, 0%, 0.25);
	&:hover {
		background-color: $gray-light;
		box-shadow:
			0 0 0 0.5px hsl(0, 0%, 0%, 0.25),
			0 2px 4px -2px hsl(0, 0%, 0%, 0.25),
			0 4px 8px -4px hsl(0, 0%, 0%, 0.25);
	}
	&:focus {
		background-color: $gray-dark;
		box-shadow:
			0 0 0 0.5px hsl(210, 100%, 50%),
			0 0 0 3px hsla(210, 100%, 50%, 0.25);
	}
	transition: 150ms cubic-bezier(0, 0, 0.2, 1);
}

`

export default function () {
	return (
		<div className="center">
			<button className="btn">
				Hello, world!
      </button>
			<button className="btn">
				Hello, world!
      </button>
			<button className="btn">
				Hello, world!
      </button>
			<button className="btn">
				Hello, world!
      </button>
		</div>
	)
}
