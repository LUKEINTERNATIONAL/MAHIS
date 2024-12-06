import ConsultationPlan from '../views/ConsultationPlan.vue'
import Enrollment from '@/apps/NCD/views/Enrollment.vue'
import NCDMedicationDispenstion from '../components/ConsultationPlan/NCDMedicationDispenstion.vue';
export default [
    {
        path: "/consultationPlan",
        name: "ConsultationPlan",
        component: ConsultationPlan,
    },
    {
        path: "/NCDEnrollment",
        name: "NCDEnrollment",
        component: Enrollment,
    },
    {
        path: "/NCDDispensations",
        name: "NCDDispensations",
        component: NCDMedicationDispenstion,
    },
];

