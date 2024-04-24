import Enrollment from "@/apps/Immunization/views/Enrollment.vue";
import consultationPlan from "@/apps/Immunization/views/consultationPlan.vue";
export default [
    {
        path: "/immunizationEnrollment",
        name: "immunizationEnrollment",
        component: Enrollment,
    },
    {
        path: "/immunizationConsultation",
        name: "immunizationConsultation",
        component: consultationPlan,
    },
];
