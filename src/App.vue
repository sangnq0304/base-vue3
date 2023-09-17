<template>
  <div class="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/demo">Demo</router-link>
    <router-link to="/counter">Counter</router-link>
  </div>

  <router-view v-slot="{ Component }">
    <Transition
      name="fade"
    >
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<style>
  .nav {
    margin-bottom: 20px;
  }

  .nav a {
    padding-right: 10px;
  }
</style>
