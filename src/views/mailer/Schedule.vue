<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
import { useResizeContainer } from '@/hooks/hook-resize'
import { useSource, useColumnter } from '@/hooks/hook-source'
import { divineDelay } from '@/utils/utils-common'
import type { MailerSchedule } from '@/interface/mailer.resolver'
import * as http from '@/api/instance.service'

export default defineComponent({
    name: 'Schedule',
    setup() {
        const { size, compile } = useColumnter({ width: 960, column: 6, size: [16, 0] })
        const { mobile, whereContent, whereRequest } = useResizeContainer()
        const { state, fetchUpdate } = useSource(
            {
                immediate: true,
                loading: true,
                form: { name: undefined },
                size: 20,
                dataColumn: [
                    { key: 'jobId', title: '任务ID', minWidth: 300 },
                    { key: 'name', title: '任务名称', minWidth: 300 },
                    { key: 'total', title: '发送总数', minWidth: 300 },
                    { key: 'success', title: '成功数', minWidth: 300 },
                    { key: 'failure', title: '失败数', minWidth: 300 }
                ]
            },
            async ({ size, page }) => {
                await divineDelay(0)
                return await http.httpColumnMailerSchedule({ size, page })
            }
        )

        return () => (
            <common-container
                bordered
                scrollbar={true}
                mobile={mobile.value}
                loading={state.loading}
                initialize={state.initialize}
                min-width={1080}
                content-style={whereContent.value}
                request-style={whereRequest.value}
                request={<common-header vertical={mobile.value} title="任务队列"></common-header>}
            >
                {{
                    default: (scope: { onUpdate: Function }) => {
                        return (
                            <Fragment>
                                <n-space size={size.value} wrap-item={false} style={{ padding: '0 20px 5px' }}>
                                    <common-element
                                        element-class="n-chunk n-center"
                                        element-style={{ flex: 1 }}
                                        element-content="任务名称(ID)"
                                    ></common-element>
                                    <common-element
                                        element-class="n-chunk n-center"
                                        element-content="发送进度"
                                        element-width={compile(270, { transfer: c => `calc(${c} + 32px)` })}
                                    ></common-element>
                                    <common-element
                                        element-class="n-chunk n-center"
                                        element-content="任务状态"
                                        element-width={compile(100)}
                                    ></common-element>
                                    <common-element
                                        element-class="n-chunk n-center n-end"
                                        element-content="操作"
                                        element-width={compile(40)}
                                    ></common-element>
                                </n-space>
                                <common-source
                                    loading={state.loading}
                                    initialize={state.initialize}
                                    page={state.page}
                                    size={state.size}
                                    pagination={state.total > 10}
                                    page-sizes={[10, 20, 30, 40, 50, 60]}
                                    total={state.total}
                                    data-source={state.dataSource}
                                    default-cols={1}
                                    onUpdate={(evt: typeof state) => fetchUpdate(evt, scope.onUpdate)}
                                    v-slots={{
                                        render: (data: MailerSchedule) => {
                                            return (
                                                <mailer-schedule
                                                    key={data.id}
                                                    node={data}
                                                    mobile={mobile.value}
                                                    onUpdate={fetchUpdate}
                                                ></mailer-schedule>
                                            )
                                        }
                                    }}
                                ></common-source>
                            </Fragment>
                        )
                    }
                }}
            </common-container>
        )
    }
})
</script>
