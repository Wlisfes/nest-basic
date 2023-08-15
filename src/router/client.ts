import type { RouteRecordRaw } from 'vue-router'

export const client: Array<RouteRecordRaw> = [
    {
        path: '/middle',
        redirect: '/middle/login',
        name: 'Compute',
        meta: { Authorize: 'AUTH_NONE' },
        component: () => import('@/views/middle/compute.vue'),
        children: [
            {
                path: '/middle/login',
                name: 'Login',
                meta: { title: { cn: '', en: '' }, Authorize: 'AUTH_NONE' },
                component: () => import('@/views/middle/login.vue')
            },
            {
                path: '/middle/register',
                name: 'Register',
                meta: { title: { cn: '', en: '' }, Authorize: 'AUTH_NONE' },
                component: () => import('@/views/middle/register.vue')
            }
        ]
    },
    {
        path: '/',
        meta: { Authorize: 'AUTH' },
        component: () => import('@/layout/layout.vue'),
        children: [
            {
                path: '/',
                name: 'Home',
                meta: { Authorize: 'AUTH' },
                component: () => import('@/views/Home.vue')
            }
        ]
    }
]
