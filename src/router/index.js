import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CartView from '@/views/CartView.vue'
import UsersView from '@/views/UsersView.vue'
import OrdersView from '@/views/OrdersView.vue'

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: 'active',
  routes: [
    { path: '/', component: HomeView },
    { path: '/cart', component: CartView },
    { path: '/users', component: UsersView },
    { path: '/orders', component: OrdersView },
  ],
})

export default router
