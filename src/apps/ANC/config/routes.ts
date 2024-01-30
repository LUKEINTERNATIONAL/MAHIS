
import Profile from '@/apps/ANC/views/Profile.vue'
import QuickCheck from '@/apps/ANC/views/QuickCheck.vue'
import Medications from '@/apps/ANC/components/profile/Medications.vue'
import WomanBehaviour from "@/apps/ANC/views/WomanBehaviour.vue";
import Medical from '@/apps/ANC/views/medical.vue';
import PastObstreticHistory from "@/apps/ANC/components/profile/PastObstreticHistory.vue";
export default [
  {
    path: '/anc/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/anc/quickCheck',
    name: 'QuickCheck',
    component: QuickCheck
  },
  {
    path: '/anc/medications',
    name: 'Medications',
    component: Medications
  },
  {
    path: '/anc/pastObstetricHistory',
    name: 'pastObstetricHistory',
    component: PastObstreticHistory
  },
  {
    path: '/anc/womanBehaviour',
    name: 'WomanBehaviour',
    component: WomanBehaviour
  },
  {
    path: '/medical',
    name: 'medical',
    component: Medical
  },
]