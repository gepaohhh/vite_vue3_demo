import * as path from "path";
import { title } from "process";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Index',
        meta: {
            title: '首页',
            keepAlive: true,
            requireAuth: true
        },
        component: () => import('@/pages/HomePage/index.vue')
    },
    {
        path: '/DataManager',
        name: 'DataManager',
        meta: {
            title: '数据管理',
            keepAlive: true,
            requireAuth: true
        },
        component: () => import('@/pages/DataManager/index.vue')
    },
    {
        path: '/CropAnalysis',
        name: 'CropAnalysis',
        meta: {
            title: '作物分析',
            keepAlive: true,
            requireAuth: true
        },
        component: () => import('@/pages/CropAnalysis/index.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;