const cssRe = /(?!\/\/\s*)css`((?:\n.*?)+)`/gm
const scssGlobalRe = /(?!\/\/\s*)scss\.global`((?:\n.*?)+)`/gm
const scssInlineRe = /(?!\/\/\s*)scss(?!\.global)`((?:\n.*?)+)`/gm

function scanCSSMatches(contents) {
	const matches = []
	let match = null
	while ((match = cssRe.exec(contents))) {
		matches.push(match[1])
	}
	return matches
}

function scanSCSSMatches(contents) {
	const globals = []
	const inlines = []
	let match = null
	while ((match = scssGlobalRe.exec(contents))) {
		globals.push(match[1])
	}
	while ((match = scssInlineRe.exec(contents))) {
		inlines.push(match[1])
	}
	return [globals, inlines]
}

/**
 * @type { import("esbuild").Plugin }
 */
const cssPlugin = {
	name: "css",
	setup(build) {
		const fs = require("fs")

		const importers = new Set()

		build.onResolve({ filter: /^css-plugin$/ }, args => {
			importers.add(args.importer)
			return {
				path: args.path,
				namespace: "css-ns",
			}
		})
		build.onLoad({ filter: /.*/, namespace: "css-ns" }, async args => {
			const matches = []
			for (const importer of importers) {
				const buffer = await fs.promises.readFile(importer)
				matches.push(...scanCSSMatches(buffer.toString()))
			}

			let css = ""
			for (const match of matches) {
				if (css !== "") css += "\n"
				css += match
			}

			return {
				contents: `
					import "data:text/css,${encodeURI(css)}"
					export default function () {}
				`,
				loader: "js",
			}
		})
	},
}

/**
 * @type { import("esbuild").Plugin }
 */
const scssPlugin = {
	name: "scss",
	setup(build) {
		const fs = require("fs")
		const scss = require("sass")

		const importers = new Set()

		build.onResolve({ filter: /^scss-plugin$/ }, args => {
			importers.add(args.importer)
			return {
				path: args.path,
				namespace: "scss-ns",
			}
		})
		build.onLoad({ filter: /.*/, namespace: "scss-ns" }, async args => {
			const globals = [], inlines = []
			for (const importer of importers) {
				const buffer = await fs.promises.readFile(importer)
				const [globals_, inlines_] = scanSCSSMatches(buffer.toString())
				globals.push(...globals_)
				inlines.push(...inlines_)
			}

			let allGlobals = ""
			for (const global of globals) {
				allGlobals += `
					${global}
				`
			}

			let allInlines = ""
			for (const inline of inlines) {
				allInlines += `
					@at-root {
						${inline}
					}
				`
			}

			const result = scss.renderSync({
				data: `
					${allGlobals}
					${allInlines}
				`,
			})
			const css = result.css.toString()

			return {
				contents: `
					import "data:text/css,${encodeURI(css)}"
					function scss() {}
					Object.assign(scss, {
						global() {}
					})
					export default scss
				`,
				loader: "js",
			}
		})
	},
}

module.exports = {
	target: ["es2017"],
	plugins: [
		cssPlugin,
		scssPlugin,
	]
}
