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
                <n-space size={10} wrap-item={false} align="center">
                    <n-button strong secondary round type="primary" style={{ padding: '10px', height: 'auto' }}>
                        <n-icon component={compute('MailGmail')} size={40} />
                    </n-button>
                    <n-h3 style={{ margin: 0 }}>{props.node.name}</n-h3>
                </n-space>
            </n-card>
        )
    }
})
</script>
