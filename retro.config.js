const cssRe = /^css`((?:\n.*?)+)`/gm
const sassRe = /^sass`((?:\n.*?)+)`/gm

function scanCSSMatches(jsContents) {
	const matches = []
	let match = null
	while ((match = cssRe.exec(jsContents))) {
		matches.push(match[1])
	}
	return matches
}

function scanSassMatches(jsContents) {
	const matches = []
	let match = null
	while ((match = sassRe.exec(jsContents))) {
		matches.push(match[1])
	}
	return matches
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
		build.onLoad({ filter: /.*/, namespace: "css-ns" }, async () => {
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
const sassPlugin = {
	name: "sass",
	setup(build) {
		const fs = require("fs")
		const sass = require("sass")

		const importers = new Set()

		build.onResolve({ filter: /^sass-plugin$/ }, args => {
			importers.add(args.importer)
			return {
				path: args.path,
				namespace: "sass-ns",
			}
		})
		build.onLoad({ filter: /.*/, namespace: "sass-ns" }, async () => {
			const matches = []
			for (const importer of importers) {
				const buffer = await fs.promises.readFile(importer)
				matches.push(...scanSassMatches(buffer.toString()))
			}

			let sass_ = ""
			for (const match of matches) {
				if (sass_ !== "") sass_ += "\n"
				sass_ += match
			}

			const result = sass.renderSync({ data: sass_ })
			const css = result.css.toString()

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

module.exports = {
	target: ["es2017"],
	plugins: [
		cssPlugin,
		sassPlugin,
	]
}
