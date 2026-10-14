<script setup>
import { useOrdersStore } from '@/stores/orders'
const ordersStore = useOrdersStore()
</script>

<template>
  <h1 class="mb-4">Мої замовлення</h1>

  <div v-if="ordersStore.orders.length === 0" class="alert alert-info">
    Замовлень поки немає. <RouterLink to="/">Перейти до товарів</RouterLink>
  </div>

  <div v-for="order in ordersStore.orders" :key="order.id" class="card mb-3">
    <div class="card-header d-flex justify-content-between">
      <span>Замовлення №{{ order.id }}</span>
      <span class="text-muted">{{ order.date }}</span>
    </div>
    <ul class="list-group list-group-flush">
      <li v-for="item in order.items" :key="item.id" class="list-group-item d-flex justify-content-between">
        <span>{{ item.title }} × {{ item.qty }}</span>
        <span>{{ item.price * item.qty }} ₴</span>
      </li>
    </ul>
    <div class="card-footer text-end fw-bold">Разом: {{ order.total }} ₴</div>
  </div>
</template>
