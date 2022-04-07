import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const onlyAuth = { requiresAuth: true }
const onlyNonAuth = { onlyNonAuth: true }

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      default: () => import('@/views/HomeView.vue'),
      Navbar: () => import('@/components/LoggedNavbar.vue')
    },
    meta: onlyAuth
  },
  {
    path: '/sign/:pdfId',
    name: 'sign',
    components: {
      default: () => import('@/views/SignView.vue'),
      Navbar: () => import('@/components/LoginNavbar.vue')
    },
    meta: onlyAuth
  },
  {
    path: '/upload',
    name: 'upload',
    components: {
      default: () => import('@/views/UploadView.vue'),
      Navbar: () => import('@/components/LoggedNavbar.vue')
    },
    meta: onlyAuth
  },
  {
    path: '/login',
    name: 'login',
    components: {
      default: () => import('@/views/LoginView.vue'),
      Navbar: () => import('@/components/LoginNavbar.vue')
    },
    meta: onlyNonAuth
  },
  {
    path: '/signup',
    name: 'signup',
    components: {
      default: () => import('@/views/SignupView.vue'),
      Navbar: () => import('@/components/LoginNavbar.vue')
    },
    meta: onlyNonAuth
  },
  {
    path: '/admin',
    name: 'admin',
    components: {
      default: () => import('@/views/AdminView.vue'),
      Navbar: () => import('@/components/LoggedNavbar.vue')
    },
    meta: onlyNonAuth
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
  } else if (to.meta.onlyNonAuth && isAuth) {
    return from
  }
})

export default router
