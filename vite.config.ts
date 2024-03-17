import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import postCssPxToRem from "postcss-pxtorem";
// https://vitejs.dev/config/
const isMobile = process.env.PLATFORM === "mobile";
import UnoCSS from "unocss/vite";
export default defineConfig({
    plugins: [vue(), UnoCSS()],
    server: {
        proxy: {
            "/api": "http://api.fanyi.baidu.com/api/trans/vip/translate",
        },
    },
    css: {
        postcss: {
            plugins: isMobile
                ? [
                      postCssPxToRem({
                          rootValue: 12, // 1rem的大小
                          propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
                      }),
                  ]
                : [],
        },
    },
    build: {
        outDir: "docs",
        chunkSizeWarningLimit: 400,
        rollupOptions: {
            output: {
                manualChunks: {
                    vue: ["vue"],
                    "vue-router": ["vue-router"],
                },
            },
        },
    },
    base: "/quote-sharing",
});
