import { defineStore } from 'pinia'
import { httpBasicUser, type IUser } from '@/api/http-user'

export const useUser = defineStore({
    id: 'user',
    state: (): IUser => {
        return Object.assign({
            uid: undefined,
            nickname: undefined,
            avatar: undefined,
            email: undefined,
            mobile: undefined,
            status: undefined,
            appKey: undefined,
            appSecret: undefined,
            authorize: 'initialize',
            credit: 0,
            balance: 0
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
                this.appKey = data.appKey
                this.appSecret = data.appSecret
                this.authorize = data.authorize
                this.credit = data.credit
                this.balance = data.balance
                return data
            })
        }
    }
})
