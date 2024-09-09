import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'LoginPage',
        meta: {
            title: '登录',
            keepAlive: true,
            requireAuth: false
        },
        component: () => import('@/pages/login.vue')
    },
    {
        path: '/Index',
        name: 'Index',
        meta: {
            title: '首页',
            keepAlive: true,
            requireAuth: true
        },
        component: () => import('@/pages/index.vue')
    },
    {
        path: '/vueUse_test',
        name: 'vueUse_test',
        meta: {
            title: 'vueUse测试',
            keepAlive: true,
            requireAuth: true
        },
        component: () => import('@/pages/vueUse_test.vue')
    },
    {
        path: '/map_test',
        name: 'map_test',
        meta: {
            title: 'vueUse测试',
            keepAlive: true,
            requireAuth: true
        },
        component: () => import('@/pages/map_test.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;