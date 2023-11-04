import type { IResolver } from '@/interface/static.resolver'
import type { ICustomer } from '@/interface/common.resolver'

export interface NodemailerAppwr extends IResolver {
    appId: number
    name: string
    appSecret: string
    comment: string
    bucket: Array<string>
    ip: Array<string>
    customer: ICustomer
    host: string
    port: number
    secure: boolean
    username: string
    password: string
    type: string
    status: 'inactivated' | 'activated' | 'disable' | 'delete'
}
