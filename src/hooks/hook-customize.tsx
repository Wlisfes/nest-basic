import type { FormInst, FormRules, FormItemRule, FormItemProps, UploadProps, UploadFileInfo } from 'naive-ui'
import type { ExcelResolver } from '@/interface/aliyun.resolver'
import { defineComponent, ref, toRefs, onMounted, Fragment, watch, type PropType } from 'vue'
import { useState } from '@/hooks/hook-state'
import { Observer } from '@/utils/utils-observer'
import { divineHandler, divineDelay } from '@/utils/utils-common'
import { baseURL } from '@/utils/utils-request'

type Option<T extends Record<string, any>, R extends Record<string, any>> = {
    immediate?: boolean
    initialize?: boolean
    disabled?: boolean
    visible?: boolean
    rules?: FormRules
    option: R
    form: T
    loading: boolean
}

/**自定义表单Hooks**/
export function useCustomize<T extends Object, R extends Object>(option: Option<T, R>, handler?: Function) {
    const formRef = ref<FormInst>()
    const { state, setState } = useState<typeof option>({ initialize: true, ...option })

    onMounted(async () => {
        await divineHandler(Boolean(option.immediate && typeof handler === 'function'), () => handler?.(state)).finally(() => {
            setState({ initialize: false })
        })
    })

    /**验证表单**/
    function divineFormValidater(
        callback: Function = Function,
        app: { reject?: boolean; catch?: Function; formatter?: (e: FormItemRule) => boolean } = {}
    ) {
        return new Promise((resolve, reject) => {
            if (!formRef.value) {
                return reject('不存在formRef实例')
            }
            //prettier-ignore
            formRef.value.validate(async err => {
                if (!err) {
                    return resolve(await callback())
                }
            }, app.formatter).catch(err => {
                app.catch && app.catch(err)
                app.reject && reject(err)
            })
        })
    }

    /**重置表单校验结果**/
    function divineFormRestore() {
        return new Promise((resolve, reject) => {
            if (!formRef.value) {
                return reject('不存在formRef实例')
            }
            return resolve(formRef.value.restoreValidation())
        })
    }

    /**滚动到第一个报错表单选项**/
    async function divineFormScrollbar() {
        await divineDelay(0)
        // const element = formRef.$el.querySelector('.el-form-item__error')
        // return element?.scrollIntoView({
        //     behavior: 'smooth',
        //     block: 'center'
        // })
    }

    return { ...toRefs(state), state, formRef, setState, divineFormValidater, divineFormRestore, divineFormScrollbar }
}

/**Uploader组件封装Hooks**/
export function useUploader(
    option: Partial<
        {
            baseURL: string
            dataSource: Array<any>
            props: UploadProps
            success: Function
            failure: Function
            reset: Function
            remove: Function
            watch: Function
        } & ExcelResolver
    > = {}
) {
    const observer = new Observer()
    const { state, setState } = useState<typeof option>({
        baseURL: option.baseURL ?? baseURL,
        dataSource: option.dataSource ?? [],
        props: option.props ?? {},
        id: option.id,
        fileId: option.fileId,
        fileName: option.fileName,
        fieldName: option.fieldName,
        fileURL: option.fileURL,
        folder: option.folder,
        suffix: option.suffix,
        list: option.list ?? [],
        total: option.total ?? 0
    })

    watch(
        () => state.fileId,
        () => option.watch?.(state)
    )

    /**局部更新**/
    async function mentSetState(data: Partial<ExcelResolver> = {}) {
        return await setState({
            id: data.id,
            fileId: data.fileId,
            fileName: data.fileName,
            fieldName: data.fieldName,
            fileURL: data.fileURL,
            folder: data.folder,
            suffix: data.suffix,
            list: data.list ?? [],
            total: data.total ?? 0
        })
    }

    /**成功回调函数**/
    async function successCallback(scope: ExcelResolver & { file: UploadFileInfo }) {
        await setState({
            dataSource: (state.dataSource ?? []).concat({ ...scope, ...scope.file })
        })
        return await mentSetState({
            ...scope,
            id: scope.file.id as never
        }).then(() => {
            return option.success?.(scope)
        })
    }

    /**失败回调函数**/
    async function failureCallback(scope: { file: UploadFileInfo }) {
        return await mentSetState().then(() => {
            return option.failure?.(scope)
        })
    }

    /**重置回调函数**/
    async function resetCallback() {
        return await mentSetState().then(() => {
            return option.reset?.()
        })
    }

    /**删除回调函数**/
    async function removeCallback({ file }: { file: UploadFileInfo }) {
        const node = (state.dataSource ?? []).find(x => x.id == file.id)
        await divineHandler(file.id == (state.id as never), async () => {
            return await mentSetState()
        })
        return await setState({
            dataSource: (state.dataSource ?? []).filter(x => x.id != file.id)
        }).then(() => {
            return option.remove?.({ ...node, file })
        })
    }

    return {
        observer,
        reset: () => observer.emit('reset'),
        ObserverUploader: defineComponent({
            name: 'ObserverUploader',
            props: {
                elementProps: { type: Object as PropType<FormItemProps>, default: () => ({}) }
            },
            setup(props, { slots }) {
                return () => (
                    <Fragment>
                        <n-form-item {...props.elementProps}>
                            <common-uploader
                                observer={observer}
                                baseURL={state.baseURL}
                                element-props={state.props}
                                element-data={state.dataSource}
                                element-success={successCallback}
                                element-failure={failureCallback}
                                element-reset={resetCallback}
                                element-remove={removeCallback}
                            ></common-uploader>
                        </n-form-item>
                        {slots.default?.(state)}
                    </Fragment>
                )
            }
        })
    }
}
