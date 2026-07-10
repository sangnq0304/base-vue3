<script setup>
defineProps({
    columns: {
        type: Array,
        required: true,
    },
    showCheckbox: {
        type: Boolean,
        default: false,
    },
    allSelected: {
        type: Boolean,
        default: false,
    },
    indeterminate: {
        type: Boolean,
        default: false,
    },
    showActions: {
        type: Boolean,
        default: false,
    },
    actionsLabel: {
        type: String,
        default: 'Actions',
    },
    actionsWidth: {
        type: String,
        default: '160px',
    },
});

const emit = defineEmits(['toggle-all']);

const alignClass = (align = 'left') => {
    const map = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    };
    return map[align] ?? map.left;
};
</script>

<template>
    <thead class="bg-gray-50">
        <tr>
            <th
                v-if="showCheckbox"
                scope="col"
                class="w-12 px-4 py-3 text-center"
            >
                <slot name="header-checkbox">
                    <input
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300"
                        :checked="allSelected"
                        :indeterminate="indeterminate"
                        @change="emit('toggle-all')"
                    />
                </slot>
            </th>
            <th
                v-for="column in columns"
                :key="column.key"
                scope="col"
                class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600"
                :class="alignClass(column.align)"
                :style="column.width ? { width: column.width } : undefined"
            >
                <slot :name="`header-${column.key}`" :column="column">
                    {{ column.label }}
                </slot>
            </th>
            <th
                v-if="showActions"
                scope="col"
                class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-600"
                :style="{ width: actionsWidth }"
            >
                <slot name="header-actions">
                    {{ actionsLabel }}
                </slot>
            </th>
        </tr>
    </thead>
</template>
