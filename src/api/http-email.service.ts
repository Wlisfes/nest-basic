import { request } from '@/utils/utils-request'
import type { Scheme, Result, IColumn, Notice } from '@/interface/http-interface'
import type { IUser } from '@/api/http-user'
export interface MailerApplication extends Scheme {
    appId: number
    name: string
    appKey: string
    appSecret: string
    bucket: Array<string>
    ip: Array<string>
    user: IUser
}

export interface MailerPackage extends Scheme {
    bundle: number
    name: string
    type: string
    comment: string
    expire: number
    total: number
    stock: number
    surplus: number
    max: number
    price: number
    discount: number
    label: number
}

/**创建邮件应用**/
export function httpCreateMailerService(data: { name: string }) {
    return request<Notice>({
        url: `/api-basic/mailer/app/create`,
        method: 'POST',
        data
    })
}

/**邮件应用列表**/
export function httpColumnMailerService(params: Pick<IColumn, 'page' | 'size'>) {
    return request<Result<MailerApplication>>({
        url: `/api-basic/mailer/app/column`,
        method: 'GET',
        params
    })
}

/**修改应用名称**/
export function httpUpdateMailerNameService(data: { appId: number; name: string }) {
    return request<Notice>({
        url: `/api-basic/mailer/app/update/name`,
        method: 'PUT',
        data
    })
}

/**邮件套餐包列表**/
export function httpColumnMailerPackage(params: {}) {
    return request<Result<MailerPackage>>({
        url: `/api-basic/package/mailer/column`,
        method: 'GET',
        params
    })
}
