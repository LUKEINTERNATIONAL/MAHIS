import ConsultationPlan from "../views/ConsultationPlan.vue";
import Vitals from "../views/Vitals.vue";
import Dispensations from '../views/dispensation.vue'
import Enrollment from "../views/Enrollment.vue";
import Pharmacy from '../components/Pharmacy.vue'

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
    {
        path: '/dispensation',
        name: 'Dispensation',
        component: Dispensations
    },
    {
        path: '/pharmacy',
        name: 'Pharmacy',
        component: Pharmacy
      }
];
