import { createVNode, type Component, type VNodeChild } from 'vue'
import { RouterLink } from 'vue-router'
import { sompute, type INameUI } from '@/utils/utils-remix'
export interface ClientOption {
    label: string
    key: string
    icon: INameUI
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
            label: createElement(
                RouterLink,
                { to: item.key },
                <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--n-item-icon-color)', fontWeight: 500 }}>{item.label}</h3>
            ),
            icon: createElement(sompute(item.icon), { size: 28 })
        }
    })
}

export const Client = {
    captcha: [
        { label: '概述', key: '/captcha/document', icon: 'Document' },
        { label: '应用服务', key: '/captcha/service', icon: 'Service' }
    ]
}
