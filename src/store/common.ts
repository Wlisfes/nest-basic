import { defineStore } from 'pinia'

export interface IState {
    theme: string
    primaryColor: string
}

export const useCommon = defineStore({
    id: 'common',
    state: (): IState => ({
        theme: window.$cookie.getStore(window.$cookie.APP_AUTH_theme, 'light'),
        primaryColor: window.$cookie.getStore(window.$cookie.APP_AUTH_primaryColor, '#536dfe')
    }),
    actions: {
        async setTheme(theme: string) {
            await window.$cookie.setStore(window.$cookie.APP_AUTH_theme, theme)
            return (this.theme = theme)
        },
        async setPrimaryColor(primaryColor: string) {
            await window.$cookie.setStore(window.$cookie.APP_AUTH_primaryColor, primaryColor)
            return (this.primaryColor = primaryColor)
        }
    }
})
