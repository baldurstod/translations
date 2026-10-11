import json from '@rollup/plugin-json';


export default {
	input: './index.ts',
	output: {
		file: `./dist/index.js`,
		format: 'esm',
	},
	plugins: [
		json({
			preferConst: true,
			namedExports: false,
			compact: true,
		}),
	]
}
