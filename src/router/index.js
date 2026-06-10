import { createRouter, createWebHistory } from 'vue-router'

import CatalogueView from '@/views/CatalogueView.vue'
import ProductView from '@/views/ProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'catalogue',
      component: CatalogueView,
    },
    {
      path: '/products/:id',
      name: 'product',
      component: ProductView,
      props: true,
    },
  ],
})

export default router
