<script lang="tsx">
import { defineComponent } from 'vue'
import { useVModels } from '@vueuse/core'
import { isEmpty } from 'class-validator'

export default defineComponent({
    name: 'CommonCollapse',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        appear: {
            type: Boolean
        }
    },
    setup(props, { slots, emit }) {
        const { visible, appear } = useVModels(props, emit)

        function onUpdate(option: { visible?: boolean; appear?: boolean }) {
            if (!isEmpty(option.visible)) {
                visible.value = option.visible as boolean
            }
            if (!isEmpty(option.appear)) {
                appear.value = option.appear as boolean
            }
        }

        return () => (
            <n-collapse-transition appear={appear.value} show={visible.value}>
                {{ default: slots.default?.({ visible, appear, onUpdate }) }}
            </n-collapse-transition>
        )
    }
})
</script>
