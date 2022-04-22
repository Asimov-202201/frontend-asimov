import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/dashboard/pages/dashboard')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/dashboard/pages/dashboard')
  },
  {
    path: '/announcements',
    name: 'announcements',
    component: () => import(/* webpackChunkName: "announcements" */ '@/announcements/pages/announcements')
  },
  {
    path: '/competences',
    name: 'competences',
    component: () => import(/* webpackChunkName: "competences" */ '@/competences/pages/competences')
  },
  {
    path: '/courses',
    name: 'courses',
    component: () => import(/* webpackChunkName: "courses" */ '@/courses/pages/courses')
  },
  {
    path: '/courses/:id',
    name: 'course-detail',
    component: () => import(/* webpackChunkName: "course-detail" */ '@/courses/pages/course-detail')

  },
  {
    path: '/teachers',
    name: 'teachers',
    component: () => import(/* webpackChunkName: "teachers" */ '@/teachers/pages/teachers')
  },
  {
    path: '/teachers/:id',
    name: 'teacher-detail',
    component: () => import('@/teachers/pages/teacher-detail')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/profile/pages/profile')
  },
  {
    path: "/top-teachers",
    name: 'top-teachers',
    component: () => import(/* webpackChunkName: "top-teachers" */ '@/top-teachers/pages/top-teachers')
  },
  {
    path: '/announcements-for-teachers',
    name: 'announcements-for-teachers',
    component: () => import(/* webpackChunkName: "announcements-for-teachers" */ '@/announcements/pages/announcements-for-teachers')
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import(/* webpackChunkName: "sign-up" */ '@/sign-up/pages/sign-up')
  },
  {
    path: '/log-in',
    name: 'log-in',
    component: () => import(/* webpackChunkName: "log-in" */ '@/log-in/pages/log-in')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
