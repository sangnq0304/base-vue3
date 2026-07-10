import { createRouter, createWebHistory } from 'vue-router';
import TokenService from '../helper';

import loginRoutes from '@/modules/login/router';
import homeRoute from '@/modules/home/router';
import demoRoute from '@/modules/demo/router';
import counterRoute from '@/modules/counter/router';

const routes = [
    ...loginRoutes,
    {
        path: '/',
        component: () =>
            import(/* webpackChunkName: "Layout" */ '@/layouts/MainLayout.vue'),
        children: [homeRoute, demoRoute, counterRoute],
    },
    {
        path: '/404',
        name: '404',
        meta: { title: '404', auth: false },
        component: () => import('@/views/View404.vue'),
    },
    {
        path: '/500',
        name: '500',
        meta: { title: '500', auth: false },
        component: () => import('@/views/View500.vue'),
    },
    { path: '/:pathMatch(.*)*', redirect: '/404' },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.auth);
    const token = TokenService.getToken();

    if (requiresAuth && !token) {
        return next({
            name: 'login',
            query: { redirect: to.fullPath },
        });
    }

    if (to.name === 'login' && token) {
        const redirect =
            typeof to.query.redirect === 'string' ? to.query.redirect : '/';
        return next(redirect);
    }

    return next();
});

router.afterEach((to) => {
    document.title = to.meta.title;
});

export default router;
