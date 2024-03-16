import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";
import LandingPage from "../pages/LandingPage.vue";
import WritingPage from "../pages/WritingPage.vue";
import ListPage from "../pages/ListPage.vue";
import { logPageView } from "../../firebase";

const routes: RouteRecordRaw[] = [
    { path: "/", component: LandingPage },
    { path: "/writing", component: WritingPage },
    { path: "/list", component: ListPage },
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
