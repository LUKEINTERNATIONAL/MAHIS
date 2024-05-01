import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import vSelect from "vue-select";

import { IonicVue } from "@ionic/vue";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

import VueDatePicker from "@vuepic/vue-datepicker";

import "@vuepic/vue-datepicker/dist/main.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";
/* font variables */
import "./font/variables.css";
import "./css/style.css";
import "./css/component_view.css";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";

const pinia = createPinia();
const app = createApp(App).use(IonicVue).use(router).use(pinia);

app.component("VueDatePicker", VueDatePicker);
app.component("EasyDataTable", Vue3EasyDataTable);
app.component("v-select", vSelect);
pinia.use(piniaPluginPersistedState);
DataTable.use(DataTablesCore);
router.isReady().then(() => {
    app.mount("#app");
});
