import type { CommonResolver } from '@/interface/common.resolver'

export interface OSSAuthorize {
    accessKeyId: string
    accessKeySecret: string
    endpoint: string
    bucket: string
    region: string
    token: string
    expire: string
    interval: number
}

export interface ExcelResolver extends CommonResolver {}
