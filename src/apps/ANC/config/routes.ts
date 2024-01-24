import Profile from '@/apps/ANC/views/Profile.vue'
import Medications from '@/apps/ANC/components/profile/Medications.vue'
import WomanBehaviour from '@/apps/ANC/components/profile/WomanBehaviour.vue'
export default [
  {
    path: '/anc/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/anc/medications',
    name: 'Medications',
    component: Medications
  },
  {
    path: '/anc/womanBehaviour',
    name: 'WomanBehaviour',
    component: WomanBehaviour
  },
]

