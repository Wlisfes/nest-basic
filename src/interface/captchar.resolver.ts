import type { IResolver } from '@/interface/static.resolver'
import type { ICustomer } from '@/interface/common.resolver'

export interface CaptcharAppwr extends IResolver {
    appId: string
    name: string
    appSecret: string
    comment: string
    iv: string
    bucket: Array<string>
    ip: Array<string>
    customer: ICustomer
    visible: boolean
    status: 'activated' | 'disable' | 'delete'
}
