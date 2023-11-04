import type { IResolver } from '@/interface/static.resolver'
import type { IUser } from '@/interface/user.resolver'

export interface ServiceCaptcha extends IResolver {
    appId: number
    name: string
    appSecret: string
    comment: string
    iv: string
    bucket: Array<string>
    ip: Array<string>
    user: IUser
    visible: 'hide' | 'show'
    status: 'activated' | 'disable' | 'delete'
}
