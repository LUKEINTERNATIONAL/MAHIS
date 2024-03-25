import ConsultationPlan from "../views/ConsultationPlan.vue";
import Enrollment from "../views/Enrollment.vue";
export default [
    {
        path: "/OPDConsultationPlan",
        name: "OPDConsultationPlan",
        component: ConsultationPlan,
    },
    {
        path: "/OPDEnrollment",
        name: "OPDEnrollment",
        component: Enrollment,
    },
];
