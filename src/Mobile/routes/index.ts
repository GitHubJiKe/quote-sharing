import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";
import { logPageView } from "../../firebase";

const routes: RouteRecordRaw[] = [
    { path: "/", component: () => import("../pages/LandingPage.vue") },
    { path: "/writing", component: () => import("../pages/WritingPage.vue") },
    // { path: "/list", component: () => import("../pages/ListPage.vue") },
    {
        path: "/list",
        component: () => import("../pages/ListPageWeChatStyle.vue"),
    },
    { path: "/payment", component: () => import("../pages/PayPage.vue") },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((from, to, next) => {
    logPageView({
        from: from.fullPath,
        to: to.fullPath,
    });
    next();
});

export { router };
