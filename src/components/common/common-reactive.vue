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
        elementStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
        xGap: { type: Number, default: 0 },
        yGap: { type: Number, default: 0 },
        reverse: { type: Boolean, default: false }
    },
    emits: ['copy'],
    setup(props, { emit }) {
        const element = computed<CSSProperties>(() => ({
            fontSize: '14px',
            lineHeight: '24px',
            display: 'flex',
            flexDirection: props.direction,
            rowGap: props.yGap + 'px',
            columnGap: props.xGap + 'px',
            ...props.elementStyle
        }))
        const placeholder = computed<CSSProperties>(() => ({
            width: '30px',
            height: '24px',
            backgroundImage: `linear-gradient(to right, var(--n-text-color) 0%, var(--n-text-color) 50%, transparent 50%)`,
            backgroundSize: '12px 2px',
            backgroundRepeat: 'repeat-x',
            backgroundPosition: 'left center'
        }))
        const labelProps = computed<TextProps>(() => {
            return { depth: 3, ...props.labelProps }
        })
        const contentProps = computed<TextProps>(() => {
            return { depth: 1, ...props.contentProps }
        })
        return () => (
            <n-element tag="div" class={{ 'common-reactive': true }} style={element.value}>
                {!props.labelNone && (
                    <div class="common-reactive__label" style={{ order: props.reverse ? 2 : 1 }}>
                        {props.label && typeof props.label === 'object' ? (
                            <Fragment>{props.label}</Fragment>
                        ) : props.label ? (
                            <n-text {...labelProps.value} style={props.labelStyle}>
                                <n-ellipsis tooltip={props.labelTooltip}>{props.label}</n-ellipsis>
                            </n-text>
                        ) : (
                            <n-text {...labelProps.value} style={props.labelStyle}>
                                <div style={placeholder.value}></div>
                            </n-text>
                        )}
                    </div>
                )}
                {!props.contentNone && (
                    <div class="common-reactive__content" style={{ order: props.reverse ? 1 : 2 }}>
                        {props.content && typeof props.content === 'object' ? (
                            <Fragment>{props.content}</Fragment>
                        ) : props.content ? (
                            <Fragment>
                                {props.copyIcon ? (
                                    <n-text class="n-chunk n-center" {...contentProps.value} style={props.contentStyle}>
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
                                    <n-text {...contentProps.value} style={props.contentStyle}>
                                        <n-ellipsis tooltip={props.contentTooltip}>{props.content}</n-ellipsis>
                                    </n-text>
                                )}
                            </Fragment>
                        ) : (
                            <n-text {...contentProps.value} style={props.contentStyle}>
                                <div style={placeholder.value}></div>
                            </n-text>
                        )}
                    </div>
                )}
            </n-element>
        )
    }
})
</script>
