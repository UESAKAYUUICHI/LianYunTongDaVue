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
      path: '/showMod',
      name: 'showMod',
      component: () => import('@/view/frontEnd/showMod.vue'),
    },
    {
      path: '/backHome',
      name: 'backHome',
      component: () => import('@/view/backEnd/backHome.vue'),
      children: [
        {
          path: '/dataCenter',
          name: 'dataCenter',
          component: () => import('@/view/backEnd/dataCenter.vue'),
        },
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
        {
          path: '/cargoCategoryMg',
          name: 'cargoCategoryMg',
          component: () => import('@/view/backEnd/cargoCategoryMg.vue'),
        },
        {
          path: '/cargoCategoryMg',
          name: 'cargoCategoryMg',
          component: () => import('@/view/backEnd/cargoCategoryMg.vue'),
        },
        {
          path: '/employeeMg',
          name: '/employeeMg',
          component: () => import('@/view/backEnd/employeeMg.vue'),
        },
        {
          path: '/housewaveMg',
          name: '/housewaveMg',
          component: () => import('@/view/backEnd/housewaveMg.vue'),
        },
        {
          path: '/inventoryMg',
          name: '/inventoryMg',
          component: () => import('@/view/backEnd/inventoryMg.vue'),
        },
        {
          path: '/inboundOrderMg',
          name: '/inboundOrderMg',
          component: () => import('@/view/backEnd/inboundOrderMg.vue'),
        },
        {
          path: '/supplierMg',
          name: '/supplierMg',
          component: () => import('@/view/backEnd/supplierMg.vue'),
        },
        {
          path: '/inboundInfoMg',
          name: '/inboundInfoMg',
          component: () => import('@/view/backEnd/inboundInfoMg.vue'),
        },
        {
          path: '/outboundOrderMg',
          name: '/outboundOrderMg',
          component: () => import('@/view/backEnd/outboundOrderMg.vue'),
        },
        {
          path: '/outboundInfoMg',
          name: '/outboundInfoMg',
          component: () => import('@/view/backEnd/outboundInfoMg.vue'),
        },
        {
          path: '/vehicleTransportMg',
          name: '/vehicleTransportMg',
          component: () => import('@/view/backEnd/vehicleTransportMg.vue'),
        },
        {
          path: '/logisticsMg',
          name: '/logisticsMg',
          component: () => import('@/view/backEnd/logisticsMg.vue'),
        },
        {
          path: '/vehicleMg',
          name: '/vehicleMg',
          component: () => import('@/view/backEnd/vehicleMg.vue'),
        },
        {
          path: '/backHome',
          redirect: '/dataCenter',
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
