import type { IResolver } from '@/interface/static.resolver'
import type { IUser } from '@/interface/user.resolver'

export interface ServiceMailer extends IResolver {
    appId: number
    name: string
    appSecret: string
    iv: string
    bucket: Array<string>
    ip: Array<string>
    user: IUser
    status: 'inactivated' | 'activated' | 'disable' | 'delete'
}

export interface BundleMailer extends IResolver {
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

export interface UserBundleMailer extends IResolver {
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

export interface MailerTemplate extends IResolver {
    name: string
    cover: string
    mjml: string
    json: string
    user: IUser
    status: 'pending' | 'sketch' | 'loading' | 'review' | 'rejected' | 'disable' | 'delete'
}

export interface MailerSchedule extends IResolver {
    jobId: number
    name: string
    type: string
    super: string
    accept: string
    total: number
    submit: number
    success: number
    failure: number
    progress: number
    sendTime: string
    status: string
    reason: string
    sample: MailerTemplate
    app: ServiceMailer
    user: IUser
}
