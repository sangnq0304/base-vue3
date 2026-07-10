<template>
    <aside
        class="fixed inset-y-0 left-0 z-10 grid h-screen w-[260px] grid-rows-[auto_1fr_auto] overflow-hidden bg-sidebar text-sidebar-text"
    >
        <div
            class="border-b border-sidebar-active p-4 font-semibold text-white"
        >
            Logo
        </div>

        <nav class="sidebar-nav overflow-y-auto overscroll-contain p-3">
            <div class="flex flex-col gap-2">
                <router-link
                    v-for="item in menuItems"
                    :key="item.id"
                    :to="item.to"
                    class="block shrink-0 rounded-md px-3 py-2 text-sidebar-text transition-colors hover:bg-sidebar-hover hover:text-white"
                    exact-active-class="bg-sidebar-active text-white"
                >
                    {{ item.label }}
                </router-link>
            </div>
        </nav>

        <div
            class="border-t border-sidebar-active p-4 font-semibold text-white"
        >
            Setting
        </div>
    </aside>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BaseSidebar',

    setup() {
        const menuItems = [
            { id: 1, to: '/', label: 'Home' },
            { id: 2, to: '/demo', label: 'Demo' },
            { id: 3, to: '/counter', label: 'Counter' },
        ];

        return { menuItems };
    },
});
</script>

<style scoped>
.sidebar-nav {
    scrollbar-width: thin;
    scrollbar-color: #334155 #0f172a;
}

.sidebar-nav::-webkit-scrollbar {
    width: 6px;
}

.sidebar-nav::-webkit-scrollbar-track {
    background: #0f172a;
}

.sidebar-nav::-webkit-scrollbar-thumb {
    background: #334155;
    border-radius: 9999px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
    background: #475569;
}
</style>
