import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import Notifications from "@kyvg/vue3-notification";

import "./assets/main.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrash,
  faPencil,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

library.add(faTrash, faPencil, faArrowDown);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

createApp(App)
  .use(createPinia())
  .use(router)
  .use(Notifications)
  // .provide("moment", moment)
  .component("FontAwesomeIcon", FontAwesomeIcon)

  .mount("#app");
