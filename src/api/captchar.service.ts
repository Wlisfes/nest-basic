import { request } from '@/utils/utils-request'
import type { Result, IColumn, Notice } from '@/interface/common.resolver'

/**生成校验凭证**/
export function httpCaptcharAuthorizeReducer(data: { appId: string }) {
    return request<{ token: string; session: string }>({
        url: `/captchar/browser/authorize`,
        method: 'POST',
        data
    })
}
