import pastMedicalHistory from '../views/pastMedicalHistory.vue';
import symptomsFollowUp from '../views/symptomsFollowUp.vue';
import counselling from '../views/counselling.vue';
import referral from '../views/referral.vue';
import ancEnd from '../views/ancEnd.vue';
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
    path: '/referral',
    name: 'referral',
    component: referral
  },
    {
    path: '/ancEnd',
    name: 'ancEnd',
    component: ancEnd
  },
]

