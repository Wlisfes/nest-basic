<script lang="tsx">
import { defineComponent } from 'vue'
import { transfer } from '@/utils/utils-transfer'
import { useCustomize } from '@/hooks/hook-customize'

export default defineComponent({
    name: 'Describe',
    props: {
        title: { type: String },
        name: { type: String }
    },
    emits: ['close', 'submit'],
    setup(props, { emit }) {
        const { formRef, state, setState, divineFormValidater } = useCustomize(
            {
                immediate: true,
                visible: false,
                loading: false,
                form: {
                    name: props.name
                },
                rules: {
                    name: { required: true, message: '请输入应用名称', trigger: 'change' }
                },
                option: {}
            },
            async function mounte() {
                return await setState({ visible: true })
            }
        )

        async function onSubmit() {
            return await divineFormValidater().then(() => {
                emit('submit', { done: setState, data: state.form })
            })
        }

        return () => (
            <n-modal
                v-model:show={state.visible}
                auto-focus={false}
                show-icon={false}
                mask-closable={false}
                title={props.title}
                preset="dialog"
                class="el-customize"
                style={{ width: '540px' }}
                onAfterEnter={transfer}
                onAfterLeave={() => emit('close')}
                action={() => (
                    <common-inspector
                        disabled={state.loading}
                        onCancel={() => setState({ visible: false })}
                        onSubmit={onSubmit}
                    ></common-inspector>
                )}
            >
                <n-spin show={state.loading}>
                    <n-form
                        ref={formRef}
                        model={state.form}
                        rules={state.rules}
                        disabled={state.loading}
                        size="large"
                        label-placement="top"
                        require-mark-placement="left"
                        style={{ padding: '20px 0' }}
                    >
                        <n-form-item label="应用名称" path="name">
                            <n-input
                                v-model:value={state.form.name}
                                maxlength={16}
                                placeholder="请输入应用名称"
                                allow-input={(value: string) => !value.startsWith(' ') && !value.endsWith(' ')}
                            ></n-input>
                        </n-form-item>
                    </n-form>
                </n-spin>
            </n-modal>
        )
    }
})
</script>
