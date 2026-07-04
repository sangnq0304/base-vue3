<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogin = () => {
  router.push({ name: 'demo' })
}
</script>

<template>
  <div class="login">This is page login...</div>
  <button @click="handleLogin">Login</button>
</template>
