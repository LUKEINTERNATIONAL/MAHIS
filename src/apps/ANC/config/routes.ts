import pastMedicalHistory from '../views/pastMedicalHistory.vue';
import symptomsFollowUp from '../views/symptomsFollowUp.vue';
import counselling from '../views/counselling.vue';
import final from '../views/final.vue';
export default [
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
  {
    path: '/counselling',
    name: 'counselling',
    component: counselling
  },
  {
    path: '/final',
    name: 'final',
    component: final
  },
]

