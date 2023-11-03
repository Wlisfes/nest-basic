import type { CommonResolver } from '@/interface/common.resolver'
import type { ICustomer } from '@/interface/customer.resolver'

export interface CaptcharAppwr extends CommonResolver {
    appId: number
    name: string
    appSecret: string
    comment: string
    iv: string
    bucket: Array<string>
    ip: Array<string>
    customer: ICustomer
    visible: 'hide' | 'show'
    status: 'activated' | 'disable' | 'delete'
}
