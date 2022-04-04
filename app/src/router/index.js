import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      default: () => import('@/views/HomeView.vue'),
      Navbar: () => import('@/components/LoggedNavbar.vue')
    },
    meta: { requiresAuth: true }
  },
  {
    path: '/sign/:pdfId',
    name: 'sign',
    components: {
      default: () => import('@/views/SignView.vue'),
      Navbar: () => import('@/components/LoginNavbar.vue')
    },
    meta: { requiresAuth: true }
  },
  {
    path: '/upload',
    name: 'upload',
    components: {
      default: () => import('@/views/UploadView.vue'),
      Navbar: () => import('@/components/LoggedNavbar.vue')
    },
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    components: {
      default: () => import('@/views/LoginView.vue'),
      Navbar: () => import('@/components/LoginNavbar.vue')
    },
    meta: { requiresAuth: false, onlyUnauth: true }
  },
  {
    path: '/signup',
    name: 'signup',
    components: {
      default: () => import('@/views/SignupView.vue'),
      Navbar: () => import('@/components/LoginNavbar.vue')
    },
    meta: { requiresAuth: false, onlyUnauth: true }
  },
  {
    path: '/admin',
    name: 'admin',
    components: {
      default: () => import('@/views/AdminView.vue'),
      Navbar: () => import('@/components/LoggedNavbar.vue')
    },
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from) => {
  const auth = useAuthStore()
  const isAuth = await auth.verify()

  if (to.meta.requiresAuth && !isAuth) {
    return {
      path: '/login',
      query: { redirect: to.fullPath }
    }
  } else if (to.meta.onlyUnauth && isAuth) {
    return from
  }
})

export default router
