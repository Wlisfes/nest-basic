import type { App } from 'vue'
import { createRouter, createWebHistory, type Router } from 'vue-router'
import { client } from '@/router/client'
import { useUser } from '@/store/user'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: client
})

/**路由守卫**/
export function setupGuardRouter(router: Router) {
    const user = useUser()
    router.beforeEach(async (to, form, next) => {
        window.$loading.start()
        const token = window.$cookie.getStore(window.$cookie.APP_AUTH_TOKEN)
        if (token) {
            if (!user.uid) {
                try {
                    await user.fetchBasicUser()
                } catch (e) {
                    await window.$cookie.delStore(window.$cookie.APP_AUTH_TOKEN)
                    await window.$cookie.delStore(window.$cookie.APP_AUTH_REFRESH)
                    await window.$cookie.delStore(window.$cookie.APP_AUTH_EXPIRE)
                    return next({ path: '/middle/login', replace: true })
                }
            }
            switch (to.meta.Authorize) {
                case 'AUTH_NONE': //已登录进入AUTH_NONE界面、不允许进入
                    return next({ path: '/', replace: true })
                case 'NONE':
                case 'AUTH': //已登录进入NONE、AUTH界面、允许进入
                    return next()
                default:
                    return next()
            }
        } else {
            switch (to.meta.Authorize) {
                case 'AUTH': //未登录进入AUTH界面、重定向到登录页
                    return window.$cookie.setStore(window.$cookie.APP_AUTH_RELACE, to.fullPath).finally(() => {
                        return next({ path: '/middle/login', replace: true })
                    })
                case 'AUTH_NONE':
                case 'NONE': //未登录进入NONE、AUTH_NONE界面、允许进入
                    return next()
                default:
                    return next()
            }
        }
    })

    router.afterEach((to, form) => {
        window.$loading.finish()
    })
}

export function setupRouter(app: App<Element>) {
    app.use(router)
    setupGuardRouter(router)
}

export default router
