// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
	build: {
		lib: {
			// Could also be a dictionary or array of multiple entry points
			entry: resolve(__dirname, 'lib/extendedGraphics.ts'),
			name: 'ExtendedGraphics',
			// the proper extensions will be added
			fileName: 'extendedGraphics',
		},
		rollupOptions: {
			// make sure to externalize deps that shouldn't be bundled
			// into your library
			external: ['pixi.js', "@pixi/math-extras"],
			output: {
				// Provide global variables to use in the UMD build
				// for externalized deps
				globals: {
					["pixi.js"]: "pixi.js",
				},
			},
		},
	},
	plugins: [dts({ rollupTypes: true })]
})