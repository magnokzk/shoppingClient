import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/MainView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

router.beforeEach((to, from)=> {
  if(!localStorage.getItem('token') && to.name != 'login'){
    return {name: 'login'}
  }
})

export default router
