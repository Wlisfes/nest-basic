import { defineStore } from 'pinia'
import { httpCommonCustomerResolver } from '@/api/instance.service'
import type { ICustomer } from '@/interface/common.resolver'

export const useCustomer = defineStore({
    id: 'customer',
    state: () => ({
        uid: '',
        nickname: '',
        avatar: '',
        email: '',
        mobile: '',
        status: 'enable',
        appId: '',
        apiKey: '',
        apiSecret: '',
        authorize: 'initialize',
        credit: 0,
        balance: 0
    }),
    actions: {
        /**获取用户信息**/
        async fetchResolverCustomer() {
            return await httpCommonCustomerResolver().then(({ data }) => {
                this.uid = data.uid
                this.nickname = data.nickname
                this.avatar = data.avatar
                this.email = data.email
                this.mobile = data.mobile
                this.status = data.status
                this.appId = data.appId
                this.apiKey = data.apiKey
                this.apiSecret = data.apiSecret
                this.authorize = data.authorize
                this.credit = data.credit
                this.balance = data.balance
                return data
            })
        }
    }
})
