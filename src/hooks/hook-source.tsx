import { toRefs, nextTick, watch, computed } from 'vue'
import { isEmpty } from 'class-validator'
import { divineHandler, createMounte } from '@/utils/utils-common'
import { useState } from '@/hooks/hook-state'
import type { DataTableBaseColumn } from 'naive-ui'
import type { Result } from '@/interface/common.resolver'
import type { Response } from '@/utils/utils-request'

interface SourceOption<T, R, S, U> {
    page?: number
    size?: number
    total?: number
    loading?: boolean
    form: R
    immediate?: boolean
    initialize?: boolean
    dataSource?: Array<T>
    data?: S
    dataColumn?: Array<U>
}

/**列表Hooks**/
export function useSource<T extends Object, R extends Object, S extends Object, U extends DataTableBaseColumn>(
    option: SourceOption<T, R, S, U>,
    request: (e: Required<SourceOption<T, R, S, U>>) => Promise<Response<Result<T>>>
) {
    const { state, setState } = useState<Required<typeof option>>({
        immediate: option.immediate ?? false,
        form: option.form,
        page: option.page ?? 1,
        size: option.size ?? 10,
        total: option.total ?? 0,
        loading: option.loading ?? true,
        dataSource: option.dataSource ?? [],
        data: (option.data ?? {}) as S,
        initialize: true,
        dataColumn: option.dataColumn ?? []
    })

    createMounte(async () => {
        await divineHandler(state.immediate, async () => {
            await fetchColumn()
        })
    })

    /**初始化列表接口**/
    function fetchColumn(handler?: Function): Promise<typeof state> {
        return new Promise(resolve => {
            return setState({ loading: true } as Partial<typeof option>).then(async () => {
                try {
                    const { data } = await request(state as Required<typeof option>)
                    await setState({ dataSource: data.list, total: data.total })
                } catch (e) {
                    await setState({ dataSource: [], total: 0 })
                } finally {
                    nextTick(async () => {
                        await setState({ loading: false, initialize: false })
                        handler?.(state)
                        resolve(state)
                    })
                }
            })
        })
    }

    /**列表更新**/
    function fetchUpdate(
        parameter: Partial<Omit<SourceOption<T, R, S, U>, 'initialize' | 'immediate'>> = {},
        handler?: Function
    ): Promise<typeof state> {
        return setState(parameter).then(async () => {
            return await fetchColumn(handler)
        })
    }

    return {
        state,
        ...toRefs(state),
        setState,
        fetchColumn,
        fetchUpdate
    }
}

/**块级栅格计算Hooks**/
export function useColumnter(option: { width: number; column: number; size: [number, number] }) {
    const { state, setState } = useState<typeof option>(option)

    /**间距差值**/
    const differ = computed(() => {
        return (((state.column - 1) * (state.size[0] ?? 0)) / state.column).toFixed(2) + 'px'
    })

    /**宽度百分比计算**/
    function compile(value: number, ct: Partial<{ bit: number; uit: string; width?: number; transfer: (c: string) => string }> = {}) {
        const { bit = 3, uit = '%', transfer } = ct ?? {}
        const cache = ((value / (ct.width ?? state.width)) * 100).toFixed(bit) + uit
        if (!isEmpty(transfer) && typeof transfer === 'function') {
            const v = transfer(differ.value)
            return isEmpty(v) ? `calc(${cache} - ${differ.value})` : `calc(${cache} - ${differ.value} ${v})`
        }
        return `calc(${cache} - ${differ.value})`
    }

    return {
        state,
        ...toRefs(state),
        setState,
        compile
    }
}
