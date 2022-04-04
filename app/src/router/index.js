import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const onlyAuth = { requiresAuth: true }
const onlyNonAuth = { onlyNonAuth: true }

function importComponents (main, navbar) {
  return {
    default: () => import(main),
    Navbar: () => import(navbar)
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    components: importComponents('@/views/HomeView.vue', '@/components/LoggedNavbar.vue'),
    meta: onlyAuth
  },
  {
    path: '/sign/:pdfId',
    name: 'sign',
    components: importComponents('@/views/SignView.vue', '@/components/LoginNavbar.vue'),
    meta: onlyAuth
  },
  {
    path: '/upload',
    name: 'upload',
    components: importComponents('@/views/UploadView.vue', '@/components/LoggedNavbar.vue'),
    meta: onlyAuth
  },
  {
    path: '/login',
    name: 'login',
    components: importComponents('@/views/LoginView.vue', '@/components/LoginNavbar.vue'),
    meta: onlyNonAuth
  },
  {
    path: '/signup',
    name: 'signup',
    components: importComponents('@/views/SignupView.vue', '@/components/LoginNavbar.vue'),
    meta: onlyNonAuth
  },
  {
    path: '/admin',
    name: 'admin',
    components: importComponents('@/views/AdminView.vue', '@/components/LoggedNavbar.vue'),
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
