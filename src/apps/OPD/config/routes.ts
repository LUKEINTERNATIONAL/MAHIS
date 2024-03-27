import ConsultationPlan from '../views/ConsultationPlan.vue'
import Enrollment from '@/apps/NCD/views/Enrollment.vue'
import Dispensations from '../views/dispensation.vue'
import Pharmacy from '../components/Pharmacy.vue'
export default [
  {
    path: '/consultationPlan',
    name: 'ConsultationPlan',
    component: ConsultationPlan
  },
  {
    path: '/NCDEnrollment',
    name: 'NCDEnrollment',
    component: Enrollment
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
]

