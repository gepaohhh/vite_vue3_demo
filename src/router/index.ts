import * as path from "path";
import { title } from "process";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const DataRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Index',
        meta: {
            title: '首页',
            keepAlive: true,
            requireAuth: true,
            DataSideBar: true,
        },
        component: () => import('@/pages/HomePage/index.vue')
    },
    {
        path: '/DataManager',
        name: 'DataManager',
        meta: {
            title: '数据管理',
            keepAlive: true,
            requireAuth: true,
            DataSideBar: true
        },
        component: () => import('@/pages/DataManager/index.vue'),
    },
    {
        path: '/CropAnalysis',
        name: 'CropAnalysis',
        meta: {
            title: '作物分析',
            keepAlive: true,
            requireAuth: true,
            DataSideBar: false
        },
        component: () => import('@/pages/CropAnalysis/index.vue')
    },
]

const DataRouter = createRouter({
    history: createWebHistory(),
    routes: DataRoutes
});
export default DataRouter;