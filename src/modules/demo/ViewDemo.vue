<script setup>
import { onMounted } from "vue";
import { useDemoStore } from "./store";

import { BaseTable } from "@/components/table";
import tableConfig from "./config/table.js";

const demoStore = useDemoStore();

const handleAction = async ({ action, row }) => {
  if (action === 'view') {
    const product = await demoStore.fetchProduct(row.id)
    console.log('[view]', product ?? row)
    return
  }

  if (action === 'edit') {
    await demoStore.updateProduct(row.id, {
      title: `${row.title} (updated)`,
    })
    return
  }

  if (action === 'delete') {
    if (window.confirm(`Delete "${row.title}"?`)) {
      await demoStore.deleteProduct(row.id)
    }
  }
}

const updateMessage = () => {
  demoStore.setMessage("Hello guy!");
};

onMounted(() => {
  demoStore.fetchProducts();
});
</script>

<template>
  <div class="demo space-y-4">
    <div>
      Message: {{ demoStore.message }} <br />

      Uppercase message: {{ demoStore.uppercaseMessage }} <br />

      <button class="mt-2 text-blue-600 hover:underline" @click="updateMessage">
        Change message
      </button>
    </div>

    <p v-if="demoStore.error" class="text-sm text-red-500">
      {{ demoStore.error }}
    </p>

    <BaseTable
      show-checkbox
      :columns="tableConfig.columns"
      :data="demoStore.products"
      :loading="demoStore.loading"
      :actions="tableConfig.rowActions"
      show-actions
      empty-text="No products found"
      @action="handleAction"
    >
      <template #header-price="{ column }">
        <span class="text-green-700">{{ column.label }} ($)</span>
      </template>

      <template #cell-price="{ value }">
        <span class="font-medium text-green-700">${{ value }}</span>
      </template>

      <template #cell-title="{ row }">
        <div class="font-medium">{{ row.title }}</div>

        <div class="text-xs text-gray-500">{{ row.category }}</div>
      </template>

      <!-- Tùy chỉnh header cột actions -->
      <!-- <template #header-actions>
        <span class="text-blue-600">⚙ Thao tác</span>
      </template> -->

      <!-- Tùy chỉnh nút actions từng row -->
      <!-- <template #actions="{ row, actions }">
        <button
          v-for="action in actions"
          :key="action.key"
          type="button"
          class="rounded px-2 py-1 text-sm"
          :class="
            action.key === 'delete'
              ? 'text-red-600 hover:bg-red-50'
              : 'text-blue-600 hover:bg-blue-50'
          "
          @click="handleAction({ action: action.key, row })"
        >
          {{ action.key === 'view' ? '👁' : action.key === 'edit' ? '✏' : '🗑' }}
          {{ action.label }}
        </button>
      </template> -->
    </BaseTable>
  </div>
</template>
