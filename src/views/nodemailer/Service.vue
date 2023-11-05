<script lang="tsx">
import { defineComponent } from 'vue'
import { useResizeContainer } from '@/hooks/hook-resize'
import { useSource } from '@/hooks/hook-source'
import { createElement } from '@/utils/utils-layout'
import { sompute } from '@/utils/utils-compute'
import { httpNodemailerColumnAppwr } from '@/api/nodemailer.service'
import type { NodemailerAppwr } from '@/interface/nodemailer.resolver'

export default defineComponent({
    name: 'Service',
    setup() {
        const { mobile, whereContent, whereRequest } = useResizeContainer()
        const { state, fetchUpdate } = useSource(
            {
                immediate: true,
                form: { name: undefined },
                size: 20
            },
            async ({ size, page }) => await httpNodemailerColumnAppwr({ size, page })
        )

        return () => (
            <common-container
                bordered
                scrollbar={true}
                mobile={mobile.value}
                loading={state.loading}
                initialize={state.initialize}
                content-style={whereContent.value}
                request-style={whereRequest.value}
                request={
                    <common-header vertical={mobile.value} title="应用服务">
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
                            <n-button strong focusable={false} type="primary" size="large" disabled={state.loading}>
                                {{ icon: createElement(sompute('AddRound')), default: createElement(<span>创建应用</span>) }}
                            </n-button>
                        </n-space>
                    </common-header>
                }
            >
                {{
                    default: (scope: { onUpdate: Function }) => (
                        <common-source
                            loading={state.loading}
                            initialize={state.initialize}
                            page={state.page}
                            size={state.size}
                            pagination={state.total > 20}
                            page-sizes={[20, 30, 40, 50, 60]}
                            total={state.total}
                            data-source={state.dataSource}
                            cols={{ 840: 1, 1280: 2, 1800: 3, 2280: 4, 2680: 5 }}
                            default-cols={3}
                            onUpdate={(evt: typeof state) => fetchUpdate(evt, scope.onUpdate)}
                            v-slots={{
                                render: (data: NodemailerAppwr) => (
                                    <nodemailer-service
                                        key={data.keyId}
                                        node={data}
                                        mobile={mobile.value}
                                        onUpdate={fetchUpdate}
                                    ></nodemailer-service>
                                )
                            }}
                        ></common-source>
                    )
                }}
            </common-container>
        )
    }
})
</script>
