import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/index',
      name: 'index',
      component: () => import('@/view/frontEnd/index.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/view/frontEnd/login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/view/frontEnd/register.vue'),
    },
    {
      path: '/productService',
      name: 'productService',
      component: () => import('@/view/frontEnd/productService.vue'),
    },
    {
      path: '/apiDocument',
      name: 'apiDocument',
      component: () => import('@/view/frontEnd/apiDocument.vue'),
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: () => import('@/view/frontEnd/aboutUs.vue'),
    },
    {
      path: '/backHome',
      name: 'backHome',
      component: () => import('@/view/backEnd/backHome.vue'),
      children: [
        {
          path: '/cargoMg',
          name: 'cargoMg',
          component: () => import('@/view/backEnd/cargoMg.vue'),
        },
        {
          path: '/orderMg',
          name: 'orderMg',
          component: () => import('@/view/backEnd/orderMg.vue'),
        },
        {
          path: '/orderInfoMg',
          name: 'orderInfoMg',
          component: () => import('@/view/backEnd/orderInfoMg.vue'),
        },
      ],
    },
    {
      path: '/',
      redirect: '/index',
    },
  ],
})

export default router
