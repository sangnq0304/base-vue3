<script setup>
import { useRoute, useRouter } from 'vue-router'
import TokenService from '@/helper'

const router = useRouter()
const route = useRoute()

const handleLogin = () => {
  TokenService.setToken('dev-token')

  const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
  router.push(redirect)
}
</script>

<template>
  <div class="login">
    This is page login...
    <br />
    <button @click="handleLogin">Login</button>
  </div>
</template>
