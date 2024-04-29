import BirthRegistration from "@/apps/Immunization/views/BirthRegistration.vue";
import consultationPlan from "@/apps/Immunization/views/consultationPlan.vue";
export default [
    {
        path: "/birthRegistration",
        name: "birthRegistration",
        component: BirthRegistration,
    },
    {
        path: "/immunizationConsultation",
        name: "immunizationConsultation",
        component: consultationPlan,
    },
];
