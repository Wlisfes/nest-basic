import type { CommonResolver } from '@/interface/common.resolver'
import type { IUser } from '@/interface/user.resolver'

export interface ServiceMailer extends CommonResolver {
    appId: number
    name: string
    appSecret: string
    iv: string
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
    label: string
}

export interface UserBundleMailer extends CommonResolver {
    orderId: number
    userId: number
    bundle: number
    name: string
    type: string
    comment: string
    total: number
    expire: number
    label: string
    consume: number
    expense: number
    expireTime: string
    status: 'effect' | 'invalid' | 'refund' | 'disable'
}

export interface MailerTemplate extends CommonResolver {
    name: string
    cover: string
    mjml: string
    json: Record<string, any>
    user: IUser
    status: 'pending' | 'sketch' | 'loading' | 'review' | 'rejected' | 'disable' | 'delete'
}

export interface MailerSchedule extends CommonResolver {
    name: string
}
