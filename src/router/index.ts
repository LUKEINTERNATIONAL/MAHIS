import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import stockManagement from "../views/StockManagement.vue";
import OfflineRecords from "../views/OfflineRecords.vue";
import scheduleImmunization from "../views/ScheduleImmunizationSessions.vue";
import manageAppointMents from "../views/ManageAppointMents.vue";
import ManageAppointMentsTemplate from "../views/ManageAppointMentsTemplate.vue";
import Scan from "../components/Registration/ScanRegistration.vue";
import Login from "../views/Login.vue";
import users from "@/views/UserManagement/users.vue";
import locationsManagement from "@/views/LocationsManagement.vue";
import clinicalDaysTemplate from "@/views/ClinicalDays/clinicalDaysTemplate.vue";
import PatientProfile from "../views/PatientProfile.vue";
import PatientRegistration from "@/views/Registration.vue";
import setSmsConfig from "@/views/Configurations/SmsConfig.vue";
import setDDE from "@/views/Configurations/setDDE.vue";
import SetSitePrefix from "@/views/Configurations/SetSitePrefix.vue";
import PrivacyPolicyView from "@/views/PrivacyPolicyView.vue";
import { alertController, loadingController, modalController, toastController } from "@ionic/vue";

import NCD from "@/apps/NCD/config/routes";
import OPD from "@/apps/OPD/config/routes";
import ANC from "@/apps/ANC/config/routes";
import LABOUR from "@/apps/LABOUR/config/routes";
import PNC from "@/apps/PNC/config/routes";
import EIR from "@/apps/Immunization/config/routes";
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
        path: "/stockManagement",
        name: "stockManagement",
        component: stockManagement,
    },
    {
        path: "/locationsManagement",
        name: "locationsManagement",
        component: locationsManagement,
    },
    {
        path: "/OfflineRecords",
        name: "OfflineRecords",
        component: OfflineRecords,
    },
    {
        path: "/setDDE",
        name: "setDDE",
        component: setDDE,
    },
    {
        path: "/setSitePrefix",
        name: "setSitePrefix",
        component: SetSitePrefix,
    },
    {
        path: "/scheduleImmunization",
        name: "scheduleImmunization",
        component: scheduleImmunization,
    },
    {
        path: "/manageAppointMents",
        name: "manageAppointMents",
        component: manageAppointMents,
    },
    {
        path: "/ManageAppointMentsTemplate",
        name: "ManageAppointMentsTemplate",
        component: ManageAppointMentsTemplate,
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
        path: "/setSmsConfig",
        name: "setSMSConfiguration",
        component: setSmsConfig,
    },
    {
        path: "/registration/manual",
        name: "registration",
        component: PatientRegistration,
        props: true,
    },
    {
        path: "/users",
        name: "users",
        component: users,
    },
    {
        path: "/clinicaldays",
        name: "clinicaldays",
        component: clinicalDaysTemplate,
    },
    {
        path: "/registration/scan",
        name: "scan",
        component: Scan,
    },
    {
        path: "/privacypolicy",
        name: "privacypolicy",
        component: PrivacyPolicyView,
    },
    {
        path: "/managePrinters",
        name: "managePrinters",
        component: () => import("@/views/ManagePrinters.vue"),
    },
    ...NCD,
    ...OPD,
    ...ANC,
    ...LABOUR,
    ...PNC,
    ...OPD,
    ...EIR,
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
    const whitelistedUri = ["/login", "/settings/host", "/privacypolicy"];
    if (!localStorage.getItem("apiKey") && !whitelistedUri.includes(to.path)) {
        next("/login");
    }
    next();
});

export default router;
