import symptomsFollowUp from '../views/symptomsFollowUp.vue';
import counselling from '../views/counselling.vue';
import ancEnd from '../views/ancEnd.vue';
import Profile from '../views/Profile.vue';
import QuickCheck from '@/apps/ANC/views/QuickCheck.vue';
import Treatment from "@/apps/ANC/views/Treatment.vue";
import LabTests from '../views/LabTests.vue';
import physicalExamination from "@/apps/ANC/views/physicalExamination.vue";
import headssAssessment from "@/apps/ANC/views/headssAssessment.vue";
import ANCTreatment from "@/apps/ANC/views/ANCTreatment.vue";
import ANCHome from '../views/ANCHome.vue';
import referral from "@/apps/ANC/views/referral.vue";
import ANCreferral from "@/apps/ANC/views/ANCreferral.vue";


export default [

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
    component: referral
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
    path: '/ANCtreatment',
    name: 'ANCTreatment',
    component: ANCTreatment
  },
  {
    path: '/labTests',
    name: 'labTests',
    component: LabTests
  },
  {
    path: '/ancReferral',
    name: 'ancReferral',
    component: ANCreferral
  },
  {
    path: '/ANChome',
    name:'ANCHome',
    component: ANCHome

  }

];

