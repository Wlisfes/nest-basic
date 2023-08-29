import type { CommonResolver } from '@/interface/common.resolver'
import type { IUser } from '@/interface/user.resolver'

export interface ServiceCaptcha extends CommonResolver {
    appId: number
    name: string
    appSecret: string
    comment: string
    bucket: Array<string>
    ip: Array<string>
    user: IUser
    visible: 'hide' | 'show'
    status: 'activated' | 'disable' | 'delete'
}
