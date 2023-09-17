<script lang="tsx">
import { defineComponent } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useResize } from '@/hooks/hook-resize'
import { useSource } from '@/hooks/hook-source'
import { divineSkeleton } from '@/utils/utils-common'
import { whereProperter, createElement } from '@/utils/utils-layout'
import { sompute } from '@/utils/utils-remix'
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

        return () => (
            <common-container
                bordered
                content-style={whereProperter(mobile.value, { padding: '0 20px' }, { padding: '0 40px' })}
                request-style={whereProperter(mobile.value, { padding: '40px 20px 20px' }, { padding: '60px 40px 30px' })}
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
                <common-source
                    loading={state.loading}
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
                    onUpdate={fetchUpdate}
                    data-render={(data: MailerTemplate) => {
                        return <mailer-template key={data.id} node={data} mobile={mobile.value}></mailer-template>
                    }}
                    data-spin={
                        <common-resize
                            style={{ paddingBottom: '64px' }}
                            cols={{ 480: 1, 750: 2, 1080: 3, 1480: 4, 1880: 5, 2680: 6 }}
                            default-cols={5}
                            y-gap={30}
                            x-gap={30}
                            data-render={(e: { cols: number }) => {
                                return divineSkeleton(
                                    e.cols * 2,
                                    <n-card embedded content-style={{ padding: 0 }}>
                                        <common-scale scale={1 / 0.8} full-box={false} flex-box>
                                            <n-skeleton style={{ height: '100%' }} />
                                        </common-scale>
                                        <n-skeleton style={{ height: '87.6px' }} />
                                    </n-card>
                                )
                            }}
                        ></common-resize>
                    }
                ></common-source>
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
