<script lang="tsx">
import { defineComponent, computed, Fragment } from 'vue'
import { useResize } from '@/hooks/hook-resize'
import { useSource } from '@/hooks/hook-source'
import { whereProperter } from '@/utils/utils-layout'
import { compute, type INameUI } from '@/utils/utils-remix'
import { divineDelay, divineSkeleton } from '@/utils/utils-common'
import { httpColumnMailerPackage, type MailerPackage } from '@/api/http-email.service'

export default defineComponent({
    name: 'Package',
    setup() {
        const { mobile, l } = useResize()
        const { state, fetchUpdate } = useSource<MailerPackage, Object>(
            {
                immediate: true,
                size: 50,
                form: {},
                data: { total: 0, current: 0, prevent: 0 }
            },
            async ({ size, page }) => {
                await divineDelay(0)
                return await httpColumnMailerPackage({ size, page })
            }
        )

        const dataSmall = computed(() => state.dataSource.filter(item => item.type === 'small'))
        const dataLarge = computed(() => state.dataSource.filter(item => item.type === 'large'))
        const dataCompute = computed<Array<{ name: string; value: number; icon: INameUI }>>(() => [
            { name: '套餐总余量:', value: state.data.total, icon: 'DataBase' },
            { name: '本月发送:', value: state.data.total, icon: 'MailReadr' },
            { name: '上月发送:', value: state.data.total, icon: 'MailForwar' }
        ])

        return () => (
            <common-container
                bordered
                content-style={whereProperter(mobile.value, { padding: '0 20px' }, { padding: '0 40px' })}
                request-style={whereProperter(mobile.value, { padding: '40px 20px 20px' }, { padding: '60px 40px 30px' })}
                request={<common-header vertical={mobile.value} title="套餐资源"></common-header>}
            >
                <common-render
                    loading={state.loading}
                    spin={
                        <n-element style={{ paddingBottom: '48px' }}>
                            <n-skeleton height="35.2px" width="100%" style={{ marginBottom: '10px', maxWidth: '256px' }} />
                            <n-skeleton height={80} style={{ borderRadius: '3px' }} />
                        </n-element>
                    }
                    component={
                        <n-element style={{ paddingBottom: '48px' }}>
                            <n-h2 style={{ marginBottom: '10px' }}>我的资源包</n-h2>
                            <common-resize
                                style={{ paddingBottom: '48px' }}
                                cols={{ 960: 1 }}
                                default-cols={3}
                                data-render={(e: { cols: number }) => (
                                    <Fragment>
                                        {dataCompute.value.map(item => (
                                            <n-card embedded>
                                                <n-space wrap-item={false} size={5} align="center">
                                                    <n-button text focusable={false}>
                                                        <n-icon component={compute(item.icon)} size={32} />
                                                    </n-button>
                                                    <n-h3 style={{ margin: 0, fontSize: '20px' }}>{item.name}</n-h3>
                                                    <n-text type="success" style={{ fontSize: '20px' }}>
                                                        {`${item.value}条`}
                                                    </n-text>
                                                </n-space>
                                            </n-card>
                                        ))}
                                    </Fragment>
                                )}
                            ></common-resize>
                        </n-element>
                    }
                ></common-render>
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
