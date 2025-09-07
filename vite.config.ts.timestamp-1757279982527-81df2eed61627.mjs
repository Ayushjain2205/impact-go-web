// vite.config.ts
import react from "file:///Users/ayush/ayush/workspace/new_labs/impact-go-web/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///Users/ayush/ayush/workspace/new_labs/impact-go-web/node_modules/vite/dist/node/index.js";
import tailwindcss from "file:///Users/ayush/ayush/workspace/new_labs/impact-go-web/node_modules/@tailwindcss/vite/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react(), tailwindcss()],
  // alias are only to be added when absolutely necessary, these modules are already present in the browser environment
  // resolve: {
  // alias: {
  // crypto: "crypto-browserify",
  // assert: "assert",
  // http: "stream-http",
  // https: "https-browserify",
  // url: "url",
  // zlib: "browserify-zlib",
  // stream: "stream-browserify",
  // },
  // },
  define: {
    global: "globalThis"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYXl1c2gvYXl1c2gvd29ya3NwYWNlL25ld19sYWJzL2ltcGFjdC1nby13ZWJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9heXVzaC9heXVzaC93b3Jrc3BhY2UvbmV3X2xhYnMvaW1wYWN0LWdvLXdlYi92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvYXl1c2gvYXl1c2gvd29ya3NwYWNlL25ld19sYWJzL2ltcGFjdC1nby13ZWIvdml0ZS5jb25maWcudHNcIjsvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXMgKi9cbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSBcIkB0YWlsd2luZGNzcy92aXRlXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKSwgdGFpbHdpbmRjc3MoKV0sXG4gIC8vIGFsaWFzIGFyZSBvbmx5IHRvIGJlIGFkZGVkIHdoZW4gYWJzb2x1dGVseSBuZWNlc3NhcnksIHRoZXNlIG1vZHVsZXMgYXJlIGFscmVhZHkgcHJlc2VudCBpbiB0aGUgYnJvd3NlciBlbnZpcm9ubWVudFxuICAvLyByZXNvbHZlOiB7XG4gIC8vIGFsaWFzOiB7XG4gIC8vIGNyeXB0bzogXCJjcnlwdG8tYnJvd3NlcmlmeVwiLFxuICAvLyBhc3NlcnQ6IFwiYXNzZXJ0XCIsXG4gIC8vIGh0dHA6IFwic3RyZWFtLWh0dHBcIixcbiAgLy8gaHR0cHM6IFwiaHR0cHMtYnJvd3NlcmlmeVwiLFxuICAvLyB1cmw6IFwidXJsXCIsXG4gIC8vIHpsaWI6IFwiYnJvd3NlcmlmeS16bGliXCIsXG4gIC8vIHN0cmVhbTogXCJzdHJlYW0tYnJvd3NlcmlmeVwiLFxuICAvLyB9LFxuICAvLyB9LFxuICBkZWZpbmU6IHtcbiAgICBnbG9iYWw6IFwiZ2xvYmFsVGhpc1wiLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8saUJBQWlCO0FBR3hCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFhaEMsUUFBUTtBQUFBLElBQ04sUUFBUTtBQUFBLEVBQ1Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
