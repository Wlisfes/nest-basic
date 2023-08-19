import { request } from '@/utils/utils-request'
import type { Scheme, Result, IColumn } from '@/interface/http-interface'
import type { IUser } from '@/api/http-user'
export interface MailerApplication extends Scheme {
    uid: number
    name: string
    appKey: string
    appSecret: string
    bucket: Array<string>
    ip: Array<string>
    user: IUser
}

/**邮件应用列表**/
export function httpColumnMailService(params: Pick<IColumn, 'page' | 'size'>) {
    return request<Result<MailerApplication>>({
        url: `/api-basic/mailer/app/column`,
        method: 'GET',
        params
    })
}
