import type { IResolver } from '@/interface/static.resolver'
import type { ICustomer } from '@/interface/customer.resolver'

export interface CaptcharAppwr extends IResolver {
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
