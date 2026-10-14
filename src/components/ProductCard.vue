<script setup>
import { useCartStore } from '@/stores/cart'

defineProps({ product: Object })
const cart = useCartStore()
</script>

<template>
  <div class="card h-100">
    <img :src="product.image" class="card-img-top" :alt="product.title" />
    <div class="card-body d-flex flex-column justify-content-between">
      <div>
        <h5 class="card-title">{{ product.title }}</h5>
        <p class="fw-bold">{{ product.price }} ₴</p>
      </div>
      <button class="btn btn-primary w-100" @click="cart.add(product)">У кошик</button>
    </div>
  </div>
</template>
