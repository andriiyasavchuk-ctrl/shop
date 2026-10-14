<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const router = useRouter()

const users = ref([])
const userId = ref('')

onMounted(async () => {
  const res = await fetch('/api/users')
  users.value = await res.json()
})

async function checkout() {
  for (const item of cart.items) {
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId.value,
        product: `${item.title} × ${item.qty}`,
        amount: item.price * item.qty,
      }),
    })
  }
  cart.clear()
  router.push('/orders')
}
</script>

<template>
  <h1 class="mb-4">Кошик</h1>

  <div v-if="cart.items.length === 0" class="alert alert-info">
    Кошик порожній. <RouterLink to="/">Перейти до товарів</RouterLink>
  </div>

  <div v-else>
    <table class="table align-middle">
      <thead>
        <tr><th>Товар</th><th>Ціна</th><th>Кількість</th><th>Сума</th><th></th></tr>
      </thead>
      <tbody>
        <tr v-for="item in cart.items" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.price }} ₴</td>
          <td>
            <div class="btn-group btn-group-sm">
              <button class="btn btn-outline-secondary" @click="cart.changeQty(item.id, -1)">−</button>
              <span class="btn btn-outline-secondary disabled">{{ item.qty }}</span>
              <button class="btn btn-outline-secondary" @click="cart.changeQty(item.id, 1)">+</button>
            </div>
          </td>
          <td>{{ item.price * item.qty }} ₴</td>
          <td class="text-end">
            <button class="btn btn-sm btn-outline-danger" @click="cart.remove(item.id)">Видалити</button>
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-3">До сплати: {{ cart.totalPrice }} ₴</h4>

    <select v-model="userId" class="form-select mb-3" style="max-width: 300px">
      <option value="" disabled>Оберіть покупця</option>
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>

    <div>
      <button class="btn btn-outline-secondary me-2" @click="cart.clear()">Очистити</button>
      <button class="btn btn-success" :disabled="!userId" @click="checkout">Оформити замовлення</button>
    </div>
  </div>
</template>
