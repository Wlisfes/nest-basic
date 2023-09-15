import { request } from '@/utils/utils-request'
import type { Result, IColumn, Notice } from '@/interface/common.resolver'
import type { OSSAuthorize } from '@/interface/aliyun.resolver'

/**创建OSS-STS临时鉴权**/
export function httpCreateOSSAuthorize() {
    return request<OSSAuthorize>({
        url: `/api-basic/aliyun-oss/create/authorize`,
        method: 'POST'
    })
}
