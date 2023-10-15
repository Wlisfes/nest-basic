<script lang="tsx">
import type { PropType, VNodeChild, CSSProperties } from 'vue'
import type { ButtonProps } from 'naive-ui'
import { defineComponent, computed, watch } from 'vue'
import { useState } from '@/hooks/hook-state'
import { compute, type INameUI } from '@/utils/utils-compute'

export default defineComponent({
    name: 'CommonCompute',
    props: {
        elementTitle: { type: String },
        elementStop: { type: Boolean, default: false },
        elementLoading: { type: Boolean, default: false },
        elementDisabled: { type: Boolean, default: false },
        elementClass: { type: String, default: '' },
        elementStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
        elementSize: { type: Number, default: 18 },
        elementIcon: { type: String as PropType<INameUI> },
        elementProps: {
            type: Object as PropType<ButtonProps & { renderIcon?: (e: { loading: boolean; done: Function }) => VNodeChild }>,
            default: () => ({})
        }
    },
    emits: ['click'],
    setup(props, { slots, emit }) {
        const { state, setState } = useState({ loading: props.elementLoading, disabled: props.elementDisabled })
        const elementStyle = computed<CSSProperties>(() => ({
            '--n-icon-size': props.elementSize + 'px',
            ...props.elementStyle
        }))
        const elementProps = computed<ButtonProps>(() => ({
            text: true,
            title: props.elementTitle,
            focusable: false,
            disabled: state.disabled || state.loading,
            ...props.elementProps
        }))

        watch(
            () => [props.elementDisabled, props.elementLoading],
            () => setState({ disabled: props.elementDisabled, loading: props.elementLoading })
        )

        async function onClicker(evt: Event) {
            if (props.elementStop) {
                evt.preventDefault()
                evt.stopPropagation()
            }
            return emit('click', { evt, loading: state.loading, done: setState })
        }

        return () => (
            <n-button
                {...elementProps.value}
                class={{ [`common-compute ${props.elementClass}`]: true }}
                style={elementStyle.value}
                onClick={onClicker}
                v-slots={{
                    icon: () => {
                        return state.loading ? (
                            <n-icon component={compute('RadixSpinWith')} size={props.elementSize}></n-icon>
                        ) : slots.default ? (
                            slots.default({ loading: state.loading, done: setState })
                        ) : props.elementIcon ? (
                            <n-icon component={compute(props.elementIcon)} size={props.elementSize}></n-icon>
                        ) : props.elementProps.renderIcon ? (
                            props.elementProps.renderIcon({ loading: state.loading, done: setState })
                        ) : null
                    }
                }}
            ></n-button>
        )
    }
})
</script>
