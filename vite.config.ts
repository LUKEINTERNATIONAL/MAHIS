import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig(({ command, mode }) => {
    return {
        plugins: [vue(), legacy()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        test: {
            globals: true,
            environment: "jsdom",
        },
        build: {
            rollupOptions: {
                plugins: [visualizer()],
            },
        },
        base: mode == "development" ? "mahis/" : "",
    };
});
