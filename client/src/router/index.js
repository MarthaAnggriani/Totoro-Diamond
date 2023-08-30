import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from "../views/LoginPage.vue"
import HomePage from "../views/HomePage.vue"
import RegisterPage from "../views/RegisterPage.vue"
import DiamondPage from "../views/DiamondPage.vue"
import HeroPage from "../views/HeroPage.vue"
import HistoryPage from "../views/HistoryPage.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterPage
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/diamonds',
      name: 'diamonds',
      component: DiamondPage
    },
    {
      path: '/heroes',
      name: 'heroes',
      component: HeroPage
    },
    {
      path: '/histories',
      name: 'histories',
      component: HistoryPage
    },
    // { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === "home" && !localStorage.access_token) { next('/login') }
  else if (to.name === "login" && localStorage.access_token) { next('/') }
  else { next() }
})
export default router
