import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/sign/:pdfId',
    name: 'sign',
    component: () => import('../views/SignView.vue')
  },
  {
    path: '/landing',
    name: 'landing',
    component: () => import('../views/Landing.vue')
  },
  {
    path: '/auth',
    redirect: '/auth/login',
    component: () => import('../layouts/Auth.vue'),
    children: [
      {
        path: '/auth/login',
        component: () => import('../views/auth/Login.vue')
      },
      {
        path: '/auth/register',
        component: () => import('../views/auth/Register.vue')
      }
    ]
  },
  {
    path: '/auth/register',
    name: 'register',
    component: () => import('../views/auth/Register.vue')
  },
  {
    path: '/admin',
    redirect: '/admin/dashboard',
    component: () => import('../layouts/Admin.vue'),
    children: [
      {
        path: '/admin/dashboard',
        component: () => import('../views/admin/Dashboard.vue')
      },
      {
        path: '/admin/settings',
        component: () => import('../views/admin/Settings.vue')
      },
      {
        path: '/admin/tables',
        component: () => import('../views/admin/Tables.vue')
      }
    ]
  },
  {
    path: '/profile',
    component: () => import('../views/Profile.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
