import Button from "./Button"

import scss from "scss-plugin"

scss.global`
	@use "sass:color"; // For color.scale
	@use "sass:math";
	@use "sass:meta";

	@function rem($any) {
		@if not(meta.type-of($any) == number and math.is-unitless($any)) {
			@return $any; // Passthrough
		}
		$num: $any;
		@if $num == 0 {
			@return 0;
		}
		@return $num / 16 + rem;
	}

	@function em($any) {
		@if not(meta.type-of($any) == number and math.is-unitless($any)) {
			@return $any; // Passthrough
		}
		$num: $any;
		@if $num == 0 {
			@return 0;
		}
		@return $num / 16 + em;
	}

	@function px($any) {
		@if not(meta.type-of($any) == number and math.is-unitless($any)) {
			@return $any; // Passthrough
		}
		$num: $any;
		@if $num == 0 {
			@return 0;
		}
		@return $num + px;
	}

	@mixin center($dir: row) {
		display: flex;
		flex-direction: $dir;
		justify-content: center;
		align-items: center;
	}
`

export default function () {
	return (
		<>
			{scss`
				.center {
					@include center(column);
					min-height: 100vh;
					> * + * {
						margin-top: 16px;
						margin-left: revert;
					}
					@media (min-width: 768px) {
						flex-direction: row;
						> * + * {
							margin-top: revert;
							margin-left: 16px;
						}
					}
				}
			`}
			<div className="center">
				<Button>
					Hello, world!
				</Button>
				<Button red>
					Hello, world!
				</Button>
				<Button indigo>
					Hello, world!
				</Button>
				<Button green>
					Hello, world!
				</Button>
			</div>
		</>
	)
}
