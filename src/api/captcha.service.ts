import { request } from '@/utils/utils-request'
import type { Result, IColumn, Notice } from '@/interface/static.resolver'
import type { ServiceCaptcha } from '@/interface/captcha.resolver'

/**创建验证应用**/
export function httpCreateCaptchaService(data: { name: string }) {
    return request<Notice>({
        url: `/api-basic/captcha/app/create`,
        method: 'POST',
        data
    })
}

/**编辑授权地址**/
export function httpUpdateCaptchaBucket(data: { appId: number; bucket: Array<string>; ip: Array<string> }) {
    return request<Notice>({
        url: `/api-basic/captcha/app/update/bucket`,
        method: 'POST',
        data
    })
}

/**验证应用列表**/
export function httpColumnCaptchaService(params: Pick<IColumn, 'page' | 'size'>) {
    return request<Result<ServiceCaptcha>>({
        url: `/api-basic/captcha/app/column`,
        method: 'GET',
        params
    })
}

/**验证应用信息**/
export function httpBasicCaptchaService(params: { appId: number }) {
    return request<ServiceCaptcha>({
        url: `/api-basic/captcha/app/basic`,
        method: 'GET',
        params
    })
}

/**修改应用名称**/
export function httpUpdateCaptchaNameService(data: { appId: number; name: string }) {
    return request<Notice>({
        url: `/api-basic/captcha/app/update/name`,
        method: 'PUT',
        data
    })
}
