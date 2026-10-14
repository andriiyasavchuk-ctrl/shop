import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const totalCount = computed(() => items.value.reduce((sum, i) => sum + i.qty, 0))
  const totalPrice = computed(() => items.value.reduce((sum, i) => sum + i.price * i.qty, 0))

  function add(product) {
    const item = items.value.find(i => i.id === product.id)
    if (item) {
      item.qty++
    } else {
      items.value.push({ ...product, qty: 1 })
    }
  }

  function changeQty(id, delta) {
    const item = items.value.find(i => i.id === id)
    if (item) {
      item.qty += delta
      if (item.qty <= 0) remove(id)
    }
  }

  function remove(id) {
    items.value = items.value.filter(i => i.id !== id)
  }

  function clear() {
    items.value = []
  }

  return { items, totalCount, totalPrice, add, changeQty, remove, clear }
})
