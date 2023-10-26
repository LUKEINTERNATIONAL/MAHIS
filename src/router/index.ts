import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import ConsultationPlan from '../views/ConsultationPlan.vue'
import Login from '../views/Login.vue'
import StartTriage from '../views/StartTriage.vue'
import Triage from '../views/Triage.vue'
import TriageSummary from '../views/TriageSummary.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/consultationPlan',
    name: 'ConsultationPlan',
    component: ConsultationPlan
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/triage',
    name: 'Triage',
    component: Triage
  },
  {
    path: '/startTriage',
    name: 'StartTriage',
    component: StartTriage
  },
  {
    path: '/triageSummary',
    name: 'TriageSummary',
    component: TriageSummary
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
