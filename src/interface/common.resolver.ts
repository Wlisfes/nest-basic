import type { IResolver } from '@/interface/static.resolver'

export interface ICustomer extends IResolver {
    uid: string
    nickname: string
    password: string
    mobile: string
    email: string
    avatar: string
    openid: string
    appId: string
    apiKey: string
    apiSecret: string
    authorize: string
    credit: number
    balance: number
    status: string //'delete' | 'disable' | 'enable'
}
