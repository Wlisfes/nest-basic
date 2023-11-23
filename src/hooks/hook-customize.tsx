import type { FormInst, FormRules, FormItemRule, FormItemProps, UploadProps, UploadFileInfo } from 'naive-ui'
import type { PropType } from 'vue'
import type { ExcelResolver } from '@/interface/aliyun.resolver'
import { defineComponent, ref, reactive, toRefs, Fragment, watch } from 'vue'
import { useState } from '@/hooks/hook-state'
import { Observer } from '@/utils/utils-observer'
import { divineHandler, divineDelay } from '@/utils/utils-common'
import { baseURL } from '@/utils/utils-request'

interface OptionCustomize<T extends Record<string, any>> {
    initialize?: boolean
    disabled?: boolean
    visible?: boolean
    loading?: boolean
    rules?: FormRules
    form: T
}

/**自定义表单Hooks**/
export function useCustomize<T extends Object>(data: OptionCustomize<T>) {
    const formRef = ref<FormInst & { $el: Element }>()
    const initialize = ref<boolean>(data.initialize ?? true)
    const disabled = ref<boolean>(data.disabled ?? false)
    const visible = ref<boolean>(data.visible ?? false)
    const loading = ref<boolean>(data.loading ?? false)
    const form = ref<typeof data.form>(data.form)
    const rules = ref<typeof data.rules>(data.rules)
    const state = reactive({ initialize, disabled, visible, loading, form, rules })

    async function setInitialize(value: boolean) {
        return (initialize.value = value)
    }

    async function setDisabled(value: boolean) {
        return (disabled.value = value)
    }

    async function setVisible(value: boolean) {
        return (visible.value = value)
    }

    async function setLoading(value: boolean) {
        return (loading.value = value)
    }

    async function setForm(value: Partial<T>) {
        return (form.value = { ...form.value, ...value })
    }

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
        return await divineHandler(Boolean(formRef.value), async () => {
            const element = formRef.value!.$el.querySelector('.el-form-item__error')
            return element!.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        })
    }

    return {
        initialize,
        disabled,
        visible,
        loading,
        form,
        rules,
        state,
        formRef,
        setInitialize,
        setDisabled,
        setVisible,
        setLoading,
        setForm,
        divineFormValidater,
        divineFormRestore,
        divineFormScrollbar
    }
}

interface OptionUploader<R> extends ExcelResolver {
    baseURL: string
    dataSource: Array<any>
    props: R
    success: Function
    failure: Function
    reset: Function
    remove: Function
    watch: Function
}

/**Uploader组件封装Hooks**/
export function useUploader<R extends UploadProps>(option: Partial<OptionUploader<R>> = {}) {
    const observer = new Observer()
    const { state, setState } = useState<typeof option>({
        baseURL: option.baseURL ?? baseURL,
        dataSource: option.dataSource ?? [],
        props: (option.props ?? {}) as never,
        keyId: option.keyId,
        fileId: option.fileId,
        fileName: option.fileName,
        fieldName: option.fieldName,
        fileURL: option.fileURL,
        folder: option.folder,
        suffix: option.suffix,
        list: option.list ?? [
            {
                COLUMN_1: 'Receive',
                COLUMN_2: 'Name',
                COLUMN_3: 'UserName',
                COLUMN_4: 'Password'
            },
            {
                COLUMN_1: 'feog2w74@yahoo.com.cn',
                COLUMN_2: '嵇政君',
                COLUMN_3: 'gztjcv_q11',
                COLUMN_4: 'A2WsH5A_D9FXEYK'
            },
            {
                COLUMN_1: 'mg0iuc.g30p6y80@yahoo.com.cn',
                COLUMN_2: '宫思佳',
                COLUMN_3: 'k7nggq_k2894',
                COLUMN_4: 'ICwVmmruGcWmMSk'
            },
            {
                COLUMN_1: 'izh.jdu4@vip.qq.com',
                COLUMN_2: '孟燕',
                COLUMN_3: 'i1crqi95',
                COLUMN_4: 'EBCiAkbHOtViR3b'
            },
            {
                COLUMN_1: 'gztjcv13@hotmail.com',
                COLUMN_2: '牟军',
                COLUMN_3: 'k88to31',
                COLUMN_4: 'GleNLLfkyqnPhSC'
            },
            {
                COLUMN_1: 'i1cuji95@126.com',
                COLUMN_2: '尉玉珍',
                COLUMN_3: 'vdak5x44',
                COLUMN_4: '7SIEzKbYgIyT3LS'
            },
            {
                COLUMN_1: 'izhsf0_jdu@126.com',
                COLUMN_2: '陀杰',
                COLUMN_3: 'izhlq444',
                COLUMN_4: 'fhe1zZEqufEIaWz'
            },
            {
                COLUMN_1: 'k5mit672@hotmail.com',
                COLUMN_2: '驹静',
                COLUMN_3: 'negtue_o9x88',
                COLUMN_4: 'spqZR7eiMnfgEOk'
            },
            {
                COLUMN_1: 'k1z67@sina.com',
                COLUMN_2: '守熙成',
                COLUMN_3: 'i1crqi.ggn',
                COLUMN_4: '3bYuKojPQCnVY6S'
            },
            {
                COLUMN_1: 'id7mft80@outlook.com',
                COLUMN_2: '顿子豪',
                COLUMN_3: 'fgpsbt37',
                COLUMN_4: 'cFWAsN179KoUBBp'
            }
        ],
        total: option.total ?? 0
    })

    watch(
        () => state.fileId,
        () => option.watch?.(state)
    )

    /**局部更新**/
    async function mentSetState(data: Partial<ExcelResolver> = {}) {
        return await setState({
            keyId: data.keyId,
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
            keyId: scope.file.id as never
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
        await divineHandler(file.id == (state.keyId as never), async () => {
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
        state,
        ...toRefs(state),
        setState,
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
