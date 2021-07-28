import { createApp } from "vue";
import App from "./App.vue";

setInterval(() => {
  const today = new Date();
  const cas =
    new Intl.DateTimeFormat(navigator.language, {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }).format(today) +
    " " +
    new Intl.DateTimeFormat(navigator.language, {
      hour: "numeric",
      minute: "numeric",
    }).format(today);
  live.textContent = cas;
}, 1);

createApp(App).mount("#app");
