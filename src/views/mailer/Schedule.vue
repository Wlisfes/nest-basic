<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
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
                await divineDelay(5000)
                return await http.httpColumnMailerSchedule({ size, page })
            }
        )

        return () => (
            <common-container
                bordered
                //scrollbar
                //loading
                content-style={{ minWidth: '1280px' }}
                //content-style={whereProperter(mobile.value, { padding: '0 20px' }, { padding: '0 40px' })}
                //request-style={whereProperter(mobile.value, { padding: '40px 20px 20px' }, { padding: '60px 40px 30px' })}
                request={<common-header vertical={mobile.value} title="任务队列"></common-header>}
            >
                {{
                    default: (scope: { onUpdate: Function }) => {
                        return (
                            <Fragment>
                                {Array.from({ length: 100 }, (x, index) => (
                                    <n-h2 key={index} onClick={scope.onUpdate}>
                                        {index}
                                    </n-h2>
                                ))}
                            </Fragment>
                        )
                    }
                }}

                {/* <common-source
                    loading={state.loading}
                    page={state.page}
                    size={state.size}
                    pagination={state.total > 10}
                    page-sizes={[10, 20, 30, 40, 50, 60]}
                    total={state.total}
                    data-source={state.dataSource}
                    default-cols={1}
                    onUpdate={fetchUpdate}
                    data-render={(data: MailerSchedule) => {
                        return <mailer-schedule key={data.id} node={data} mobile={mobile.value} onUpdate={fetchUpdate}></mailer-schedule>
                    }}
                ></common-source> */}
            </common-container>
        )
    }
})
</script>
