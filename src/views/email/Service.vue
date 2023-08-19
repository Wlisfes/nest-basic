<script lang="tsx">
import { defineComponent } from 'vue'
import { useResize } from '@/hooks/hook-resize'
import { useSource } from '@/hooks/hook-source'
import { divineDelay } from '@/utils/utils-common'
import { whereProperter } from '@/utils/utils-layout'
import { httpColumnMailService, type MailerApplication } from '@/api/http-email'
import type { CnState } from '@/interface/common-interface'

export default defineComponent({
    name: 'Service',
    setup() {
        const { mobile } = useResize()
        const { state, fetchUpdate } = useSource(
            {
                immediate: true,
                form: {
                    uid: undefined,
                    name: undefined,
                    appKey: undefined,
                    status: undefined
                },
                size: 20
            },
            async ({ size, page }) => {
                await divineDelay(2000)
                return await httpColumnMailService({ size, page })
            }
        )

        return () => (
            <common-container
                bordered
                mobile={mobile.value}
                content-style={whereProperter(mobile.value, { padding: '0 20px' }, { padding: '0 40px' })}
                request-style={whereProperter(mobile.value, { padding: '40px 20px 20px' }, { padding: '60px 40px 30px' })}
                request={
                    <common-header
                        onHandler={() => console.log('111111')}
                        vertical={mobile.value}
                        title="应用服务"
                        //content="应用服务应用服务应用服务应用服务应用服务应用服务应用服务应用服务"
                    >
                        <n-space size={14} wrap-item={false} align="center" justify="end" style={{ width: '100%' }}>
                            <n-form-item show-feedback={false} show-label={false}>
                                <n-input size="large" v-model:value={state.form.name} placeholder="应用名称" />
                            </n-form-item>
                            <common-state
                                loading={state.loading}
                                v-slots={{
                                    default: (e: CnState, done: Function) => (
                                        <n-button
                                            type="primary"
                                            size="large"
                                            disabled={e.loading || e.loading}
                                            loading={e.loading}
                                            onClick={() => done({ loading: true })}
                                        >
                                            不许点
                                        </n-button>
                                    )
                                }}
                            ></common-state>
                        </n-space>
                    </common-header>
                }
            >
                <common-source
                    loading={state.loading}
                    page={state.page}
                    size={state.size}
                    page-sizes={[20, 30, 40, 50, 60]}
                    total={state.total}
                    data-source={state.dataSource}
                    cols={{ 768: 1, 1144: 2, 1520: 3, 1896: 4, 4320: 5 }}
                    default-cols={3}
                    data-render={(data: MailerApplication) => {
                        return <div style={{ border: '1px solid red' }}>1111</div>
                    }}
                    onUpdate={fetchUpdate}
                ></common-source>
            </common-container>
        )
    }
})
</script>
