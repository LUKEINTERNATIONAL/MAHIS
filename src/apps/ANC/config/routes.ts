import Profile from '@/apps/ANC/views/Profile.vue'
import LabTests from '../views/LabTests.vue'

export default [
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/lab_tests',
    name: 'lab',
    component: LabTests
  },
]

