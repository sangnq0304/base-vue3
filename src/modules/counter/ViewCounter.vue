<script setup>
  import { useCounterStore } from './store';

  const counterStore = useCounterStore()
</script>

<template>
  <div class="counter">
    <button @click="counterStore.decreaseCount"> - </button>
    {{ counterStore.count }}
    <button @click="counterStore.increaseCount"> + </button>
    <br>

    {{ counterStore.OddOrEven }}
  </div>
</template>