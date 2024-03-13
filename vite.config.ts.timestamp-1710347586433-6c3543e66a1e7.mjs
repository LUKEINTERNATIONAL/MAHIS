// vite.config.ts
import legacy from "file:///var/www/MaHIS/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import vue from "file:///var/www/MaHIS/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import { defineConfig } from "file:///var/www/MaHIS/node_modules/vite/dist/node/index.js";
import { visualizer } from "file:///var/www/MaHIS/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var __vite_injected_original_dirname = "/var/www/MaHIS";
var vite_config_default = defineConfig({
  plugins: [vue(), legacy()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  test: {
    globals: true,
    environment: "jsdom"
  },
  build: {
    rollupOptions: {
      plugins: [visualizer()]
    }
  },
  base: "/mahis/"
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvdmFyL3d3dy9NYUhJU1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3Zhci93d3cvTWFISVMvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3Zhci93d3cvTWFISVMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgbGVnYWN5IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1sZWdhY3lcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSBcInJvbGx1cC1wbHVnaW4tdmlzdWFsaXplclwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbdnVlKCksIGxlZ2FjeSgpXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHRlc3Q6IHtcbiAgICAgICAgZ2xvYmFsczogdHJ1ZSxcbiAgICAgICAgZW52aXJvbm1lbnQ6IFwianNkb21cIixcbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgICAgIHBsdWdpbnM6IFt2aXN1YWxpemVyKCldLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgYmFzZTogXCIvbWFoaXMvXCIsXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNE4sT0FBTyxZQUFZO0FBQy9PLE9BQU8sU0FBUztBQUNoQixPQUFPLFVBQVU7QUFDakIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxrQkFBa0I7QUFKM0IsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7QUFBQSxFQUN6QixTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDeEM7QUFBQSxFQUNKO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDRixTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsRUFDakI7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNILGVBQWU7QUFBQSxNQUNYLFNBQVMsQ0FBQyxXQUFXLENBQUM7QUFBQSxJQUMxQjtBQUFBLEVBQ0o7QUFBQSxFQUNBLE1BQU07QUFDVixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
