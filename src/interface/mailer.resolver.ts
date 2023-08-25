import type { CommonResolver } from '@/interface/common.resolver'
import type { IUser } from '@/interface/user.resolver'

export interface ServiceMailer extends CommonResolver {
    appId: number
    name: string
    appKey: string
    appSecret: string
    bucket: Array<string>
    ip: Array<string>
    user: IUser
    status: 'inactivated' | 'activated' | 'disable' | 'delete'
}

export interface BundleMailer extends CommonResolver {
    bundle: number
    name: string
    type: string
    comment: string
    expire: number
    total: number
    stock: number
    surplus: number
    max: number
    price: number
    discount: number
    label: number
}
