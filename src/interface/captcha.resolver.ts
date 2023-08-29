import type { CommonResolver } from '@/interface/common.resolver'
import type { IUser } from '@/interface/user.resolver'

export interface ServiceCaptcha extends CommonResolver {
    appId: number
    name: string
    appKey: string
    appSecret: string
    bucket: Array<string>
    ip: Array<string>
    user: IUser
    status: 'inactivated' | 'activated' | 'disable' | 'delete'
}
