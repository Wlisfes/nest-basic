import { request } from '@/utils/utils-request'
import type { Result, IColumn, Notice } from '@/interface/static.resolver'
import type { ICustomer } from '@/interface/common.resolver'

/**注册**/
export function httpCommonCustomerRegister(data: { nickname: string; password: string; mobile: string; code: string }) {
    return request<Notice>({
        url: `/common/customer/register`,
        method: 'POST',
        data
    })
}

/**登录**/
export function httpCommonCustomerAuthorize(data: { mobile: string; password: string; token: string; session: string }) {
    return request<Notice & { token: string; session: string; expire: number }>({
        url: `/common/customer/authorize`,
        method: 'POST',
        data
    })
}

/**获取用户信息**/
export function httpCommonCustomerResolver() {
    return request<ICustomer>({
        url: `/common/customer/resolver`,
        method: 'GET'
    })
}
