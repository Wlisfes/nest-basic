import { request } from '@/utils/utils-request'
import type { Result, IColumn, Notice } from '@/interface/common.resolver'
import type { ServiceMailer, BundleMailer, UserBundleMailer, MailerTemplate } from '@/interface/mailer.resolver'

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
export function httpColumnBundleMailer() {
    return request<Result<BundleMailer>>({
        url: `/api-basic/package/mailer/column`,
        method: 'GET'
    })
}

/**统计当前用户套餐包余量**/
export function httpUserComputeMailer() {
    return request<{ total: number; current: number; prevent: number }>({
        url: `/api-basic/package/mailer/compute`,
        method: 'GET'
    })
}

/**用户已购套餐列表**/
export function httpColumnUserMailer(params: { page: number; size: number }) {
    return request<Result<UserBundleMailer>>({
        url: `/api-basic/package/mailer/user/column`,
        method: 'GET',
        params
    })
}

/**创建邮件模板**/
export function httpCreateMailerTemplate(data: { name: string; mjml: string; json: Record<string, any> }) {
    return request<Notice>({
        url: `/api-basic/mailer/template/create`,
        method: 'POST',
        data
    })
}

/**邮件模板列表**/
export function httpColumnMailerTemplate(params: { page: number; size: number }) {
    return request<Result<MailerTemplate>>({
        url: `/api-basic/mailer/template/column`,
        method: 'GET',
        params
    })
}

/**邮件模板信息**/
export function httpBasicMailerTemplate(params: { id: number }) {
    return request<MailerTemplate>({
        url: `/api-basic/mailer/template/basic`,
        method: 'GET',
        params
    })
}
