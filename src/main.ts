import { createApp } from "vue";
import "./style.css";
import WebApp from "./App2.vue";
import MobileApp from "./Mobile/App.vue";
import { isMobileDevice, setDomFontSize } from "./utils";
import { createVfm } from "vue-final-modal";
import { createPinia } from "pinia";
import "vue-final-modal/style.css";
import "animate.css";

const vfm = createVfm();
let app: ReturnType<typeof createApp>;
if (isMobileDevice()) {
    const pinia = createPinia();
    setDomFontSize();
    console.log("This is a mobile device.");
    app = createApp(MobileApp);
    app.use(pinia);
} else {
    console.log("This is a desktop device.");
    app = createApp(WebApp);
}

app.use(vfm).mount("#app");
