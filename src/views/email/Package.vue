<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { useResize } from '@/hooks/hook-resize'
import { useSource } from '@/hooks/hook-source'
import { whereProperter } from '@/utils/utils-layout'
import { divineDelay, divineSkeleton } from '@/utils/utils-common'
import { httpColumnMailerPackage, type MailerPackage } from '@/api/http-email.service'

export default defineComponent({
    name: 'Package',
    setup() {
        const { mobile } = useResize()
        const { state, fetchUpdate } = useSource<MailerPackage, Object>(
            {
                immediate: true,
                form: {},
                size: 50
            },
            async ({ size, page }) => {
                await divineDelay(0)
                return await httpColumnMailerPackage({ size, page })
            }
        )

        const dataSmall = computed(() => state.dataSource.filter(item => item.type === 'small'))
        const dataLarge = computed(() => state.dataSource.filter(item => item.type === 'large'))

        return () => (
            <common-container
                bordered
                mobile={mobile.value}
                content-style={whereProperter(mobile.value, { padding: '0 20px' }, { padding: '0 40px' })}
                request-style={whereProperter(mobile.value, { padding: '40px 20px 20px' }, { padding: '60px 40px 30px' })}
                request={<common-header vertical={mobile.value} title="套餐资源"></common-header>}
            >
                <n-element style={{ paddingBottom: '48px' }}>
                    <common-render
                        loading={state.loading}
                        spin={<n-skeleton height="35.2px" width="100%" style={{ marginBottom: '10px', maxWidth: '256px' }} />}
                        component={<n-h2 style={{ marginBottom: '10px' }}>我的资源包</n-h2>}
                    ></common-render>
                    <n-skeleton height={80} style={{ borderRadius: '3px' }} />
                </n-element>
                <n-element>
                    <common-render
                        loading={state.loading}
                        spin={<n-skeleton height="35.2px" width="100%" style={{ marginBottom: '10px', maxWidth: '256px' }} />}
                        component={<n-h2 style={{ marginBottom: '10px' }}>小额体验套餐包</n-h2>}
                    ></common-render>
                    <common-source
                        loading={state.loading}
                        pagination={false}
                        total={dataSmall.value.length}
                        data-source={dataSmall.value}
                        came-style={{ paddingBottom: '48px' }}
                        cols={{ 840: 1, 1280: 2, 1800: 3, 2280: 4, 2680: 5 }}
                        default-cols={3}
                        data-render={(data: MailerPackage) => {
                            return <client-mailer-package key={data.id} node={data} mobile={mobile.value}></client-mailer-package>
                        }}
                        data-spin={
                            <common-resize
                                style={{ paddingBottom: '48px' }}
                                cols={{ 840: 1, 1280: 2, 1800: 3, 2280: 4, 2680: 5 }}
                                default-cols={3}
                                data-render={(e: { cols: number }) => {
                                    return divineSkeleton(e.cols, <n-skeleton height={215.58} style={{ borderRadius: '3px' }} />)
                                }}
                            ></common-resize>
                        }
                        onUpdate={fetchUpdate}
                    ></common-source>
                </n-element>
                <n-element>
                    <common-render
                        loading={state.loading}
                        spin={<n-skeleton height="35.2px" width="100%" style={{ marginBottom: '10px', maxWidth: '256px' }} />}
                        component={<n-h2 style={{ marginBottom: '10px' }}>大额特惠套餐包</n-h2>}
                    ></common-render>
                    <common-source
                        loading={state.loading}
                        pagination={false}
                        total={dataLarge.value.length}
                        data-source={dataLarge.value}
                        cols={{ 840: 1, 1280: 2, 1800: 3, 2280: 4, 2680: 5 }}
                        default-cols={3}
                        data-render={(data: MailerPackage) => {
                            return <client-mailer-package key={data.id} node={data} mobile={mobile.value}></client-mailer-package>
                        }}
                        data-spin={
                            <common-resize
                                style={{ paddingBottom: '64px' }}
                                cols={{ 840: 1, 1280: 2, 1800: 3, 2280: 4, 2680: 5 }}
                                default-cols={3}
                                data-render={(e: { cols: number }) => {
                                    return divineSkeleton(e.cols, <n-skeleton height={215.58} style={{ borderRadius: '3px' }} />)
                                }}
                            ></common-resize>
                        }
                        onUpdate={fetchUpdate}
                    ></common-source>
                </n-element>
            </common-container>
        )
    }
})
</script>
