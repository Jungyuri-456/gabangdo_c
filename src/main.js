import "./assets/Main.scss";
import "./assets/tailwind.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

// createApp(App).mount('#app')
const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount("#app");
if (import.meta.env.PROD) {
  // 전역 훅 차단: Devtools가 이걸 찾지 못하면 연동이 안 됨
  Object.defineProperty(window, "__VUE_DEVTOOLS_GLOBAL_HOOK__", {
    value: {},
    configurable: false,
    writable: false,
  });
}
