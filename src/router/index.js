import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CartView from '@/views/CartView.vue'
import OrdersView from '@/views/OrdersView.vue'

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: 'active',
  routes: [
    { path: '/', component: HomeView },
    { path: '/cart', component: CartView },
    { path: '/orders', component: OrdersView },
  ],
})

export default router
