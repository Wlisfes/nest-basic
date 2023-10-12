<script lang="tsx">
import { defineComponent, computed, Fragment } from 'vue'
import { useResize } from '@/hooks/hook-resize'
import { useSource } from '@/hooks/hook-source'
import { divineDelay } from '@/utils/utils-common'
import { whereProperter } from '@/utils/utils-layout'
import type { MailerSchedule } from '@/interface/mailer.resolver'
import * as http from '@/api/instance.service'

export default defineComponent({
    name: 'Schedule',
    setup() {
        const { mobile } = useResize()
        const { state, fetchUpdate } = useSource(
            {
                immediate: true,
                loading: true,
                form: { name: undefined },
                size: 10
            },
            async ({ size, page }) => {
                await divineDelay(1000)
                return await http.httpColumnMailerSchedule({ size, page })
            }
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
                scrollbar
                loading={state.loading}
                initialize={state.initialize}
                min-width={1280}
                content-style={whereContent.value}
                request-style={whereRequest.value}
                request={<common-header vertical={mobile.value} title="任务队列"></common-header>}
                v-slots={{
                    default: (scope: { onUpdate: Function }) => (
                        <common-source
                            loading={state.loading}
                            initialize={state.initialize}
                            page={state.page}
                            size={state.size}
                            pagination={state.total > 10}
                            page-sizes={[10, 20, 30, 40, 50, 60]}
                            total={state.total}
                            data-source={state.dataSource}
                            default-cols={1}
                            onUpdate={(evt: typeof state) => fetchUpdate(evt, scope.onUpdate)}
                            v-slots={{
                                render: (data: MailerSchedule) => {
                                    return (
                                        <mailer-schedule
                                            key={data.id}
                                            node={data}
                                            mobile={mobile.value}
                                            onUpdate={fetchUpdate}
                                        ></mailer-schedule>
                                    )
                                }
                            }}
                        ></common-source>
                    )
                }}
            ></common-container>
        )
    }
})
</script>
