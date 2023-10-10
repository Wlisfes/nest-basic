<script lang="tsx">
import { defineComponent, ref, type PropType } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { compute } from '@/utils/utils-remix'
import { useState } from '@/hooks/hook-state'
import type { MailerSchedule } from '@/interface/mailer.resolver'

export default defineComponent({
    name: 'MailerSchedule',
    props: {
        node: { type: Object as PropType<MailerSchedule>, required: true },
        mobile: { type: Boolean, default: false }
    },
    setup(props) {
        const { state, setState } = useState({ visible: false })

        return () => (
            <n-card class="mailer-schedule">
                <n-h2 onClick={(e: Event) => setState({ visible: !state.visible })} style={{ marginBottom: 0 }}>
                    {props.node.name}
                </n-h2>
                <common-collapse visible={state.visible}>
                    <div>weqweqwe</div>
                </common-collapse>
            </n-card>
        )
    }
})
</script>
