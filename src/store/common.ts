import { defineStore } from 'pinia'

export interface IState {
    theme: string
    primaryColor: string
}

export const useCommon = defineStore({
    id: 'common',
    state: (): IState => ({
        theme: 'light',
        primaryColor: '#536dfe'
    }),
    actions: {
        async setTheme(theme: string) {
            return (this.theme = theme)
        },
        async setPrimaryColor(primaryColor: string) {
            return (this.primaryColor = primaryColor)
        }
    }
})
