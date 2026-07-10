<script setup>
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
    selectedKeys: {
        type: Array,
        default: () => [],
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
    loading: {
        type: Boolean,
        default: false,
    },
    emptyText: {
        type: String,
        default: 'No data',
    },
});

const emit = defineEmits(['action', 'toggle-row']);

const alignClass = (align = 'left') => {
    const map = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    };
    return map[align] ?? map.left;
};

const actionClass = (variant = 'default') => {
    const base = 'rounded px-2 py-1 text-sm transition-colors';
    const variants = {
        default: 'text-blue-600 hover:bg-blue-50',
        danger: 'text-red-600 hover:bg-red-50',
        success: 'text-green-600 hover:bg-green-50',
    };
    return `${base} ${variants[variant] ?? variants.default}`;
};

const colSpan = () =>
    props.columns.length +
    (props.showCheckbox ? 1 : 0) +
    (props.showActions ? 1 : 0);

const getRowKey = (row, index) => row?.[props.rowKey] ?? index;

const isRowSelectable = (row, index) =>
    !props.selectableRow || props.selectableRow(row, index);

const isRowSelected = (row, index) =>
    props.selectedKeys.includes(getRowKey(row, index));

const getVisibleActions = (row, index) => {
    if (props.getRowActions) {
        return props.getRowActions(row, index) ?? [];
    }

    return props.actions.filter(
        (action) => !action.visible || action.visible(row, index),
    );
};

const handleAction = (actionKey, row, index) => {
    emit('action', { action: actionKey, row, index });
};

const handleToggleRow = (row, index) => {
    emit('toggle-row', getRowKey(row, index));
};
</script>

<template>
    <tbody class="divide-y divide-gray-200 bg-white">
        <tr v-if="loading">
            <td
                :colspan="colSpan()"
                class="px-4 py-8 text-center text-gray-500"
            >
                <slot name="loading">Loading...</slot>
            </td>
        </tr>

        <tr v-else-if="!data.length">
            <td
                :colspan="colSpan()"
                class="px-4 py-8 text-center text-gray-500"
            >
                <slot name="empty">{{ emptyText }}</slot>
            </td>
        </tr>

        <tr
            v-else
            v-for="(row, index) in data"
            :key="getRowKey(row, index)"
            class="hover:bg-gray-50"
        >
            <td v-if="showCheckbox" class="px-4 py-3 text-center">
                <slot
                    name="checkbox"
                    :row="row"
                    :index="index"
                    :selected="isRowSelected(row, index)"
                    :selectable="isRowSelectable(row, index)"
                >
                    <input
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300"
                        :checked="isRowSelected(row, index)"
                        :disabled="!isRowSelectable(row, index)"
                        @change="handleToggleRow(row, index)"
                    />
                </slot>
            </td>

            <td
                v-for="column in columns"
                :key="column.key"
                class="px-4 py-3 text-sm text-gray-800"
                :class="alignClass(column.align)"
            >
                <slot
                    :name="`cell-${column.key}`"
                    :row="row"
                    :column="column"
                    :value="row[column.key]"
                    :index="index"
                >
                    {{ row[column.key] }}
                </slot>
            </td>

            <td
                v-if="showActions"
                class="space-x-1 px-4 py-3 text-right whitespace-nowrap"
            >
                <slot
                    name="actions"
                    :row="row"
                    :index="index"
                    :actions="getVisibleActions(row, index)"
                >
                    <button
                        v-for="action in getVisibleActions(row, index)"
                        :key="action.key"
                        type="button"
                        :class="actionClass(action.variant)"
                        @click="handleAction(action.key, row, index)"
                    >
                        {{ action.label }}
                    </button>
                </slot>
            </td>
        </tr>
    </tbody>
</template>
