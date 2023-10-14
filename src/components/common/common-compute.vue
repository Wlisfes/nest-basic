<script lang="tsx">
import type { PropType, Component, CSSProperties } from 'vue'
import type { ButtonProps } from 'naive-ui'
import { defineComponent, computed, createVNode } from 'vue'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'CommonCompute',
    props: {
        title: { type: String },
        stop: { type: Boolean, default: false },
        elementProps: { type: Object as PropType<ButtonProps>, default: () => ({}) }
    },
    emits: ['trigger'],
    setup(props, { slots, emit }) {
        const { state, setState } = useState({ loading: false })

        const onTrigger = (event: Event) => {
            if (props.stop) {
                event.preventDefault()
                event.stopPropagation()
            }
            emit('trigger', {
                event,
                loading: state.loading,
                done: async (value: boolean) => await setState({ loading: value })
            })
        }

        return () => (
            <n-button
                class={{ 'common-compute': true }}
                quaternary
                size="small"
                title={props.title}
                disabled={state.loading}
                onClick={onTrigger}
            >
                111
            </n-button>
        )
    }
})
</script>

<style lang="scss" scoped>
.n-button.common-compute {
    position: relative;
}
</style>
