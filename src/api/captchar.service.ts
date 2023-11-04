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
