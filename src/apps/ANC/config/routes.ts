import symptomsFollowUp from '../views/symptomsFollowUp.vue';
import counselling from '../views/counselling.vue';
import ancEnd from '../views/ancEnd.vue';
import Profile from '../views/Profile.vue';
import QuickCheck from '@/apps/ANC/views/QuickCheck.vue';
import Treatment from '../views/Treatment.vue'
import LabTests from '../views/LabTests.vue';
import Enrollment from "@/apps/ANC/views/Enrollment.vue";
import physicalExamination from '@/apps/ANC/views/physicalExamination.vue';
import Referral from "@/apps/ANC/views/referral.vue";
import physicalExamination from "@/apps/ANC/views/physicalExamination.vue";
import headssAssessment from "@/apps/ANC/views/headssAssessment.vue";



export default [
  {
    path: '/ANCEnrollment',
    name: 'ANCEnrollment',
    component: Enrollment
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/quickCheck',
    name:'quickCheck',
    component: QuickCheck
  },
  {
    path: '/headssAssessment',
    name:'headsAssessment',
    component: headssAssessment
  },
  {
    path: '/physicalExamination',
    name: 'physicalExamination',
    component: physicalExamination
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
    component: Referral
  },
  {
    path: '/ancEnd',
    name: 'ancEnd',
    component: ancEnd
  },
  {
    path: '/treatment',
    name: 'treatment',
    component: Treatment
  },
  {
    path: '/labTests',
    name: 'labTests',
    component: LabTests
  },
]

