import { createApp } from "vue";
import "./style.css";
import WebApp from "./App2.vue";
import MobileApp from "./App3.vue";
import { isMobileDevice, setDomFontSize } from "./utils";
import { createVfm } from "vue-final-modal";
import "vue-final-modal/style.css";
import "animate.css";

const vfm = createVfm();
let app: ReturnType<typeof createApp>;
if (isMobileDevice()) {
    setDomFontSize();
    console.log("This is a mobile device.");
    app = createApp(MobileApp);
} else {
    console.log("This is a desktop device.");
    app = createApp(WebApp);
}

app.use(vfm).mount("#app");
