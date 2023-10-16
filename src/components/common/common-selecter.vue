<script lang="tsx">
import type { DropdownProps, DropdownOption } from 'naive-ui'
import { defineComponent, computed, watch, type PropType } from 'vue'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'CommonSelecter',
    props: {
        elementLoading: { type: Boolean, default: false },
        elementDisabled: { type: Boolean, default: false },
        elementTitle: { type: String },
        elementStop: { type: Boolean },
        elementSize: { type: Number, default: 22 },
        elementIcon: { type: String, default: 'RadixMore' },
        elementData: { type: Array as PropType<Array<DropdownOption>>, default: () => [] },
        elementProps: { type: Object as PropType<DropdownProps>, default: () => ({}) }
    },
    emits: ['selecter'],
    setup(props, { slots, emit }) {
        const { state, setState } = useState({
            loading: props.elementLoading,
            disabled: props.elementDisabled
        })
        const elementProps = computed(() => ({
            showArrow: true,
            trigger: 'click',
            placement: 'bottom-end',
            options: props.elementData,
            ...props.elementProps
        }))

        watch(
            () => [props.elementDisabled, props.elementLoading],
            () => setState({ disabled: props.elementDisabled, loading: props.elementLoading })
        )

        /**选取类型**/
        function onSelecter(key: string, option: DropdownOption) {
            return emit('selecter', { key, option, loading: state.loading, done: setState })
        }

        return () => (
            <n-dropdown class="common-selecter" {...elementProps.value} on-select={onSelecter}>
                {{
                    default: () => {
                        return slots.default ? (
                            slots.default()
                        ) : (
                            <common-compute
                                element-title={props.elementTitle}
                                element-stop={props.elementStop}
                                element-size={props.elementSize}
                                element-icon={props.elementIcon}
                                element-loading={state.loading}
                                element-disabled={state.loading}
                            ></common-compute>
                        )
                    }
                }}
            </n-dropdown>
        )
    }
})
</script>
