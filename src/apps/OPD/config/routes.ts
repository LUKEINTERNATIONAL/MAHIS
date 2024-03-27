import ConsultationPlan from "../views/ConsultationPlan.vue";
import Vitals from "../views/Vitals.vue";
import Enrollment from "../views/Enrollment.vue";
export default [
    {
        path: "/OPDConsultationPlan",
        name: "OPDConsultationPlan",
        component: ConsultationPlan,
    },
    {
        path: "/OPDVitals",
        name: "OPDVitals",
        component: Vitals,
    },
    {
        path: "/OPDEnrollment",
        name: "OPDEnrollment",
        component: Enrollment,
    },
];
