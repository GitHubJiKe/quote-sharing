import { defineStore } from "pinia";
import {
    bgcolors,
    fontColors,
    funIcons,
    operations,
    visibleItems,
} from "../constants";

export const useMobileStore = defineStore("mobile", {
    state: () => ({
        activeBgcolor: bgcolors[0],
        visibleItems: visibleItems,
        activeTab: operations[0].value,
        currentIcon: funIcons[0].value,
        temp: "Clean",
        fontColor: fontColors[0],
        datetimeStr: new Date().toLocaleString(),
        count: 0,
        text: "",
    }),
    getters: {
        authorLineShow(s) {
            return s.visibleItems.find((v) => v.value === "author");
        },
    },
});
