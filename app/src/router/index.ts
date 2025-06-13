import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SigninView from '../views/SigninView.vue'
import ProfileView from '../views/ProfileView.vue'
import GameView from '../views/GameView.vue'
import StoreView from '@/views/StoreView.vue'
import StatsView from '@/views/StatsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/signin',
      name: 'signin',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: SigninView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/game',
      name: 'game',
      component: GameView,
    },
    {
      path: '/store',
      name: 'store',
      component: StoreView,
    },
    {
      path: '/stats',
      name: 'stats',
      component: StatsView,
    },
  ],
})

export default router