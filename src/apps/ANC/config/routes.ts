import symptomsFollowUp from '../views/symptomsFollowUp.vue';
import counselling from '../views/counselling.vue';
import referral from '../views/referral.vue';
import ancEnd from '../views/ancEnd.vue';
import Profile from '../views/Profile.vue';
import QuickCheck from '@/apps/ANC/views/QuickCheck.vue';
import PhysicalExam from "@/apps/ANC/views/PhysicalExam.vue";
import Treatment from '../views/Treatment.vue'
import LabTests from '../views/LabTests.vue';
import landingPage from "@/apps/ANC/views/landingPage.vue";
import PreviousVisits from "@/apps/ANC/views/PreviousVisits.vue";
import Enrollment from "@/apps/ANC/views/Enrollment.vue";
import Dashboard from "@/apps/ANC/views/Dashboard.vue";
import ProfileTest from "@/apps/ANC/views/ProfileTest.vue";



export default [
    {
    path: '/profileTest',
    name: 'ProfileTest',
    component: ProfileTest
  },
  {
    path: '/ANCEnrollment',
    name: 'ANCEnrollment',
    component: Enrollment
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },

  {
    path: '/previous-visits',
    name: 'previousVisits',
    component: PreviousVisits
  },
  {
    path: '/new-contact',
    name: 'landingPage',
    component: landingPage
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
  {
    path: '/:id',
    component: () => import('../views/Dashboard.vue')
  }


]

