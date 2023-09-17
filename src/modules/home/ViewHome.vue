<script setup>
  import { ref } from "vue";

  const show = ref(false);
  const handleToggle = () => {
    show.value = !show.value;
  };
</script>

<template>
  <div class="home">
    <Transition name="fade">
      <span v-if="show">Home page</span>
    </Transition>
    <br />
    <button @click="handleToggle">Toggle</button>
  </div>
</template>