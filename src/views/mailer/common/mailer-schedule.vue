<script lang="tsx">
import { defineComponent, type PropType } from 'vue'
import { compute } from '@/utils/utils-compute'
import { whereProperter } from '@/utils/utils-layout'
import { useColumnter } from '@/hooks/hook-source'
import type { MailerSchedule } from '@/interface/mailer.resolver'

export default defineComponent({
    name: 'MailerSchedule',
    props: {
        node: { type: Object as PropType<MailerSchedule>, required: true },
        mobile: { type: Boolean, default: false }
    },
    setup(props, { slots }) {
        const { state, compile } = useColumnter({ width: 960, column: 6, size: [16, 0] })

        return () => (
            <n-card class="mailer-schedule" content-style={{ padding: '20px 20px' }}>
                <n-space size={state.size} wrap-item={false}>
                    <common-element element-class="n-chunk" element-style={{ columnGap: '10px', flex: 1 }}>
                        <n-button
                            strong
                            secondary
                            round
                            focusable={false}
                            type="primary"
                            style={{ padding: '10px', height: 'min-content' }}
                        >
                            <n-icon component={compute('Schedule')} size={30} />
                        </n-button>
                        <n-element>
                            <n-h3 style={{ margin: 0 }}>{props.node.name}</n-h3>
                            <n-text style={{ lineHeight: '20px' }}>创建于 2023-09-07 09:17:39</n-text>
                        </n-element>
                    </common-element>
                    <common-element element-class="n-chunk n-center" element-width={compile(140)}>
                        <common-reactive label="dasdsa" label-props={{ type: 'success' }} content="11111"></common-reactive>
                    </common-element>
                    <common-element element-class="n-chunk n-center" element-width={compile(100)}>
                        <common-reactive label-none content="11111"></common-reactive>
                    </common-element>
                    <common-element element-class="n-chunk n-center" element-width={compile(100)}>
                        <common-reactive label-none content={props.node.success}></common-reactive>
                    </common-element>
                    <common-element element-width={compile(120)}>4</common-element>
                    <common-element element-width={compile(80)}>5</common-element>
                </n-space>
            </n-card>
        )
    }
})
</script>
