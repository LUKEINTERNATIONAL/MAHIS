import ConsultationPlan from "../views/ConsultationPlan.vue";
import Enrollment from "../views/Enrollment.vue";
export default [
    {
        path: "/consultationPlan",
        name: "ConsultationPlan",
        component: ConsultationPlan,
    },
    {
        path: "/OPDEnrollment",
        name: "OPDEnrollment",
        component: Enrollment,
    },
];
