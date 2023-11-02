import type { CommonResolver } from '@/interface/common.resolver'

export interface ICustomer extends CommonResolver {
    uid: string
    nickname: string
    password: string
    mobile: string
    email: string
    avatar: string
    openid: string
    appId: string
    appSecret: string
    authorize: string
    credit: number
    balance: number
    status: string //'delete' | 'disable' | 'enable'
}
