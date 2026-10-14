<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])
const name = ref('')
const role = ref('user')

async function loadUsers() {
  const res = await fetch('/api/users')
  users.value = await res.json()
}

async function addUser() {
  await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name.value, role: role.value }),
  })
  name.value = ''
  await loadUsers()
}

async function deleteUser(id) {
  await fetch(`/api/users/${id}`, { method: 'DELETE' })
  await loadUsers()
}

onMounted(loadUsers)
</script>

<template>
  <h1 class="mb-4">Користувачі</h1>

  <form class="row g-2 mb-4" @submit.prevent="addUser">
    <div class="col-sm-5">
      <input v-model="name" class="form-control" placeholder="Ім'я" required />
    </div>
    <div class="col-sm-4">
      <select v-model="role" class="form-select">
        <option value="user">user</option>
        <option value="admin">admin</option>
      </select>
    </div>
    <div class="col-sm-3">
      <button class="btn btn-success w-100">Додати</button>
    </div>
  </form>

  <table class="table align-middle">
    <thead>
      <tr><th>ID</th><th>Ім'я</th><th>Роль</th><th></th></tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.role }}</td>
        <td class="text-end">
          <button class="btn btn-sm btn-outline-danger" @click="deleteUser(user.id)">Видалити</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
