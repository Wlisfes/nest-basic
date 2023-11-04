import { request } from '@/utils/utils-request'
import type { Result, IColumn, Notice } from '@/interface/static.resolver'
import type { OSSAuthorize, ExcelResolver } from '@/interface/aliyun.resolver'

/**创建OSS-STS临时鉴权**/
export function httpCreateOSSAuthorize() {
    return request<OSSAuthorize>({
        url: `/api-basic/aliyun-oss/create/authorize`,
        method: 'POST'
    })
}

/**上传excel文件解析**/
export function httpUploadExcelResolver(data: FormData, opt: Partial<{ onUploadProgress: Function }> = {}) {
    return request<ExcelResolver>({
        url: `/api-basic/aliyun-oss/resolve/excel`,
        method: 'POST',
        data,
        onUploadProgress: progress => opt.onUploadProgress?.(progress)
    })
}
