<script lang="tsx">
import type { ButtonProps, DropdownOption } from 'naive-ui'
import { defineComponent, computed, type PropType } from 'vue'
import { useColumnter } from '@/hooks/hook-source'
import { useProvider } from '@/hooks/hook-provider'
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
        const { inverted } = useProvider()
        const { state, compile } = useColumnter({ width: 960, column: 6, size: [16, 0] })

        const whereCusable = computed(() => {
            const whereChunk = {
                pending: { type: 'warning', continue: '等待发送', icon: 'RadixMoreSpiner' },
                loading: { type: 'info', continue: '正在发送', icon: 'RadixSpinWith' },
                fulfilled: { type: 'success', continue: '提交成功', icon: 'EnableRound' },
                rejected: { type: 'error', continue: '发送失败', icon: 'CloseRound' },
                closurer: { type: undefined, continue: '手动关闭', icon: 'WarningRound' },
                automatic: { type: 'error', continue: '系统关闭', icon: 'IssueRound' }
            }
            const whereProps: ButtonProps = {
                type: whereChunk[props.node.status as keyof typeof whereChunk].type as never,
                size: 'small',
                secondary: true,
                focusable: false,
                round: true
            }
            return {
                props: whereProps,
                chunk: whereChunk[props.node.status as keyof typeof whereChunk],
                style: whereProperter(
                    props.node.status !== 'closurer',
                    { padding: '0 10px 0 8px' },
                    {
                        padding: '0 10px 0 8px',
                        color: inverted.value ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 1)',
                        backgroundColor: inverted.value ? 'rgba(87, 93, 90, 0.46)' : 'rgba(87, 93, 90, 0.8)'
                    }
                )
            }
        })

        /**操作栏回调事件**/
        function onSelecter(scope: { key: string; done: Function }) {
            console.log(scope)

            scope.done({ loading: true })

            setTimeout(() => scope.done({ loading: false }), 1500)
        }

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
                    <common-element element-class="n-chunk n-center" element-width={compile(140)}>
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
                    <common-element element-class="n-chunk n-center" element-width={compile(100)}>
                        <common-reactive
                            reverse
                            label="失败数"
                            content={`${props.node.failure ?? 0}封`}
                            content-props={{ type: 'error', strong: true }}
                            element-style={{ textAlign: 'left' }}
                        ></common-reactive>
                    </common-element>
                    <common-element element-class="n-chunk n-center" element-width={compile(100)}>
                        <common-reactive
                            reverse
                            label="成功数"
                            content={`${props.node.success ?? 0}封`}
                            content-props={{ type: 'success', strong: true }}
                            element-style={{ textAlign: 'left' }}
                        ></common-reactive>
                    </common-element>
                    <common-element element-class="n-chunk n-center" element-width={compile(120)}>
                        <n-button {...whereCusable.value.props} style={whereCusable.value.style}>
                            {{
                                default: () => whereCusable.value.chunk.continue,
                                icon: () => (
                                    <n-tooltip
                                        trigger="hover"
                                        style={{ maxWidth: '400px' }}
                                        disabled={!props.node.reason}
                                        v-slots={{
                                            trigger: () => sompute(whereCusable.value.chunk.icon as INameUI),
                                            default: () => <span>{props.node.reason}</span>
                                        }}
                                    ></n-tooltip>
                                )
                            }}
                        </n-button>
                    </common-element>
                    <common-element element-class="n-chunk n-center n-end" element-width={compile(80)}>
                        <common-selecter
                            onSelecter={onSelecter}
                            element-props={{
                                size: 'large',
                                options: [
                                    { label: '编辑任务', key: 'update', icon: 'EditLine', type: 'info' },
                                    { label: '重发任务', key: 'resend', icon: 'RadixSpin', type: 'warning' },
                                    { label: '取消任务', key: 'closurer', icon: 'WarningRound', type: 'error' }
                                ],
                                renderIcon: (scope: DropdownOption & { icon: INameUI; type: string }) => (
                                    <common-compute
                                        element-props={{ type: scope.type }}
                                        element-icon={scope.icon}
                                        element-size={20}
                                    ></common-compute>
                                )
                            }}
                        ></common-selecter>
                    </common-element>
                </n-space>
            </n-card>
        )
    }
})
</script>
