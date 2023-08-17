import { createVNode, Fragment, type Component, type VNodeChild } from 'vue'
import { RouterLink } from 'vue-router'
import { sompute, type INameUI } from '@/utils/utils-remix'
export interface ClientOption {
    label: string
    key: string
    icon: INameUI
    size: number
}

export function createLoyout(component: Component, props: Record<string, unknown>) {
    return async function () {
        return createVNode(component, props)
    }
}

export function createElement(component: Component, props: Record<string, unknown> = {}, child: string | number | VNodeChild) {
    return function () {
        return createVNode(component, props, {
            default: function () {
                return child
            }
        })
    }
}

export function formatter(data: Array<ClientOption> = []) {
    return data.map(item => {
        return {
            key: item.key,
            label: createElement(RouterLink, { to: item.key }, <n-el style={{ fontSize: '18px', fontWeight: 500 }}>{item.label}</n-el>),
            icon: createElement(sompute(item.icon), { size: item.size })
        }
    })
}

export const Client = {
    captcha: [
        { label: '概述', key: '/captcha/describe', icon: 'Describe', size: 30 },
        { label: '应用服务', key: '/captcha/service', icon: 'Service', size: 28 },
        { label: '验证记录', key: '/captcha/recorder', icon: 'DataBase', size: 28 },
        { label: '验证统计', key: '/captcha/compute', icon: 'Compute', size: 30 }
    ],
    message: [
        { label: '概述', key: '/message/describe', icon: 'Describe', size: 30 },
        { label: '应用服务', key: '/message/service', icon: 'Service', size: 28 },
        { label: '任务队列', key: '/message/schedule', icon: 'Schedule', size: 30 },
        { label: '发送记录', key: '/message/recorder', icon: 'DataBase', size: 28 },
        { label: '发送统计', key: '/message/compute', icon: 'Compute', size: 30 }
    ],
    email: [
        { label: '概述', key: '/email/describe', icon: 'Describe', size: 30 },
        { label: '应用服务', key: '/email/service', icon: 'Service', size: 28 },
        { label: '任务队列', key: '/email/schedule', icon: 'Schedule', size: 30 },
        { label: '发送记录', key: '/email/recorder', icon: 'DataBase', size: 28 },
        { label: '发送统计', key: '/email/compute', icon: 'Compute', size: 30 }
    ]
}
