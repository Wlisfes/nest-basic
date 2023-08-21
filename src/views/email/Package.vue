<script lang="tsx">
import { defineComponent } from 'vue'
import { useResize } from '@/hooks/hook-resize'
import { useSource } from '@/hooks/hook-source'
import { whereProperter } from '@/utils/utils-layout'
import { httpColumnMailerPackage, type MailerPackage } from '@/api/http-email.service'

export default defineComponent({
    name: 'Package',
    setup() {
        const { mobile } = useResize()
        const { state, fetchUpdate } = useSource(
            {
                immediate: true,
                form: { name: undefined },
                size: 20
            },
            async ({ size, page }) => {
                return await httpColumnMailerPackage({ size, page })
            }
        )

        return () => (
            <common-container
                bordered
                mobile={mobile.value}
                content-style={whereProperter(mobile.value, { padding: '0 20px' }, { padding: '0 40px' })}
                request-style={whereProperter(mobile.value, { padding: '40px 20px 20px' }, { padding: '60px 40px 30px' })}
                request={<common-header vertical={mobile.value} title="邮件套餐"></common-header>}
            >
                <n-element>
                    <common-source
                        loading={state.loading}
                        pagination={false}
                        total={state.total}
                        data-source={state.dataSource}
                        cols={{ 840: 1, 1280: 2, 1800: 3, 2280: 4, 2680: 5 }}
                        default-cols={3}
                        data-render={(data: MailerPackage) => {
                            return <client-mailer-package key={data.id} node={data} mobile={mobile.value}></client-mailer-package>
                        }}
                        data-spin={
                            <common-resize cols={{ 840: 1, 1280: 2, 1800: 3, 2280: 4, 2680: 5 }} default-cols={3}>
                                <n-skeleton height={215.58} style={{ borderRadius: '3px' }} />
                                <n-skeleton height={215.58} style={{ borderRadius: '3px' }} />
                                <n-skeleton height={215.58} style={{ borderRadius: '3px' }} />
                            </common-resize>
                        }
                        onUpdate={fetchUpdate}
                    ></common-source>
                </n-element>
            </common-container>
        )
    }
})
</script>
