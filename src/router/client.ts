import type { RouteRecordRaw } from 'vue-router'
import BasicLoyout from '@/layout/basic-layout.vue'
import ClientLoyout from '@/layout/client-layout.vue'

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
        component: BasicLoyout,
        children: [
            {
                path: '/',
                name: 'Home',
                meta: { Authorize: 'AUTH' },
                component: () => import('@/views/Home.vue')
            },
            {
                path: '/captcha',
                redirect: '/captcha/service',
                name: 'CaptchaLoyout',
                meta: { Authorize: 'AUTH' },
                component: ClientLoyout,
                children: [
                    {
                        path: '/captcha/service',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH' },
                        component: () => import('@/views/captcha/Service.vue')
                    }
                ]
            },
            {
                path: '/message',
                redirect: '/message/service',
                name: 'MessageLoyout',
                meta: { Authorize: 'AUTH' },
                component: ClientLoyout,
                children: [
                    {
                        path: '/message/service',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH' },
                        component: () => import('@/views/captcha/Service.vue')
                    }
                ]
            },
            {
                path: '/email',
                redirect: '/email/service',
                name: 'EmailLoyout',
                meta: { Authorize: 'AUTH' },
                component: ClientLoyout,
                children: [
                    {
                        path: '/email/service',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH' },
                        component: () => import('@/views/captcha/Service.vue')
                    }
                ]
            }
        ]
    }
]
