<script lang="tsx">
import { defineComponent } from 'vue'
import { useResize } from '@/hooks/hook-resize'
import { useSource } from '@/hooks/hook-source'
import { divineDelay } from '@/utils/utils-common'
import { whereProperter, createElement } from '@/utils/utils-layout'
import { compute, sompute } from '@/utils/utils-remix'
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
                await divineDelay(1000)
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
                <common-source
                    loading={state.loading}
                    page={state.page}
                    size={state.size}
                    pagination={state.total > 20}
                    page-sizes={[20, 30, 40, 50, 60]}
                    total={state.total}
                    data-source={state.dataSource}
                    cols={{ 840: 1, 1280: 2, 1800: 3, 2280: 4, 2680: 5 }}
                    default-cols={3}
                    data-render={(data: MailerPackage) => {
                        return <client-mailer-package key={data.id} node={data} mobile={mobile.value}></client-mailer-package>
                    }}
                    onUpdate={fetchUpdate}
                ></common-source>
            </common-container>
        )
    }
})
</script>
