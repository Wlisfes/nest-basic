import { type RouteRecordRaw } from 'vue-router'
import { createLoyout, Client } from '@/utils/utils-layout'
import BasicLoyout from '@/layout/basic-layout.vue'
import ClientLoyout from '@/layout/client-layout.vue'

/**
 * meta
 * meta.Authorize: AUTH-需要登录、AUTH_NONE-无需登录
 * meta.Header: HIDE-隐藏头部
 * meta.Sidebar: HIDE-隐藏侧边栏
 * meta.Current: SAVE-存储当前地址
 */
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
                meta: { title: { cn: '', en: '' }, Authorize: 'AUTH_NONE', Current: 'SAVE' },
                component: () => import('@/views/middle/login.vue')
            },
            {
                path: '/middle/register',
                name: 'Register',
                meta: { title: { cn: '', en: '' }, Authorize: 'AUTH_NONE', Current: 'SAVE' },
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
                meta: { Authorize: 'AUTH', Current: 'SAVE' },
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
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', Current: 'SAVE' },
                        component: () => import('@/views/captcha/Describe.vue')
                    },
                    {
                        path: '/captcha/service',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', Current: 'SAVE' },
                        component: () => import('@/views/captcha/Service.vue')
                    },
                    {
                        path: '/captcha/recorder',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', Current: 'SAVE' },
                        component: () => import('@/views/captcha/Recorder.vue')
                    },
                    {
                        path: '/captcha/compute',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', Current: 'SAVE' },
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
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', Current: 'SAVE' },
                        component: () => import('@/views/message/Describe.vue')
                    },
                    {
                        path: '/message/service',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', Current: 'SAVE' },
                        component: () => import('@/views/message/Service.vue')
                    },
                    {
                        path: '/message/schedule',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', Current: 'SAVE' },
                        component: () => import('@/views/message/Schedule.vue')
                    },
                    {
                        path: '/message/recorder',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', Current: 'SAVE' },
                        component: () => import('@/views/message/Recorder.vue')
                    },
                    {
                        path: '/message/compute',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', Current: 'SAVE' },
                        component: () => import('@/views/message/Compute.vue')
                    }
                ]
            },
            {
                path: '/mailer',
                redirect: '/mailer/describe',
                name: 'MailerLoyout',
                meta: { Authorize: 'AUTH' },
                component: createLoyout(ClientLoyout, { client: Client.mailer }),
                children: [
                    {
                        path: '/mailer/describe',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', Current: 'SAVE' },
                        component: () => import('@/views/mailer/Describe.vue')
                    },
                    {
                        path: '/mailer/package',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', Current: 'SAVE' },
                        component: () => import('@/views/mailer/Package.vue')
                    },
                    {
                        path: '/mailer/service',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', Current: 'SAVE' },
                        component: () => import('@/views/mailer/Service.vue')
                    },
                    {
                        path: '/mailer/template',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', Current: 'SAVE' },
                        component: () => import('@/views/mailer/Template.vue')
                    },
                    {
                        path: '/mailer/currenter',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', Current: 'SAVE', Header: 'HIDE', Sidebar: 'HIDE' },
                        component: () => import('@/views/mailer/Currenter.vue')
                    },
                    {
                        path: '/mailer/schedule',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', Current: 'SAVE' },
                        component: () => import('@/views/mailer/Schedule.vue')
                    },
                    {
                        path: '/mailer/recorder',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', Current: 'SAVE' },
                        component: () => import('@/views/mailer/Recorder.vue')
                    },
                    {
                        path: '/mailer/compute',
                        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH', Current: 'SAVE' },
                        component: () => import('@/views/mailer/Compute.vue')
                    }
                ]
            }
        ]
    }
]
