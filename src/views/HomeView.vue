<script setup>
import { ref, computed } from 'vue'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard.vue'

const search = ref('')

const filtered = computed(() =>
  products.filter(p => p.title.toLowerCase().includes(search.value.toLowerCase()))
)
</script>

<template>
  <h1 class="mb-4">Товари</h1>

  <input v-model="search" class="form-control mb-4" placeholder="Пошук товару..." />

  <div class="row g-4">
    <div v-for="product in filtered" :key="product.id" class="col-12 col-sm-6 col-lg-4">
      <ProductCard :product="product" />
    </div>
  </div>

  <p v-if="filtered.length === 0" class="text-muted mt-3">Нічого не знайдено.</p>
</template>
