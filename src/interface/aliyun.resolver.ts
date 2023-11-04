import type { IResolver } from '@/interface/static.resolver'

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

export interface ExcelResolver extends IResolver {
    fileId: string
    fileName: string
    fieldName: string
    fileURL: string
    folder: string
    suffix: string
    list: Array<Record<string, any>>
    total: number
}
