import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const onlyAuth = { requiresAuth: true }
const onlyNonAuth = { onlyNonAuth: true }

const loggedNavbar = () => import('@/components/LoggedNavbar.vue')
const loginNavbar = () => import('@/components/LoginNavbar.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      default: () => import('@/views/HomeView.vue'),
      Navbar: loggedNavbar
    },
    meta: onlyAuth
  },
  {
    path: '/sign/:token',
    name: 'sign',
    components: {
      default: () => import('@/views/SignView.vue'),
      Navbar: loginNavbar
    },
    meta: onlyNonAuth
  },
  {
    path: '/upload',
    name: 'upload',
    components: {
      default: () => import('@/views/UploadView.vue'),
      Navbar: loggedNavbar
    },
    meta: onlyAuth
  },
  {
    path: '/login',
    name: 'login',
    components: {
      default: () => import('@/views/LoginView.vue'),
      Navbar: loginNavbar
    },
    meta: onlyNonAuth
  },
  {
    path: '/signup',
    name: 'signup',
    components: {
      default: () => import('@/views/SignupView.vue'),
      Navbar: loginNavbar
    },
    meta: onlyNonAuth
  },
  {
    path: '/admin',
    name: 'admin',
    components: {
      default: () => import('@/views/AdminView.vue'),
      Navbar: loggedNavbar
    },
    meta: onlyNonAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from) => {
  if (to.meta.requiresAuth || to.meta.onlyAuth) {
    const auth = useAuthStore()
    const isAuth = await auth.verify()

    if (to.meta.requiresAuth && !isAuth) {
      return {
        path: '/login',
        query: { redirect: to.fullPath }
      }
    } else if (to.meta.onlyNonAuth && isAuth) {
      return from
    }
  }
})

export default router
