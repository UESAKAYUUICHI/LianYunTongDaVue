import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/index',
      name: 'index',
      component: () => import('@/view/front/index.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/view/front/login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/view/front/register.vue'),
    },
    {
      path: '/productService',
      name: 'productService',
      component: () => import('@/view/front/productService.vue'),
    },
    {
      path: '/',
      redirect: '/index',
    },
  ],
})

export default router
