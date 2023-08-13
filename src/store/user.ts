import { defineStore } from 'pinia'
import { httpBasicUser, type IUser } from '@/api/http-user'
export interface RUser {
    uid: number
    nickname: string
    avatar: string
    email: string
    mobile: string
    status: string
}

export const useUser = defineStore({
    id: 'user',
    state: (): RUser => {
        return Object.assign({
            uid: undefined,
            nickname: undefined,
            avatar: undefined,
            email: undefined,
            mobile: undefined,
            status: undefined
        })
    },
    actions: {
        async fetchBasicUser() {
            return await httpBasicUser().then(({ data }) => {
                this.uid = data.uid
                this.nickname = data.nickname
                this.avatar = data.avatar
                this.email = data.email
                this.mobile = data.mobile
                this.status = data.status
                return data
            })
        }
    }
})
