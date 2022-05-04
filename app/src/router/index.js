import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const loggedNavbar = () => import('@/components/LoggedNavbar.vue')
const loginNavbar = () => import('@/components/LoginNavbar.vue')

const routes = [
  {
    path: '/',
    name: 'landing',
    components: {
      default: () => import('@/views/LandingView.vue'),
      Navbar: loginNavbar
    },
    meta: { onlyNonAuth: true }
  },
  {
    path: '/home',
    name: 'home',
    components: {
      default: () => import('@/views/HomeView.vue'),
      Navbar: loggedNavbar
    },
    meta: { requiresAuth: true }
  },
  {
    path: '/sign/:token',
    name: 'sign',
    components: {
      default: () => import('@/views/SignView.vue'),
      Navbar: loginNavbar
    },
    meta: { requiresAuth: false }
  },
  {
    path: '/sign/success',
    name: 'signSuccess',
    components: {
      default: () => import('@/views/SignSuccessView.vue'),
      Navbar: loginNavbar
    },
    meta: { requiresAuth: false }
  },
  {
    path: '/sign/error',
    name: 'signError',
    components: {
      default: () => import('@/views/SignErrorView.vue'),
      Navbar: loginNavbar
    },
    meta: { requiresAuth: false }
  },
  {
    path: '/upload',
    name: 'upload',
    components: {
      default: () => import('@/views/UploadView.vue'),
      Navbar: loggedNavbar
    },
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    components: {
      default: () => import('@/views/LoginView.vue'),
      Navbar: loginNavbar
    },
    meta: { onlyNonAuth: true }
  },
  {
    path: '/signup',
    name: 'signup',
    components: {
      default: () => import('@/views/SignupView.vue'),
      Navbar: loginNavbar
    },
    meta: { onlyNonAuth: true }
  },
  {
    path: '/admin',
    name: 'admin',
    components: {
      default: () => import('@/views/AdminView.vue'),
      Navbar: loggedNavbar
    },
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from) => {
  if (to.meta.requiresAuth || to.meta.onlyNonAuth) {
    const auth = useAuthStore()
    const isAuth = await auth.verify()

    if (to.meta.requiresAuth && !isAuth) {
      return {
        path: '/login',
        query: { redirect: to.fullPath }
      }
    } else if (to.meta.onlyNonAuth && isAuth) {
      return '/home'
    }
  }
})

export default router
