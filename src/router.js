import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from './views/layout/Layout'
// 异步加载 按需加载
const TableIndex = () =>  import(/* webpackChunkName: "TableIndex" */ '@/views/table/index')
const TreeIndex = () =>  import(/* webpackChunkName: "TreeIndex" */ '@/views/tree/index')

// 同步加载 按需加载
// const TechnologyIndex = require(/* webpackChunkName: "TechnologyIndex" */ '@/views/display/technology')
const TechnologyIndex = () =>  import(/* webpackChunkName: "TechnologyIndex" */ '@/views/display/technology')
// const FictionIndex = require(/* webpackChunkName: "FictionIndex" */ '@/views/display/fiction')
const FictionIndex = () => import(/* webpackChunkName: "FictionIndex" */ '@/views/display/fiction')

Vue.use(Router)

export const asyncRouterMap = [
    {
        path: '/admin/manage-users',
        component: Layout,
        meta: {roles: ['admin', 'boss']},
        hidden: false,
        children: [{
            path: '/admin/manage-users',
            name: 'ManageUsers',
            component: () => import('@/views/admin/manage-users'),
            meta: { title: 'manage-users', icon: 'icon-huiyuan' }
        }]
    },
    {
        path: '/admin/manage-money',
        component: Layout,
        meta: {roles: ['admin', 'boss']},
        hidden: false,
        children: [
            {
                path: '/admin/manage-money',
                name: 'ManageMoney',
                component: () => import('@/views/admin/manage-money'),
                meta: { title: 'Manage-money', icon: 'icon-huiyuanjifen' }
            }
        ]
    },
    { path: '*', redirect: '/404', hidden: true }
];

export const constantRouterMap = [
    { path: '/login', component: () => import('@/views/login/index'), hidden: true, roles: 'all' },
    { path: '/register', component: () => import('@/views/register/index'), hidden: true, roles: 'all' },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',
        hidden: true,
        roles: 'all',
        children: [{
            path: 'dashboard',
            component: () => import('@/views/dashboard/index'),
        }]
    },
    {
        path: '/example',
        component: Layout,
        redirect: '/example/table',
        name: 'Example',
        // meta: { title: 'Example', icon: 'example' },
        meta: { title: 'Example', icon: 'icon-qudaoguanli' },
        roles: 'dev',
        children: [
            {
                path: 'table',
                name: 'Table',
                component: TableIndex,
                meta: { title: 'Table', icon: 'icon-shoujitianchong' }
            },
            {
                path: 'tree',
                name: 'Tree',
                component: TreeIndex,
                // meta: { title: 'Tree', icon: 'tree' }
                meta: { title: 'Tree', icon: 'icon-gengduotianchong' }
            }
            /** 
             * 多个子路由，某些子路由用户有权限，某些没有权限，因此role 要放在最内层的 的children里
             * 这里简化处理，暂不这样做
             * */
        ]
    },

    {
        path: '/form',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'Edit',
                component: () => import('@/views/edit/index'),
                meta: { title: 'edit', icon: 'icon-huiyuandingyi' }
            }
        ]
    },

    {
        path: '/nested',
        component: Layout,
        redirect: '/nested/menu1',
        name: 'nested',
        meta: {
            title: 'nested',
            icon: 'icon-shijianguanli'
        },
        children: [
            {
                path: 'menu1',
                component: () => import('@/views/nested/menu1/index'), // Parent router-view
                name: 'menu1',
                meta: { title: 'menu1' },
                children: [
                    {
                        path: 'menu1-1',
                        component: () => import('@/views/nested/menu1/menu1-1'),
                        name: 'menu1-1',
                        meta: { title: 'menu1-1' }
                    },
                    {
                        path: 'menu1-2',
                        component: () => import('@/views/nested/menu1/menu1-2'),
                        name: 'menu1-2',
                        meta: { title: 'menu1-2' },
                        children: [
                            {
                                path: 'menu1-2-1',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                                name: 'menu1-2-1',
                                meta: { title: 'menu1-2-1' }
                            },
                            {
                                path: 'menu1-2-2',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                                name: 'menu1-2-2',
                                meta: { title: 'menu1-2-2' }
                            }
                        ]
                    },
                    {
                        path: 'menu1-3',
                        component: () => import('@/views/nested/menu1/menu1-3'),
                        name: 'menu1-3',
                        meta: { title: 'menu1-3' }
                    }
                ]
            },
            {
                path: 'menu2',
                component: () => import('@/views/nested/menu2/index'),
                meta: { title: 'menu2' }
            }
        ]
    },
    {
        path: '/display',
        component: Layout,
        redirect: '/display/tech',
        name: 'Display',
        // meta: { title: 'Example', icon: 'example' },
        meta: { title: 'display', icon: 'icon-yingxiaocehua' },
        role: 'dev',
        children: [
            {
                path: 'technology',
                name: 'Technology',
                component: TechnologyIndex,
                meta: { title: 'technology', icon: 'icon-shoujitianchong' }
            },
            {
                path: 'fiction',
                name: 'Fiction',
                component: FictionIndex,
                meta: { title: 'Fiction', icon: 'icon-gengduotianchong' }
            }
        ]
    },
    { path: '/404', component: () => import('@/views/404'), hidden: true, role: 'all' },
]

export default new Router({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});