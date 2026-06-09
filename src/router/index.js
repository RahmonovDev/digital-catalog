import { createRouter, createWebHistory } from 'vue-router'

import CatalogueView from '@/views/CatalogueView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'catalogue',
      component: CatalogueView,
    },
  ],
})

export default router
