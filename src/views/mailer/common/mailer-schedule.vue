<script lang="tsx">
import { defineComponent, ref, type PropType } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { compute } from '@/utils/utils-remix'
import { whereProperter } from '@/utils/utils-layout'
import { useState } from '@/hooks/hook-state'
import type { MailerSchedule } from '@/interface/mailer.resolver'

export default defineComponent({
    name: 'MailerSchedule',
    props: {
        node: { type: Object as PropType<MailerSchedule>, required: true },
        mobile: { type: Boolean, default: false }
    },
    setup(props, { slots }) {
        const { state, setState } = useState({ visible: false })

        return () => (
            <n-card class="mailer-schedule" content-style={whereProperter(props.mobile, { padding: '16px 16px' })}>
                <n-grid x-gap={20} cols={8}>
                    <n-grid-item span={3} class="n-chunk">
                        <n-button strong secondary round type="primary" style={{ padding: '10px', height: 'min-content' }}>
                            <n-icon component={compute('Schedule')} size={30} />
                        </n-button>
                        <div>
                            <n-h3 style={{ margin: 0 }}>{props.node.name}</n-h3>
                            <n-text style={{ lineHeight: '20px' }}>创建于 2023-09-07 09:17:39</n-text>
                        </div>
                    </n-grid-item>
                    <n-grid-item span={1}>1</n-grid-item>
                    <n-grid-item span={1}>2</n-grid-item>
                    <n-grid-item span={1}>3</n-grid-item>
                    <n-grid-item span={1}>4</n-grid-item>
                    <n-grid-item span={1}>5</n-grid-item>
                </n-grid>
                {/* <n-space size={20} wrap-item={false} align="center">
                    <n-button strong secondary round type="primary" style={{ padding: '8px', height: 'auto' }}>
                        <n-icon component={compute('MailGmail')} size={40} />
                    </n-button>
                    <div>
                        <n-h3 style={{ margin: 0 }}>{props.node.name}</n-h3>
                        <n-text>创建于 2023-09-07 09:17:39</n-text>
                    </div>

                    <common-reactive label="App ID" content="11111" copy-icon={false}></common-reactive>
                </n-space> */}
            </n-card>
        )
    }
})
</script>
