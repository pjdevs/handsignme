import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/sign/:pdfId',
    name: 'sign',
    component: () => import('../views/SignView.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('../views/UploadView.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue'),
    beforeEnter: checkAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  const auth = isAuthenticated()

  if (auth && (to.path === '/login' || to.path === '/signup')) {
    return '/'
  } else if (to.path !== '/login' && to.path !== '/signup' && !auth) {
    return '/login'
  }
})

export default router
