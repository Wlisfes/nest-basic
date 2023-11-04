import { request } from '@/utils/utils-request'
import type { Result, IColumn } from '@/interface/static.resolver'
import type { ICustomer } from '@/interface/common.resolver'

/**登录**/
export function httpCommonCustomerAuthorize(data: { mobile: string; password: string; token: string; session: string }) {
    return request<{ token: string; refresh: string; expire: number; message: string }>({
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
