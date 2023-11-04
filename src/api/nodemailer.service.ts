import { request } from '@/utils/utils-request'
import type { Result, IColumn, Notice } from '@/interface/static.resolver'
import type { NodemailerAppwr } from '@/interface/nodemailer.resolver'

/**邮件应用列表**/
export function httpNodemailerColumnAppwr(params: Partial<Pick<IColumn, 'page' | 'size'>> = {}) {
    return request<Result<NodemailerAppwr>>({
        url: `/nodemailer/appwr/column`,
        method: 'GET',
        params
    })
}
