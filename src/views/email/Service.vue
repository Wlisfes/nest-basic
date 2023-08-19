<script lang="tsx">
import { defineComponent } from 'vue'
import { useResize } from '@/hooks/hook-resize'
import { useSource } from '@/hooks/hook-source'
import { divineDelay } from '@/utils/utils-common'
import { whereProperter, createElement } from '@/utils/utils-layout'
import { compute, sompute } from '@/utils/utils-remix'
import { httpColumnMailService, type MailerApplication } from '@/api/http-email'
import type { CnState } from '@/interface/common-interface'

export default defineComponent({
    name: 'Service',
    setup() {
        const { mobile } = useResize()
        const { state, fetchUpdate } = useSource(
            {
                immediate: true,
                form: { name: undefined },
                size: 20
            },
            async ({ size, page }) => {
                await divineDelay(1000)
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
                        content="应用服务应用服务应用服务应用服务应用服务应用服务应用服务应用服务"
                    >
                        <n-space class="w-full h-full" size={14} wrap-item={false} align="center" justify="end">
                            <n-form-item show-feedback={false} show-label={false} style={{ flex: 1, maxWidth: '280px' }}>
                                <common-search
                                    v-model:value={state.form.name}
                                    loading={state.loading}
                                    disabled={state.loading}
                                    size="large"
                                    placeholder="应用名称"
                                    onSearch={fetchUpdate}
                                ></common-search>
                            </n-form-item>
                            <n-button strong focusable={false} type="primary" size="large">
                                {{
                                    icon: createElement(sompute('AddRound')),
                                    default: createElement(<span>创建应用</span>)
                                }}
                            </n-button>
                        </n-space>
                    </common-header>
                }
            >
                <common-source
                    loading={state.loading}
                    page={state.page}
                    size={state.size}
                    pagination={state.total > 20}
                    page-sizes={[20, 30, 40, 50, 60]}
                    total={state.total}
                    data-source={state.dataSource}
                    cols={{ 840: 1, 1280: 2, 1680: 3, 2280: 4, 2680: 5 }}
                    default-cols={3}
                    data-render={(data: MailerApplication) => {
                        return <client-service key={data.id} node={data} mobile={mobile.value}></client-service>
                    }}
                    onUpdate={fetchUpdate}
                ></common-source>
            </common-container>
        )
    }
})
</script>
