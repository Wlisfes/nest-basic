<script lang="tsx">
import { defineComponent, computed, type PropType, type CSSProperties } from 'vue'
import { useColumnter } from '@/hooks/hook-source'
import { compute, sompute, type INameUI } from '@/utils/utils-compute'
import { whereProperter } from '@/utils/utils-layout'
import type { MailerSchedule } from '@/interface/mailer.resolver'

export default defineComponent({
    name: 'MailerSchedule',
    props: {
        node: { type: Object as PropType<MailerSchedule>, required: true },
        mobile: { type: Boolean, default: false }
    },
    setup(props, { slots }) {
        const { state, compile } = useColumnter({ width: 960, column: 6, size: [16, 0] })

        const whereCusable = computed(() => {
            const whereChunk = {
                pending: { type: 'warning', continue: '等待发送', icon: 'RadixMoreSpiner' },
                loading: { type: 'info', continue: '正在发送', icon: 'RadixSpinWith' },
                fulfilled: { type: 'success', continue: '提交成功', icon: 'EnableRound' },
                rejected: { type: 'error', continue: '发送失败', icon: 'CloseRound' },
                closurer: { type: 'default', continue: '手动关闭', icon: 'WarningRound' },
                automatic: { type: 'error', continue: '系统关闭', icon: 'IssueRound' }
            }
            const whereProps = {
                type: whereChunk[props.node.status as keyof typeof whereChunk].type,
                size: 'small',
                secondary: true,
                focusable: false,
                round: true
            }
            const whereStyle = whereProperter(
                props.node.status === 'closurer',
                { padding: '0 10px 0 8px', color: 'rgba(255, 255, 255, 0.82)', backgroundColor: 'rgba(87, 93, 90, 1)' },
                { padding: '0 10px 0 8px' }
            )
            return {
                props: whereProps,
                style: whereStyle,
                chunk: whereChunk[props.node.status as keyof typeof whereChunk]
            }
        })

        return () => (
            <n-card class="mailer-schedule" content-style={{ padding: '20px 20px' }}>
                <n-space size={state.size} wrap-item={false}>
                    <common-element element-class="n-chunk n-center" element-style={{ flex: 1, columnGap: '10px', overflow: 'hidden' }}>
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
                        <common-reactive
                            reverse
                            element-style={{ flex: 1, overflow: 'hidden' }}
                            label="创建于 2023-09-07 09:17:39"
                            content={
                                <n-h3 style={{ margin: 0, lineHeight: '28px' }}>
                                    <n-ellipsis style="max-width: 240px">{props.node.name}</n-ellipsis>
                                </n-h3>
                            }
                        ></common-reactive>
                    </common-element>
                    {/* <common-element element-class="n-chunk n-center" element-width={compile(80)}>
                        <common-reactive
                            reverse
                            label="模板"
                            content={`${props.node.failure ?? 0}封`}
                            content-props={{ type: 'error', strong: true }}
                            element-style={{ textAlign: 'left' }}
                        ></common-reactive>
                    </common-element> */}
                    <common-element element-class="n-chunk n-center" element-width={compile(120)}>
                        <common-reactive
                            label={
                                <n-tag size="small" bordered={false} style={{ height: '20px' }}>
                                    <n-text>{props.node.submit}</n-text>
                                    <n-text depth={3}>/</n-text>
                                    <n-text depth={3}>{props.node.total}</n-text>
                                </n-tag>
                            }
                            content={
                                <n-progress
                                    type="line"
                                    status="success"
                                    style={{ width: '100px', marginTop: '6px' }}
                                    show-indicator={false}
                                    height={6}
                                    stroke-width={2}
                                    percentage={props.node.progress}
                                />
                            }
                        ></common-reactive>
                    </common-element>
                    <common-element element-class="n-chunk n-center" element-width={compile(80)}>
                        <common-reactive
                            reverse
                            label="失败数"
                            content={`${props.node.failure ?? 0}封`}
                            content-props={{ type: 'error', strong: true }}
                            element-style={{ textAlign: 'left' }}
                        ></common-reactive>
                    </common-element>
                    <common-element element-class="n-chunk n-center" element-width={compile(80)}>
                        <common-reactive
                            reverse
                            label="成功数"
                            content={`${props.node.success ?? 0}封`}
                            content-props={{ type: 'success', strong: true }}
                            element-style={{ textAlign: 'left' }}
                        ></common-reactive>
                    </common-element>
                    <common-element element-class="n-chunk n-center" element-width={compile(100)}>
                        <n-button {...whereCusable.value.props} style={whereCusable.value.style}>
                            {{
                                icon: () => sompute(whereCusable.value.chunk.icon as INameUI),
                                default: () => whereCusable.value.chunk.continue
                            }}
                        </n-button>
                    </common-element>
                    <common-element element-width={compile(80)}>5</common-element>
                </n-space>
            </n-card>
        )
    }
})
</script>
