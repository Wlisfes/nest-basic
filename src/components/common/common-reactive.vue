<script lang="tsx">
import type { PropType, VNodeChild, CSSProperties } from 'vue'
import type { TooltipProps, TextProps } from 'naive-ui'
import { defineComponent, Fragment, computed } from 'vue'
import { compute } from '@/utils/utils-compute'

export default defineComponent({
    name: 'CommonReactive',
    props: {
        label: { type: [String, Number, Object] as PropType<String | Number | VNodeChild> },
        labelNone: { type: Boolean, default: false },
        labelStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
        labelProps: { type: Object as PropType<TextProps>, default: () => ({}) },
        labelTooltip: { type: [Boolean, Object] as PropType<Boolean | TooltipProps>, default: false },
        content: { type: [String, Number, Object] as PropType<String | Number | VNodeChild> },
        contentNone: { type: Boolean, default: false },
        contentStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
        contentProps: { type: Object as PropType<TextProps>, default: () => ({}) },
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
            <n-element tag="div" class={{ 'common-reactive': true }} style={styleReact.value}>
                {!props.labelNone && (
                    <div class="common-reactive__label" style={{ lineHeight: '24px', order: props.reverse ? 2 : 1 }}>
                        {props.label && typeof props.label === 'object' ? (
                            <Fragment>{props.label}</Fragment>
                        ) : props.label ? (
                            <n-text {...props.labelProps} style={props.labelStyle}>
                                <n-ellipsis tooltip={props.labelTooltip}>{props.label}</n-ellipsis>
                            </n-text>
                        ) : (
                            <span style={{ color: 'var(--text-color-3)', display: 'inline-block' }}>--</span>
                        )}
                    </div>
                )}
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
                                    <n-text class="n-chunk n-center" style={props.contentStyle}>
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
                                    <n-text style={props.contentStyle}>
                                        <n-ellipsis tooltip={props.contentTooltip}>{props.content}</n-ellipsis>
                                    </n-text>
                                )}
                            </Fragment>
                        ) : (
                            <span style={{ color: 'var(--text-color-1)', display: 'inline-block' }}>--</span>
                        )}
                    </div>
                )}
            </n-element>
        )
    }
})
</script>
