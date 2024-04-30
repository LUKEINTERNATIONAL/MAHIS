import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import Login from "../views/Login.vue";
import users from "../views/UserManagement/users.vue";
import PatientProfile from "../views/PatientProfile.vue";
import PatientRegistration from "@/views/Registration.vue";
import setSessionDate from "@/views/Configurations/SessionDate.vue";
import { alertController, loadingController, modalController, toastController } from "@ionic/vue";

import NCD from "@/apps/NCD/config/routes";
import OPD from "@/apps/OPD/config/routes";
import ANC from "@/apps/ANC/config/routes";
import LABOUR from "@/apps/LABOUR/config/routes";
import PNC from "@/apps/PNC/config/routes";
import Immunization from "@/apps/Immunization/config/routes";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/home",
        name: "Home",
        component: HomePage,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/patientProfile",
        name: "patientProfile",
        component: PatientProfile,
    },
    {
        path: "/setSessionDate",
        name: "setSessionDate",
        component: setSessionDate,
    },
    {
        path: "/registration/:registrationType",
        name: "registration",
        component: PatientRegistration,
        props: true,
    },
    {
        path: "/users",
        name: "users",
        component: users,
        props: true,
    },
    ...NCD,
    ...OPD,
    ...ANC,
    ...LABOUR,
    ...PNC,
    ...OPD,
    ...Immunization,
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    loadingController.getTop().then((v) => (v ? loadingController.dismiss() : null));
    modalController.getTop().then((v) => (v ? modalController.dismiss() : null));
    alertController.getTop().then((v) => (v ? alertController.dismiss() : null));
    toastController.getTop().then((v) => (v ? toastController.dismiss() : null));
    const whitelistedUri = ["/login", "/settings/host"];
    if (!sessionStorage.getItem("apiKey") && !whitelistedUri.includes(to.path)) {
        next("/login");
    }
    next();
});

export default router;
