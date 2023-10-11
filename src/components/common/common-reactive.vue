<script lang="tsx">
import { defineComponent, Fragment, computed, type PropType, type VNodeChild, type CSSProperties } from 'vue'
import { type TooltipProps } from 'naive-ui'
import { compute } from '@/utils/utils-remix'

export default defineComponent({
    name: 'CommonReactive',
    props: {
        label: { type: [String, Number] },
        labelStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
        labelNone: { type: Boolean, default: false },
        labelTooltip: { type: [Boolean, Object] as PropType<Boolean | TooltipProps>, default: false },
        content: { type: [String, Number, Object] as PropType<String | Number | VNodeChild> },
        contentStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
        contentNone: { type: Boolean, default: false },
        contentTooltip: { type: [Boolean, Object] as PropType<Boolean | TooltipProps>, default: false },
        copyIcon: { type: Boolean, default: false },
        direction: { type: String as PropType<CSSProperties['flex-direction']>, default: 'column' },
        xGap: { type: Number, default: 0 },
        yGap: { type: Number, default: 0 },
        reverse: { type: Boolean, default: false }
    },
    emits: ['copy'],
    setup(props, { emit }) {
        const styleReact = computed<CSSProperties>(() => ({
            fontSize: 'var(--font-size)',
            lineHeight: 'var(--height-tiny)',
            display: 'flex',
            flexDirection: props.direction,
            rowGap: props.yGap + 'px',
            columnGap: props.xGap + 'px'
        }))
        return () => (
            <n-el tag="div" class={{ 'common-reactive': true }} style={styleReact.value}>
                <Fragment>
                    {!props.labelNone && (
                        <div
                            class="common-reactive__label"
                            style={{ color: 'var(--text-color-3)', lineHeight: '24px', order: props.reverse ? 2 : 1 }}
                        >
                            {props.label && typeof props.label === 'object' ? (
                                <Fragment>{props.label}</Fragment>
                            ) : props.label ? (
                                <n-text style={{ color: 'var(--text-color-3)' }}>
                                    <n-ellipsis tooltip={props.labelTooltip}>{props.label}</n-ellipsis>
                                </n-text>
                            ) : (
                                <span style={{ display: 'inline-block' }}>--</span>
                            )}
                        </div>
                    )}
                </Fragment>
                <Fragment>
                    {!props.contentNone && (
                        <div
                            class="common-reactive__content"
                            style={{ color: 'var(--text-color-1)', lineHeight: '24px', order: props.reverse ? 1 : 2 }}
                        >
                            {props.content && typeof props.content === 'object' ? (
                                <Fragment>{props.content}</Fragment>
                            ) : props.content ? (
                                <Fragment>
                                    {props.copyIcon ? (
                                        <n-text class="n-chunk n-center" style={{ color: 'var(--text-color-1)' }}>
                                            <n-ellipsis tooltip={props.contentTooltip}>{props.content}</n-ellipsis>
                                            <n-button
                                                text
                                                focusable={false}
                                                style={{ marginLeft: '5px' }}
                                                onClick={(e: Event) => emit('copy', e)}
                                            >
                                                <n-icon component={compute('BoxCopy')} size={18} />
                                            </n-button>
                                        </n-text>
                                    ) : (
                                        <n-text style={{ color: 'var(--text-color-1)' }}>
                                            <n-ellipsis tooltip={props.contentTooltip}>{props.content}</n-ellipsis>
                                        </n-text>
                                    )}
                                </Fragment>
                            ) : (
                                <span style={{ display: 'inline-block' }}>--</span>
                            )}
                        </div>
                    )}
                </Fragment>
            </n-el>
        )
    }
})
</script>
