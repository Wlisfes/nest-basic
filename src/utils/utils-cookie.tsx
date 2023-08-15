import { isEmpty } from 'class-validator'

interface INode<T = any> {
    value: T
    expire: number
}

export class CookieStorage {
    private instance: Storage = window.localStorage
    public APP_AUTH_TOKEN: string = 'APP_AUTH_TOKEN' //token
    public APP_AUTH_REFRESH: string = 'APP_AUTH_REFRESH' //刷新token
    public APP_AUTH_EXPIRE: string = 'APP_AUTH_EXPIRE' //token有效时间
    public APP_AUTH_LOCALE: string = 'APP_AUTH_LOCALE' //语言
    public APP_AUTH_RELACE: string = 'APP_AUTH_RELACE' //未登录前的重定向地址

    /**存入**/
    public async setStore(key: string, value: any, expire?: number): Promise<void> {
        const node: INode = {
            value,
            expire: expire ? Date.now() + expire : 0
        }
        return this.instance.setItem(key, JSON.stringify(node))
    }

    /**异步读取**/
    public async readStore<T>(key: string, value?: T): Promise<T> {
        return await this.getStore(key, value)
    }

    /**同步获取**/
    public getStore<T>(key: string, value?: T): T {
        const nodeStr = this.instance.getItem(key)
        const node: INode<T> = JSON.parse(nodeStr ?? '{}')
        if (!isEmpty(node.value) && (isEmpty(node.expire) || node.expire === 0 || node.expire > Date.now())) {
            return node.value
        }
        return value as T
    }

    /**删除**/
    public async delStore(key: string): Promise<void> {
        return this.instance.removeItem(key)
    }

    /**清空**/
    public async allClear(): Promise<void> {
        return this.instance.clear()
    }
}

export const cookie = new CookieStorage()
window.$cookie = cookie
