<script lang="tsx">
import type { ServiceMailer } from '@/interface/mailer.resolver'
import { defineComponent, h } from 'vue'
import { useResizeContainer } from '@/hooks/hook-resize'
import { useCustomize, useUploader } from '@/hooks/hook-customize'
import { divineDelay } from '@/utils/utils-common'
import { compute } from '@/utils/utils-compute'
import * as http from '@/api/instance.service'

export default defineComponent({
    name: 'BulkSender',
    setup() {
        const { mobile, whereContent, whereRequest } = useResizeContainer()
        const { ObserverUploader, reset } = useUploader({
            watch: (scope: { fileId: never }) => (state.form.fileId = scope.fileId ?? null)
        })
        const { formRef, state, option, setState, divineFormValidater } = useCustomize(
            {
                immediate: true,
                loading: false,
                option: {
                    service: [] as Array<ServiceMailer>
                },
                form: {
                    name: undefined,
                    appId: undefined,
                    super: 'sample',
                    content: undefined,
                    accept: 'excel',
                    receive: undefined,
                    fileId: undefined,
                    type: 'immediate'
                },
                rules: {
                    name: { required: true, trigger: 'blur', message: '请输入任务名称' },
                    appId: { required: true, trigger: ['blur', 'change'], message: '请选择应用服务' },
                    super: { required: true, trigger: 'blur', message: '请选择发送类型' },
                    content: { required: true, trigger: 'blur', message: '请输入发送内容' },
                    accept: { required: true, trigger: 'blur', message: '请选择接收类型' },
                    receive: { required: true, trigger: 'blur', message: '请输入邮箱号' },
                    fileId: { required: true, trigger: ['change', 'blur'], message: '请输入上传接收列表文件' },
                    type: { required: true, trigger: ['blur', 'change'], message: '请选择任务类型' }
                }
            },
            async function () {
                return await fetchSelecterMailerService()
            }
        )

        /**邮件应用下拉列表**/
        async function fetchSelecterMailerService() {
            return await http.httpSelecterMailerService().then(({ data }) => {
                return setState({
                    option: {
                        service: data.list
                    }
                })
            })
        }

        /**发送邮件**/
        function onSubmit() {
            return divineFormValidater(() => {
                console.log(state.form)
            }).catch(e => {})
        }

        return () => (
            <common-container
                bordered
                scrollbar={true}
                mobile={mobile.value}
                loading={state.initialize}
                initialize={state.initialize}
                min-width={414}
                request-style={whereRequest.value}
                content-style={whereContent.value}
                request={<common-header vertical={mobile.value} title="邮件群发"></common-header>}
            >
                <n-form ref={formRef} model={state.form} rules={state.rules} size="large" require-mark-placement="left">
                    <n-form-item label="任务名称" path="name">
                        <n-input
                            v-model:value={state.form.name}
                            autosize={{ minRows: 1 }}
                            style={{ maxWidth: '750px' }}
                            type="textarea"
                            placeholder="请输入任务名称"
                        ></n-input>
                    </n-form-item>
                    <n-form-item label="应用服务" path="appId">
                        <n-select
                            v-model:value={state.form.appId}
                            placeholder="请选择应用服务"
                            value-field="appId"
                            label-field="name"
                            style={{ width: '374px' }}
                            options={option.value.service}
                            render-label={(scope: ServiceMailer) => {
                                return h(
                                    <n-element class="n-chunk n-center">
                                        <n-button text>
                                            <n-icon size={18} component={compute('EnableRound')} />
                                        </n-button>
                                        <span style={{ marginLeft: '5px' }}>{scope.name}</span>
                                    </n-element>
                                )
                            }}
                        />
                    </n-form-item>
                    <n-form-item label="发送类型" path="super">
                        <n-select
                            v-model:value={state.form.super}
                            placeholder="请选择发送类型"
                            style={{ width: '374px' }}
                            options={[
                                { label: '模板发送', value: 'sample' },
                                { label: '自定义发送', value: 'customize' }
                            ]}
                        />
                    </n-form-item>
                    {state.form.super === 'customize' && (
                        <n-form-item label="发送内容" path="content">
                            <n-input
                                v-model:value={state.form.content}
                                autosize={{ minRows: 3 }}
                                style={{ maxWidth: '750px' }}
                                type="textarea"
                                placeholder="请输入发送内容"
                            ></n-input>
                        </n-form-item>
                    )}
                    <n-form-item label="接收类型" path="accept">
                        <n-select
                            v-model:value={state.form.accept}
                            placeholder="请选择接收类型"
                            style={{ width: '374px' }}
                            options={[
                                { label: '接收列表文件', value: 'excel' },
                                { label: '自定义接收', value: 'customize' }
                            ]}
                        />
                    </n-form-item>
                    {state.form.accept === 'customize' ? (
                        <n-form-item label="自定义接收列表" path="receive">
                            <n-input
                                v-model:value={state.form.receive}
                                autosize={{ minRows: 2 }}
                                style={{ maxWidth: '750px' }}
                                type="textarea"
                                placeholder="请输入邮箱号"
                            ></n-input>
                        </n-form-item>
                    ) : (
                        <ObserverUploader element-props={{ label: '接收列表', path: 'fileId', style: { maxWidth: '750px' } }}>
                            {{
                                default: (scope: { list: Array<unknown>; total: 0 }) => (
                                    <n-form-item label="接收列表预览" show-feedback={false} show-label={true}>
                                        <common-uploader-tabler
                                            mobile={mobile.value}
                                            max-column={5}
                                            element-data={scope.list}
                                        ></common-uploader-tabler>
                                    </n-form-item>
                                )
                            }}
                        </ObserverUploader>
                    )}
                    <n-form-item label="任务类型" path="type">
                        <n-select
                            v-model:value={state.form.accept}
                            placeholder="请选择任务类型"
                            style={{ width: '374px' }}
                            options={[
                                { label: '立即发送', value: 'immediate' },
                                { label: '定时发送', value: 'schedule' }
                            ]}
                        />
                    </n-form-item>
                    <n-form-item>
                        <n-button type="success" size="large" style={{ minWidth: '140px' }} onClick={onSubmit}>
                            发送邮件
                        </n-button>
                    </n-form-item>
                </n-form>
            </common-container>
        )
    }
})
</script>
