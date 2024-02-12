

import Profile from '@/apps/ANC/views/Profile.vue'
import QuickCheck from '@/apps/ANC/views/QuickCheck.vue'
import PastObstreticHistory from "@/apps/ANC/components/profile/PastObstreticHistory.vue";
import PhysicalExam from "@/apps/ANC/views/PhysicalExam.vue";
import pastMedicalHistory from '../views/pastMedicalHistory.vue';
import symptomsFollowUp from '../views/symptomsFollowUp.vue';
import counselling from '../views/counselling.vue';
import referral from '../views/referral.vue';
import ancEnd from '../views/ancEnd.vue';

export default [

  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
    {
    path: '/pastMedicalHistory',
    name: 'pastMedicalHistory',
    component: pastMedicalHistory
  },
  {

    path: '/quickCheck',
    name: 'QuickCheck',
    component: QuickCheck
  },
  {
    path: '/physicalExam',
    name: 'PhysicalExam',
    component: PhysicalExam
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