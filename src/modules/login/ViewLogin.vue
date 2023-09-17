<script setup>
  import {useRouter} from 'vue-router'
  import TokenService from '@/helper';

  const router = useRouter()

  const handleLogin = () => {
    const fakeToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ"
    TokenService.setToken(fakeToken)
    router.push({name: 'demo'})
  }
</script>

<template>
  <div class="login">This is page login...</div>
  <button @click="handleLogin">Login</button>
</template>