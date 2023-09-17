<script setup>
  import { onMounted, ref } from "vue";
  import { useDemoStore } from "./store";

  import { RepositoryFactory } from "@/repositories/repository-factory";
  const demo = RepositoryFactory.get("demo");

  const products = ref([]);
  const getData = async () => {
    const response = await demo.getProducts();
    if (response.success) {
      products.value = response?.data?.data;
    }
  };

  const demoStore = useDemoStore();
  const updateMessage = () => {
    demoStore.setMessage("Hello guy!");
  };

  onMounted(() => {
    getData();
  });
</script>

<template>
  <div class="demo">
    Message: {{ demoStore.message }} <br />
    Uppercase message: {{ demoStore.uppercaseMessage }} <br />
    <button @click="updateMessage">Change message</button>
  </div>
</template>
