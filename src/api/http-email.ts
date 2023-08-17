import { request } from '@/utils/utils-request'
import type { Scheme, Result, IColumn } from '@/interface/http-interface'
export interface MailerApplication extends Scheme {
    name: string
    appKey: string
    appSecret: string
    bucket: Array<string>
    ip: Array<string>
}

/**邮件应用列表**/
export function httpColumnMailService(params: Pick<IColumn, 'page' | 'size'>) {
    return request<Result<MailerApplication>>({
        url: `/api-basic/mailer/app/column`,
        method: 'GET',
        params
    })
}
