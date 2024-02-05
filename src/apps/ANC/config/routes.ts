import Medical from '@/apps/ANC/views/medical.vue';
import pastMedicalHistory from '../views/pastMedicalHistory.vue';
import symptomsFollowUp from '../views/symptomsFollowUp.vue';
export default [
  {
    path: '/medical',
    name: 'medical',
    component: Medical
  },
    {
    path: '/pastMedicalHistory',
    name: 'pastMedicalHistory',
    component: pastMedicalHistory
  },
  {
    path: '/symptomsFollowUp',
    name: 'symptomsFollowUp',
    component: symptomsFollowUp
  },
]

