import Profile from '../views/Profile.vue';
import QuickCheck from '@/apps/ANC/views/QuickCheck.vue';
import Medications from '@/apps/ANC/components/Profile/Medications.vue'
import WomanBehaviour from "@/apps/ANC/components/Profile/WomanBehaviour.vue";
import PastObstreticHistory from "@/apps/ANC/components/Profile/PastObstreticHistory.vue";
import PhysicalExam from "@/apps/ANC/views/PhysicalExam.vue";
import Treatment from '../views/Treatment.vue'
import LabTests from '../views/LabTests.vue';

export default [
  {
    path: '/profile',
    name: 'profile',
    component: Profile
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
    path: '/pastObstetricHistory',
    name: 'pastObstetricHistory',
    component: PastObstreticHistory
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

