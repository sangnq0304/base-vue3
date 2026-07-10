<script setup>
import { computed, ref } from 'vue';
import BaseTableHeader from './BaseTableHeader.vue';
import BaseTableBody from './BaseTableBody.vue';

const props = defineProps({
    columns: {
        type: Array,
        required: true,
    },
    data: {
        type: Array,
        default: () => [],
    },
    rowKey: {
        type: String,
        default: 'id',
    },
    showCheckbox: {
        type: Boolean,
        default: false,
    },
    selectableRow: {
        type: Function,
        default: null,
    },
    showActions: {
        type: Boolean,
        default: false,
    },
    actions: {
        type: Array,
        default: () => [],
    },
    getRowActions: {
        type: Function,
        default: null,
    },
    actionsLabel: {
        type: String,
        default: 'Actions',
    },
    loading: {
        type: Boolean,
        default: false,
    },
    emptyText: {
        type: String,
        default: 'No data',
    },
});

defineEmits(['action']);

const selectedKeys = ref([]);

const getRowKey = (row, index) => row?.[props.rowKey] ?? index;

const selectableRowKeys = computed(() =>
    props.data
        .map((row, index) => ({ row, index }))
        .filter(
            ({ row, index }) =>
                !props.selectableRow || props.selectableRow(row, index),
        )
        .map(({ row, index }) => getRowKey(row, index)),
);

const isAllSelected = computed(() => {
    if (!selectableRowKeys.value.length) return false;
    return selectableRowKeys.value.every((key) =>
        selectedKeys.value.includes(key),
    );
});

const isIndeterminate = computed(() => {
    const selectedCount = selectableRowKeys.value.filter((key) =>
        selectedKeys.value.includes(key),
    ).length;
    return selectedCount > 0 && !isAllSelected.value;
});

const toggleAll = () => {
    if (isAllSelected.value) {
        selectedKeys.value = [];
        return;
    }
    selectedKeys.value = [...selectableRowKeys.value];
};

const toggleRow = (key) => {
    const keys = [...selectedKeys.value];
    const index = keys.indexOf(key);
    if (index >= 0) {
        keys.splice(index, 1);
    } else {
        keys.push(key);
    }
    selectedKeys.value = keys;
};
</script>

<template>
    <div class="overflow-x-auto rounded-lg border border-gray-200">
        <table class="min-w-full divide-y divide-gray-200">
            <BaseTableHeader
                :columns="columns"
                :show-checkbox="showCheckbox"
                :all-selected="isAllSelected"
                :indeterminate="isIndeterminate"
                :show-actions="showActions"
                :actions-label="actionsLabel"
                @toggle-all="toggleAll"
            >
                <template #header-checkbox="slotProps">
                    <slot name="header-checkbox" v-bind="slotProps" />
                </template>
                <template
                    v-for="column in columns"
                    #[`header-${column.key}`]="slotProps"
                >
                    <slot :name="`header-${column.key}`" v-bind="slotProps" />
                </template>
                <template #header-actions="slotProps">
                    <slot name="header-actions" v-bind="slotProps" />
                </template>
            </BaseTableHeader>

            <BaseTableBody
                :columns="columns"
                :data="data"
                :row-key="rowKey"
                :show-checkbox="showCheckbox"
                :selected-keys="selectedKeys"
                :selectable-row="selectableRow"
                :show-actions="showActions"
                :actions="actions"
                :get-row-actions="getRowActions"
                :loading="loading"
                :empty-text="emptyText"
                @action="$emit('action', $event)"
                @toggle-row="toggleRow"
            >
                <template #checkbox="slotProps">
                    <slot name="checkbox" v-bind="slotProps" />
                </template>
                <template
                    v-for="column in columns"
                    #[`cell-${column.key}`]="slotProps"
                >
                    <slot :name="`cell-${column.key}`" v-bind="slotProps" />
                </template>
                <template #actions="slotProps">
                    <slot name="actions" v-bind="slotProps" />
                </template>
                <template #loading>
                    <slot name="loading" />
                </template>
                <template #empty>
                    <slot name="empty" />
                </template>
            </BaseTableBody>
        </table>
    </div>
</template>
