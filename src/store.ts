import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        avatar: "",
        username: "",
        email: "",
        isAnonymous: false,
    }),
});
