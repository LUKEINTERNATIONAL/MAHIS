import postnatalDetails from "@/apps/PNC/views/postnatalDetails.vue";
import postnatalWardMonitoring from "@/apps/PNC/views/postnatalWardMonitoring.vue";
import postnatalBabyStatus from "@/apps/PNC/views/postnatalBabyStatus.vue";
import postnatalVisit from "@/apps/PNC/views/postnatalVisit.vue";
import dischargeWoman from "@/apps/PNC/views/dischargeWoman.vue";
import pncEnd from "@/apps/PNC/views/pncEnd.vue";
import PNCHome from "@/apps/PNC/views/PNCHome.vue";

export default [
    {
        path: "/postnatalDetails",
        name: "postnatalDetails",
        component: postnatalDetails,
    },
    {
        path: "/postnatalWardMonitoring",
        name: "postnatalWardMonitoring",
        component: postnatalWardMonitoring,
    },
    {
        path: "/babyStatus",
        name: "postnatalBabyStatus",
        component: postnatalBabyStatus,
    },
    {
        path: "/postnatalVisit",
        name: "postnatalVisit",
        component: postnatalVisit,
    },
    {
        path: "/dischargeWoman",
        name: "dischargeWoman",
        component: dischargeWoman,
    },
    {
        path: "/pncEnd",
        name: "pncEnd",
        component: pncEnd,
    },
    {
        path: "/PNCHome",
        name: "PNCHome",
        component: PNCHome,
    },
];
