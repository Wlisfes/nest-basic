import { ref } from 'vue'
import { type DialogReactive } from 'naive-ui'
import { createDiscover } from '@/utils/utils-naive'
import { divineHandler } from '@/utils/utils-common'
import { transfer } from '@/utils/utils-transfer'
import { useCustomize } from '@/hooks/hook-customize'

/**应用编辑表单**/
export function useFormService() {
    const instance = ref<DialogReactive>()
    const { formRef, state, form, rules, setForm, setLoading, setDisabled, divineFormValidater } = useCustomize<Partial<{ name: string }>>({
        form: {
            name: undefined
        },
        rules: {
            name: { required: true, message: '请输入应用名称', trigger: 'change' }
        }
    })

    /**实例缓存**/
    async function setInstance(vm: DialogReactive) {
        return (instance.value = vm)
    }

    /**取消事件**/
    async function onCancel(evt: Event, callback?: Function) {
        await divineHandler(Boolean(callback), async () => {
            return await callback?.()
        })
        return instance.value?.destroy()
    }

    /**确定事件**/
    async function onSubmit(evt: Event, callback?: Function) {
        return await divineFormValidater().then(async () => {
            return await divineHandler(
                Boolean(callback),
                async function success() {
                    return await callback?.(form.value, {
                        done: async (value: boolean) => {
                            await setLoading(value)
                            await setDisabled(value)
                        },
                        destroy: async () => {
                            return await instance.value!.destroy()
                        }
                    })
                },
                async function failure() {
                    return await instance.value!.destroy()
                }
            )
        })
    }

    /**开启表单**/
    async function fetchNodeRender(option: Partial<{ title: string; name: string; onCancel: Function; onSubmit: Function }> = {}) {
        await setForm({ name: option.name ?? undefined })
        return await createDiscover({
            autoFocus: false,
            maskClosable: false,
            showIcon: false,
            class: 'el-customize el-transfer',
            style: { width: '540px' },
            title: option.title ?? '编辑应用',
            onAfterEnter: (e: HTMLElement) => transfer(e),
            action: () => (
                <common-inspector
                    loading={state.loading}
                    disabled={state.disabled}
                    onCancel={(evt: Event) => onCancel(evt, option.onCancel)}
                    onSubmit={(evt: Event) => onSubmit(evt, option.onSubmit)}
                ></common-inspector>
            ),
            content: () => (
                <n-spin show={state.loading}>
                    <n-form
                        ref={formRef}
                        model={form.value}
                        rules={rules.value}
                        disabled={state.loading}
                        size="large"
                        label-placement="top"
                        require-mark-placement="left"
                        style={{ padding: '20px 0' }}
                    >
                        <n-form-item label="应用名称" path="name">
                            <n-input
                                v-model:value={form.value.name}
                                maxlength={16}
                                placeholder="请输入应用名称"
                                allow-input={(value: string) => !value.startsWith(' ') && !value.endsWith(' ')}
                            ></n-input>
                        </n-form-item>
                    </n-form>
                </n-spin>
            )
        }).then(async (vm: DialogReactive) => {
            return await setInstance(vm)
        })
    }

    return { state, form, setForm, setLoading, setDisabled, fetchNodeRender, onCancel, onSubmit }
}
