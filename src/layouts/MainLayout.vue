<template>
    <div class="h-screen overflow-hidden bg-content">
        <div class="flex h-full pl-[260px]">
            <BaseSidebar />
            <main class="flex min-w-0 flex-1 flex-col">
                <BaseHeader />
                <div class="flex-1 overflow-y-auto p-6">
                    <router-view />
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

import BaseSidebar from '@/components/BaseSidebar.vue';
import BaseHeader from '@/components/BaseHeader.vue';

export default defineComponent({
    name: 'MainLayout',
    components: {
        BaseSidebar,
        BaseHeader
    },

    setup() {}
})
</script>