import { Fragment, h, type Component } from 'vue'
import dayjs from 'dayjs'

export function prevent(e: Event, handler?: Function) {
    e.preventDefault()
    return handler?.()
}

export function stop(e: Event, handler?: Function) {
    e.preventDefault()
    e.stopPropagation()
    return handler?.()
}

export function moment(date?: dayjs.ConfigType) {
    return dayjs(date)
}

/**文件导入函数**/
export function loadFile(path: string) {
    return new URL(`../assets/${path}`, import.meta.url).href
}

/**延时方法**/
export function divineDelay(delay = 100, handler?: Function) {
    return new Promise(resolve => {
        const timeout = setTimeout(() => {
            handler?.()
            resolve(undefined)
            clearTimeout(timeout)
        }, delay)
    })
}

export function divineSkeleton(length: number, component: Component) {
    return <Fragment>{Array.from({ length }, (item, key) => h(component, { key }))}</Fragment>
}

/**单位转换**/
export function divineTransfer(value: number, option: { reverse: boolean; scale?: number } = { reverse: true, scale: 2 }) {
    if (option.reverse) {
        const scale = Number('1'.padEnd((option.scale ?? 2) + 1, '0'))
        return (Math.floor((value / 1000) * scale) / scale).toFixed(option.scale)
    } else {
        return (value * 1000).toFixed(0)
    }
}

/**枚举文本转换**/
export function divineColumn<T extends Record<string, unknown>>(
    data: Array<T> = [],
    value: unknown,
    option: { key: string; defaultValue?: unknown } = { key: 'label', defaultValue: '--' }
) {
    const node = data.find(item => item.value == value)
    if (node) {
        return node[option.key] ?? option.defaultValue
    }
    return option.defaultValue
}

/**条件函数执行**/
export async function divineHandler<T>(value: boolean | Function, handler: Function): Promise<T | void> {
    const isSupported = typeof value === 'function'
    if ((isSupported && (await value())) || (!isSupported && value)) {
        return await handler()
    }
    return undefined
}

/**参数组合函数**/
export async function divineParameter<T>(data: T) {
    return Object.assign(data as Object)
}

/**批量执行异步函数**/
export function divineAsyncBatch(dataColumn: Array<Function> = []) {
    return Promise.all(dataColumn.map(handler => handler()))
}

/**指令筛选**/
export function divineAndSelecter(dataCommand: Array<{ key: string; visible: boolean }> = []) {
    return dataCommand.filter(x => x.visible).map(x => x.key)
}

/**响应式断点计算**/ //prettier-ignore
export function divineCols(data: Record<number, number> = {}, width: number, defaultCols: number) {
    const cols = Object.keys(data).map(Number).sort((a, b) => a - b).find(value => width < value)
    return cols && data ? data[cols] : defaultCols
}

/**响应式节点计算**/
export function divineColsNode(data: Record<number, number> = {}, cols: number, defaultCols: number) {
    return data[cols] ?? defaultCols
}
