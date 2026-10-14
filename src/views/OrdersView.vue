<script setup>
import { ref, onMounted } from 'vue'

const orders = ref([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const res = await fetch('/api/orders')
    if (!res.ok) throw new Error(`Сервер відповів помилкою ${res.status}`)
    orders.value = await res.json()
  } catch (e) {
    error.value = 'Не вдалося завантажити замовлення. Чи запущений бекенд?'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <h1 class="mb-4">Замовлення</h1>

  <div v-if="loading" class="spinner-border text-primary"></div>

  <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

  <div v-else-if="orders.length === 0" class="alert alert-info">Замовлень поки немає.</div>

  <table v-else class="table">
    <thead>
      <tr><th>№</th><th>Покупець</th><th>Товар</th><th>Сума</th></tr>
    </thead>
    <tbody>
      <tr v-for="order in orders" :key="order.id">
        <td>{{ order.id }}</td>
        <td>{{ order.user_name }}</td>
        <td>{{ order.product }}</td>
        <td>{{ order.amount }} ₴</td>
      </tr>
    </tbody>
  </table>
</template>
