import { type RouteRecordRaw } from 'vue-router'
import { createLoyout, Client } from '@/utils/utils-layout'
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
                meta: { title: { cn: '', en: '' }, Authorize: 'AUTH_NONE', current: true },
                component: () => import('@/views/middle/login.vue')
            },
            {
                path: '/middle/register',
                name: 'Register',
                meta: { title: { cn: '', en: '' }, Authorize: 'AUTH_NONE', current: true },
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
                meta: { Authorize: 'AUTH', current: true },
                component: () => import('@/views/Home.vue')
            },
            {
                path: '/captcha',
                redirect: '/captcha/describe',
                name: 'CaptchaLoyout',
                meta: { Authorize: 'AUTH' },
                component: createLoyout(ClientLoyout, { client: Client.captcha }),
                children: [
                    {
                        path: '/captcha/describe',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', current: true },
                        component: () => import('@/views/captcha/Describe.vue')
                    },
                    {
                        path: '/captcha/service',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', current: true },
                        component: () => import('@/views/captcha/Service.vue')
                    },
                    {
                        path: '/captcha/recorder',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', current: true },
                        component: () => import('@/views/captcha/Recorder.vue')
                    },
                    {
                        path: '/captcha/compute',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', current: true },
                        component: () => import('@/views/captcha/Compute.vue')
                    }
                ]
            },
            {
                path: '/message',
                redirect: '/message/describe',
                name: 'MessageLoyout',
                meta: { Authorize: 'AUTH' },
                component: createLoyout(ClientLoyout, { client: Client.message }),
                children: [
                    {
                        path: '/message/describe',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', current: true },
                        component: () => import('@/views/message/Describe.vue')
                    },
                    {
                        path: '/message/service',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', current: true },
                        component: () => import('@/views/message/Service.vue')
                    },
                    {
                        path: '/message/schedule',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', current: true },
                        component: () => import('@/views/message/Schedule.vue')
                    },
                    {
                        path: '/message/recorder',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', current: true },
                        component: () => import('@/views/message/Recorder.vue')
                    },
                    {
                        path: '/message/compute',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', current: true },
                        component: () => import('@/views/message/Compute.vue')
                    }
                ]
            },
            {
                path: '/email',
                redirect: '/email/describe',
                name: 'EmailLoyout',
                meta: { Authorize: 'AUTH' },
                component: createLoyout(ClientLoyout, { client: Client.email }),
                children: [
                    {
                        path: '/email/describe',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', current: true },
                        component: () => import('@/views/email/Describe.vue')
                    },
                    {
                        path: '/email/service',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', current: true },
                        component: () => import('@/views/email/Service.vue')
                    },
                    {
                        path: '/email/schedule',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', current: true },
                        component: () => import('@/views/email/Schedule.vue')
                    },
                    {
                        path: '/email/recorder',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', current: true },
                        component: () => import('@/views/email/Recorder.vue')
                    },
                    {
                        path: '/email/compute',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', current: true },
                        component: () => import('@/views/email/Compute.vue')
                    }
                ]
            }
        ]
    }
]
