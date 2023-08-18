<script lang="tsx">
import { defineComponent } from 'vue'
import { useSource } from '@/hooks/hook-source'
import { httpColumnMailService, type MailerApplication } from '@/api/http-email'
import { sompute } from '@/utils/utils-remix'
import { divineDelay } from '@/utils/utils-common'
import type { CnState } from '@/interface/common-interface'

export default defineComponent({
    name: 'Service',
    setup() {
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
            <common-container react-style={{ padding: '20px 40px 0' }}>
                <common-header
                    title-render={<n-h1 style={{ margin: 0 }}>应用服务</n-h1>}
                    footer-render={<n-text>截止到 2021年4月3日</n-text>}
                ></common-header>
                <n-page-header on-back={Function}>
                    {{
                        title: () => <n-h1 style={{ margin: 0 }}>让你的听觉更懂视觉</n-h1>,
                        extra: () => (
                            <n-space size={14} wrap-item={false}>
                                <n-form-item show-feedback={false} show-label={false}>
                                    <n-input v-model:value={state.form.name} placeholder="应用名称" />
                                </n-form-item>
                                <common-state
                                    loading={state.loading}
                                    v-slots={{
                                        default: (e: CnState, done: Function) => (
                                            <n-button
                                                type="primary"
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
                        )
                    }}
                </n-page-header>
                <common-state
                    loading={state.loading}
                    v-slots={{
                        default: (e: CnState, done: Function) => (
                            <n-button disabled={e.loading || e.loading} loading={e.loading} onClick={() => done({ loading: true })}>
                                不许点
                            </n-button>
                        )
                    }}
                ></common-state>
                <common-source
                    came-style={{ padding: '0 16px 48px' }}
                    loading={state.loading}
                    page={state.page}
                    size={state.size}
                    page-sizes={[20, 30, 40, 50, 60]}
                    total={state.total}
                    data-source={state.dataSource}
                    cols={{ 768: 1, 1144: 2, 1520: 3, 1896: 4, 4320: 5 }}
                    default-cols={3}
                    data-render={(data: MailerApplication) => {
                        return <div>1111</div>
                    }}
                    onUpdate={fetchUpdate}
                ></common-source>
            </common-container>
        )
    }
})
</script>
