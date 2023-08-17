import { defineStore } from 'pinia'

export interface IState {
    theme: string
    primaryColor: string
    collapse: boolean
    device: 'PC' | 'IPAD' | 'Mobile'
    current: string
}

export const useCommon = defineStore({
    id: 'common',
    state: (): IState => ({
        theme: window.$cookie.getStore(window.$cookie.APP_AUTH_theme, 'light'),
        primaryColor: window.$cookie.getStore(window.$cookie.APP_AUTH_primaryColor, '#18a058'),
        collapse: false,
        device: 'PC',
        current: '/'
    }),
    actions: {
        async setTheme(theme: string) {
            await window.$cookie.setStore(window.$cookie.APP_AUTH_theme, theme)
            return (this.theme = theme)
        },
        async setPrimaryColor(primaryColor: string) {
            await window.$cookie.setStore(window.$cookie.APP_AUTH_primaryColor, primaryColor)
            return (this.primaryColor = primaryColor)
        },
        async setCollapse(collapse: boolean) {
            return (this.collapse = collapse)
        },
        async setDevice(device: 'PC' | 'IPAD' | 'Mobile') {
            return (this.device = device)
        },
        async setCurrent(current: string) {
            return (this.current = current)
        }
    }
})
