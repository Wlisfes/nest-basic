<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useResize } from '@/hooks/hook-resize'
import { useSource } from '@/hooks/hook-source'
import { whereProperter, createElement } from '@/utils/utils-layout'
import { sompute } from '@/utils/utils-compute'
import { router } from '@/router'
import type { MailerTemplate } from '@/interface/mailer.resolver'
import * as http from '@/api/instance.service'

export default defineComponent({
    name: 'Template',
    components: { VueDraggable },
    setup() {
        const { mobile } = useResize()
        const { state, fetchUpdate } = useSource(
            {
                immediate: true,
                loading: true,
                form: { name: undefined },
                size: 20
            },
            ({ size, page }) => http.httpColumnMailerTemplate({ size, page })
        )

        const whereContent = computed(() => {
            return whereProperter(mobile.value, { padding: '0 20px' }, { padding: '0 40px' })
        })
        const whereRequest = computed(() => {
            return whereProperter(mobile.value, { padding: '40px 20px 20px' }, { padding: '60px 40px 30px' })
        })

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
                    <common-header vertical={mobile.value} title="发送模板">
                        <n-space class="w-full h-full" size={14} wrap-item={false} align="center" justify="end">
                            <n-form-item show-feedback={false} show-label={false} style={{ flex: 1, maxWidth: '280px' }}>
                                <common-search
                                    v-model:value={state.form.name}
                                    loading={state.loading}
                                    disabled={state.loading}
                                    size="large"
                                    placeholder="模板名称"
                                    onSearch={fetchUpdate}
                                ></common-search>
                            </n-form-item>
                            <n-button
                                strong
                                focusable={false}
                                type="primary"
                                size="large"
                                disabled={state.loading}
                                onClick={() => router.push(`/mailer/create/currenter`)}
                            >
                                {{ icon: createElement(sompute('AddRound')), default: createElement(<span>创建模板</span>) }}
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
                            y-gap={30}
                            x-gap={30}
                            cols={{ 480: 1, 750: 2, 1080: 3, 1480: 4, 1880: 5, 2680: 6 }}
                            default-cols={5}
                            onUpdate={(evt: typeof state) => fetchUpdate(evt, scope.onUpdate)}
                            v-slots={{
                                render: (data: MailerTemplate) => (
                                    <mailer-template key={data.id} node={data} mobile={mobile.value}></mailer-template>
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

<style scoped>
.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}
</style>
