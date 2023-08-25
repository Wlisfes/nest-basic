import { request } from '@/utils/utils-request'
import type { Result, IColumn, Notice } from '@/interface/common.resolver'
import type { ServiceMailer, BundleMailer } from '@/interface/mailer.resolver'

/**创建邮件应用**/
export function httpCreateServiceMailer(data: { name: string }) {
    return request<Notice>({
        url: `/api-basic/mailer/app/create`,
        method: 'POST',
        data
    })
}

/**邮件应用列表**/
export function httpColumnMailerService(params: Pick<IColumn, 'page' | 'size'>) {
    return request<Result<ServiceMailer>>({
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
export function httpColumnBundleMailer(params: {}) {
    return request<Result<BundleMailer>>({
        url: `/api-basic/package/mailer/column`,
        method: 'GET',
        params
    })
}

/**统计当前用户套餐包余量**/
export function httpUserComputeMailer() {
    return request<{ total: number; current: number; prevent: number }>({
        url: `/api-basic/package/mailer/compute`,
        method: 'GET'
    })
}
