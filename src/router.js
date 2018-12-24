import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from './views/layout/Layout'
const TableIndex = () =>  import(/* webpackChunkName: "TableIndex" */ '@/views/table/index')
const TreeIndex = () =>  import(/* webpackChunkName: "TreeIndex" */ '@/views/tree/index')
Vue.use(Router)

export const constantRouterMap = [
    {
        path: '/admin/manage-users',
        component: Layout,
        role: 'admin',
        hidden: false,
        children: [{
            path: '/admin/manage-users',
            name: 'ManageUsers',
            component: () => import('@/views/admin/manage-users'),
            meta: { title: 'manage-users', icon: 'el-icon-menu' }
        }]
    },
    {
        path: '/admin/manage-money',
        component: Layout,
        role: 'admin',
        hidden: false,
        children: [
            {
                path: '/admin/manage-money',
                name: 'ManageMoney',
                component: () => import('@/views/admin/manage-money'),
                meta: { title: 'ManageMoney', icon: 'el-icon-menu' }
            }
        ]
    }
];

export const baseRoute = [
    { path: '/login', component: () => import('@/views/login/index'), hidden: true, role: 'all' },
    { path: '/register', component: () => import('@/views/register/index'), hidden: true, role: 'all' },
    { path: '/404', component: () => import('@/views/404'), hidden: true, role: 'all' },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',
        hidden: true,
        role: 'all',
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
        meta: { title: 'Example', icon: 'icon-fenleiorguangchangorqitatianchong' },
        role: 'editor3',
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
                name: 'Form',
                component: () => import('@/views/form/index'),
                meta: { title: 'Form', icon: 'icon-xinfengtianchong' }
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
            icon: 'icon-wenbenbianjitianchong'
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

    { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: baseRoute
});