import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';


export default {
	input: './index.ts',
	output: {
		file: `./dist/index.js`,
		format: 'esm',
	},
	plugins: [
		typescript({ compilerOptions: { target: 'es2023' } }),
		json({
			preferConst: true,
			namedExports: false,
			compact: true,
		}),
	],
	external: [
		'fs',
		'path',
	],
}
