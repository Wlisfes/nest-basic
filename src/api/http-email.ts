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

/**创建邮件应用**/
export function httpCreateMailService(data: { name: string }) {
    return request<Notice>({
        url: `/api-basic/mailer/app/create`,
        method: 'POST',
        data
    })
}

/**邮件应用列表**/
export function httpColumnMailService(params: Pick<IColumn, 'page' | 'size'>) {
    return request<Result<MailerApplication>>({
        url: `/api-basic/mailer/app/column`,
        method: 'GET',
        params
    })
}

/**修改应用名称**/
export function httpUpdateMailNameService(data: { appId: number; name: string }) {
    return request<Notice>({
        url: `/api-basic/mailer/app/update/name`,
        method: 'PUT',
        data
    })
}
