<script lang="tsx">
import { defineComponent } from 'vue'
import { useSource } from '@/hooks/hook-source'
import { httpColumnMailService, type MailerApplication } from '@/api/http-email'
import { sompute } from '@/utils/utils-remix'

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
            ({ size, page }) => httpColumnMailService({ size, page })
        )

        return () => (
            <common-container native-style={{ padding: '20px' }} react-style={{ padding: '64px 32px 32px' }}>
                <common-request cols={{ 544: 1, 640: 2, 960: 3, 1400: 4, 1592: 6, 2160: 7, 3440: 8 }} default-cols={12}>
                    <n-form-item-gi span={1}>
                        <n-input v-model:value={state.form.uid} placeholder="UID" />
                    </n-form-item-gi>
                    <n-form-item-gi span={1}>
                        <n-input v-model:value={state.form.name} placeholder="应用名称" />
                    </n-form-item-gi>
                    <n-form-item-gi span={1}>
                        <n-input v-model:value={state.form.appKey} placeholder="AppKey" />
                    </n-form-item-gi>
                    <n-form-item-gi span={1}>
                        <n-input v-model:value={state.form.status} placeholder="电子邮件" />
                    </n-form-item-gi>
                    <n-form-item-gi span={2}>
                        <n-space size={14} wrap-item={false}>
                            <common-touch
                                type="primary"
                                icon-render={sompute('SearchBlod', { size: 22 })}
                                onClick={(e: any, done: Function) => done({ loading: true })}
                            ></common-touch>
                            <common-touch type="primary" icon-render={sompute('AddRound')}></common-touch>
                            <common-touch
                                type="primary"
                                icon-render={sompute('RadixSpin')}
                                onClick={(e: any, done: Function) => done({ loading: true })}
                            ></common-touch>
                        </n-space>
                    </n-form-item-gi>
                </common-request>
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
