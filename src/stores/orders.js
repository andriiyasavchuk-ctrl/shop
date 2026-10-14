import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref([])

  function createOrder(items, total) {
    orders.value.push({
      id: orders.value.length + 1,
      date: new Date().toLocaleString('uk-UA'),
      items: items.map(i => ({ ...i })),
      total,
    })
  }

  return { orders, createOrder }
})
