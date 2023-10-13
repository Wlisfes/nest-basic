import { toRefs, nextTick } from 'vue'
import { divineHandler, createMounte } from '@/utils/utils-common'
import { useState } from '@/hooks/hook-state'
import type { DataTableBaseColumn } from 'naive-ui'
import type { Result } from '@/interface/common.resolver'
import type { Response } from '@/utils/utils-request'
type Option<T extends Record<string, any>, R extends Record<string, any>> = {
    page?: number
    size?: number
    total?: number
    loading?: boolean
    form: R
    immediate?: boolean
    initialize?: boolean
    dataSource?: Array<T>
    data?: Record<string, any>
    dataColumn?: Array<DataTableBaseColumn>
}

//@ts-ignore
export function useSource<T extends Object, R extends Object>(
    option: Option<T, R>,
    request: (e: Required<Option<T, R>>) => Promise<Response<Result<T>>>
) {
    const { state, setState } = useState<Required<typeof option>>({
        immediate: option.immediate ?? false,
        form: option.form,
        page: option.page ?? 1,
        size: option.size ?? 10,
        total: option.total ?? 0,
        loading: option.loading ?? true,
        dataSource: option.dataSource ?? [],
        data: option.data ?? {},
        initialize: true,
        dataColumn: (option.dataColumn ?? []) as unknown as Array<DataTableBaseColumn>
    })

    createMounte(async () => {
        await divineHandler(state.immediate, () => {
            fetchColumn()
        })
    })

    /**初始化列表接口**/
    function fetchColumn(handler?: Function): Promise<typeof state> {
        return new Promise(resolve => {
            return setState({ loading: true } as Partial<typeof option>).then(async () => {
                try {
                    const { data } = await request(state as Required<typeof option>)
                    await setState({
                        dataSource: data.list,
                        total: data.total
                    } as typeof option)
                } catch (e) {
                } finally {
                    nextTick(async () => {
                        await setState({ loading: false, initialize: false } as typeof option)
                        handler?.(state)
                        resolve(state)
                    })
                }
            })
        })
    }

    /**列表更新**/
    function fetchUpdate(
        parameter: Partial<Omit<Option<T, R>, 'dataColumn' | 'initialize' | 'immediate'>> = {},
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
