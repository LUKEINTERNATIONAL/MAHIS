import ConsultationPlan from '../views/ConsultationPlan.vue'
import Enrollment from '@/apps/NCD/views/Enrollment.vue'
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
]

