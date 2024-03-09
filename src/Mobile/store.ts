import { defineStore } from "pinia";
import { bgcolors, funIcons, operations, visibleItems } from "../constants";

export const useMobileStore = defineStore("mobile", {
    state: () => ({
        activeBgcolor: bgcolors[0],
        visibleItems: visibleItems,
        activeTab: operations[0].value,
        currentIcon: funIcons[0].value,
        text: "点击此处输入您想分享的内容...",
        temp: "Clean",
    }),
    getters: {
        authorLineShow(s) {
            return s.visibleItems.find((v) => v.value === "author");
        },
        datetimeStr() {
            return new Date().toLocaleString();
        },
        count(s) {
            return s.text.length;
        },
    },
});
