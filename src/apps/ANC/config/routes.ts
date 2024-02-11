import Profile from '@/apps/ANC/views/Profile.vue'
import LabTests from '../views/LabTests.vue'
import Treatment from '../views/Treatment.vue'

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
  {
    path: '/treatment',
    name: 'treatment',
    component: Treatment
  },


]

