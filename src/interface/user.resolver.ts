import type { IResolver } from '@/interface/static.resolver'

export interface IUser extends IResolver {
    uid: number
    nickname: string
    password: string
    mobile: string
    email: string
    avatar: string
    openid: string
    appId: number
    appSecret: string
    authorize: string
    credit: number
    balance: number
    status: 'delete' | 'disable' | 'enable'
}
