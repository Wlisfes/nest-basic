import { request } from '@/utils/utils-request'
import type { Result, IColumn, Notice } from '@/interface/static.resolver'
import type { CaptcharAppwr } from '@/interface/captchar.resolver'

/**生成校验凭证**/
export function httpCaptcharAuthorizeReducer(data: { appId: string }) {
    return request<{ token: string; session: string }>({
        url: `/captchar/browser/authorize`,
        method: 'POST',
        data
    })
}

/**验证应用列表**/
export function httpCaptcharColumnAppwr(params: Partial<Pick<IColumn, 'page' | 'size'>> = {}) {
    return request<Result<CaptcharAppwr>>({
        url: `/captchar/appwr/column`,
        method: 'GET',
        params
    })
}

/**验证应用列表**/
export function httpCaptcharUpdateAppwr(params: { appId: string; name: string }) {
    return request<Notice>({
        url: `/captchar/appwr/update`,
        method: 'POST',
        data: params
    })
}

/**重置密钥**/
export function httpCaptcharResetSecretAppwr(data: { appId: string }) {
    return request<Notice>({
        url: `/captchar/appwr/reset/secret`,
        method: 'POST',
        data
    })
}
