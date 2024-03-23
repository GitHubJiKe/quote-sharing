import { createApp } from "vue";
import "./style.css";
import MobileApp from "./Mobile/App.vue";
import { setDomFontSize } from "./utils";
import { createVfm } from "vue-final-modal";
import { createPinia } from "pinia";
import "vue-final-modal/style.css";
import "animate.css";
import { initApp } from "./firebase";
import "virtual:uno.css";
import { LoadingPlugin } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import Vue3Toasity from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { router } from "./Mobile/routes";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

const firebaseApp = initApp();
const vfm = createVfm();
let app: ReturnType<typeof createApp>;
const pinia = createPinia();
setDomFontSize();
app = createApp(MobileApp);
app.use(router);
app.use(pinia);
app.use(LoadingPlugin);
app.use(Vue3Toasity);
app.use(vfm);
if (firebaseApp) {
    app.mount("#app");
}
