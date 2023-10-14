<script lang="tsx">
import { defineComponent, computed, Fragment, type PropType, type CSSProperties } from 'vue'
import { isEmpty } from 'class-validator'
import { whereProperter } from '@/utils/utils-layout'

export default defineComponent({
    name: 'CommonElement',
    props: {
        elementClass: { type: String, default: '' },
        elementWidth: { type: String, default: '' },
        elementStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) }
    },
    setup(props, { slots }) {
        const whereElement = computed(() => {
            return whereProperter(isEmpty(props.elementWidth), props.elementStyle, {
                ...props.elementStyle,
                width: props.elementWidth
            })
        })

        return () => (
            <n-element class={{ [`common-element ${props.elementClass}`]: true }} style={whereElement.value}>
                <Fragment>{slots.default?.()}</Fragment>
            </n-element>
        )
    }
})
</script>
