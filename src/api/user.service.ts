import { request } from '@/utils/utils-request'
import type { Result, IColumn } from '@/interface/static.resolver'
import type { IUser } from '@/interface/user.resolver'

/**注册**/
export function httpRegister(data: { nickname: string; password: string; mobile: string; code: string }) {
    return request<IUser>({
        url: `/api-basic/user/register`,
        method: 'POST',
        data
    })
}

/**登录**/
export function httpAuthorize(data: { mobile: string; password: string; token: string; session: string }) {
    return request<{ token: string; refresh: string; expire: number; message: string }>({
        url: `/api-basic/user/authorize`,
        method: 'POST',
        data
    })
}

/**用户信息**/
export function httpBasicUser() {
    return request<IUser>({
        url: `/api-basic/user/basic-authorize`,
        method: 'GET'
    })
}

/**用户权限信息**/
export function httpBearerAuthorize(params: { uid: number }) {
    return request<IUser>({
        url: `/api-basic/user/bearer-authorize`,
        method: 'GET',
        params
    })
}

/**用户列表**/
export function httpColumnUser(params: Pick<IColumn, 'page' | 'size'>) {
    return request<Result<IUser>>({
        url: `/api-basic/user/column`,
        method: 'GET',
        params
    })
}

/**编辑用户权限**/
export function httpUpdateAuthorize(data: { uid: number; route: Array<number> }) {
    return request<{ message: string }>({
        url: `/api-basic/user/update/authorize`,
        method: 'PUT',
        data
    })
}
