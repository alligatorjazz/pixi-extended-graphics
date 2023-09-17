// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///Users/bright-silicon/Documents/lab/dotted-lines-example/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/bright-silicon/Documents/lab/dotted-lines-example/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/bright-silicon/Documents/lab/dotted-lines-example";
var vite_config_default = defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__vite_injected_original_dirname, "lib/extendedGraphics.ts"),
      name: "ExtendedGraphics",
      // the proper extensions will be added
      fileName: "extendedGraphics"
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["pixi.js", "@pixi/math-extras"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          ["pixi.js"]: "pixi.js"
        }
      }
    }
  },
  plugins: [dts({ rollupTypes: true })]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYnJpZ2h0LXNpbGljb24vRG9jdW1lbnRzL2xhYi9kb3R0ZWQtbGluZXMtZXhhbXBsZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2JyaWdodC1zaWxpY29uL0RvY3VtZW50cy9sYWIvZG90dGVkLWxpbmVzLWV4YW1wbGUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2JyaWdodC1zaWxpY29uL0RvY3VtZW50cy9sYWIvZG90dGVkLWxpbmVzLWV4YW1wbGUvdml0ZS5jb25maWcudHNcIjsvLyB2aXRlLmNvbmZpZy5qc1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG5cdGJ1aWxkOiB7XG5cdFx0bGliOiB7XG5cdFx0XHQvLyBDb3VsZCBhbHNvIGJlIGEgZGljdGlvbmFyeSBvciBhcnJheSBvZiBtdWx0aXBsZSBlbnRyeSBwb2ludHNcblx0XHRcdGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgJ2xpYi9leHRlbmRlZEdyYXBoaWNzLnRzJyksXG5cdFx0XHRuYW1lOiAnRXh0ZW5kZWRHcmFwaGljcycsXG5cdFx0XHQvLyB0aGUgcHJvcGVyIGV4dGVuc2lvbnMgd2lsbCBiZSBhZGRlZFxuXHRcdFx0ZmlsZU5hbWU6ICdleHRlbmRlZEdyYXBoaWNzJyxcblx0XHR9LFxuXHRcdHJvbGx1cE9wdGlvbnM6IHtcblx0XHRcdC8vIG1ha2Ugc3VyZSB0byBleHRlcm5hbGl6ZSBkZXBzIHRoYXQgc2hvdWxkbid0IGJlIGJ1bmRsZWRcblx0XHRcdC8vIGludG8geW91ciBsaWJyYXJ5XG5cdFx0XHRleHRlcm5hbDogWydwaXhpLmpzJywgXCJAcGl4aS9tYXRoLWV4dHJhc1wiXSxcblx0XHRcdG91dHB1dDoge1xuXHRcdFx0XHQvLyBQcm92aWRlIGdsb2JhbCB2YXJpYWJsZXMgdG8gdXNlIGluIHRoZSBVTUQgYnVpbGRcblx0XHRcdFx0Ly8gZm9yIGV4dGVybmFsaXplZCBkZXBzXG5cdFx0XHRcdGdsb2JhbHM6IHtcblx0XHRcdFx0XHRbXCJwaXhpLmpzXCJdOiBcInBpeGkuanNcIixcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0fSxcblx0fSxcblx0cGx1Z2luczogW2R0cyh7IHJvbGx1cFR5cGVzOiB0cnVlIH0pXVxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUhoQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMzQixPQUFPO0FBQUEsSUFDTixLQUFLO0FBQUE7QUFBQSxNQUVKLE9BQU8sUUFBUSxrQ0FBVyx5QkFBeUI7QUFBQSxNQUNuRCxNQUFNO0FBQUE7QUFBQSxNQUVOLFVBQVU7QUFBQSxJQUNYO0FBQUEsSUFDQSxlQUFlO0FBQUE7QUFBQTtBQUFBLE1BR2QsVUFBVSxDQUFDLFdBQVcsbUJBQW1CO0FBQUEsTUFDekMsUUFBUTtBQUFBO0FBQUE7QUFBQSxRQUdQLFNBQVM7QUFBQSxVQUNSLENBQUMsU0FBUyxHQUFHO0FBQUEsUUFDZDtBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUFBLEVBQ0EsU0FBUyxDQUFDLElBQUksRUFBRSxhQUFhLEtBQUssQ0FBQyxDQUFDO0FBQ3JDLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
