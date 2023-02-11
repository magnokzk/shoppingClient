import { createRouter, createWebHistory } from 'vue-router'
import _ from 'underscore'
import HomeView from '../views/MainView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

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
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ]
})

router.beforeEach(async (to, from)=> {
  const token = localStorage.getItem('token')

  const isTokenValid = async () => {
    if(!token){
      return false
    }

    // TODO: check token validity on api? maybe? check if its needed.

    return true
  }

  if(!(await isTokenValid()) && !(_.contains(['login', 'register'], to.name))){
    return {name: 'login'}
  }

  // TODO: rewrite this part in an acceptable way
  if((await isTokenValid()) && _.contains(['login', 'register'], to.name)){
    return {name: 'home'}
  }
})

export default router
