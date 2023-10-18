<script lang="tsx">
import type { PropType, CSSProperties, VNodeChild } from 'vue'
import { defineComponent, computed, Fragment } from 'vue'
import { isEmpty } from 'class-validator'
import { whereProperter } from '@/utils/utils-layout'

export default defineComponent({
    name: 'CommonElement',
    props: {
        elementClass: { type: String, default: '' },
        elementWidth: { type: String, default: '' },
        elementContent: { type: [String, Object] as PropType<string | VNodeChild> },
        elementStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) }
    },
    setup(props, { slots }) {
        const whereElement = computed(() => {
            return whereProperter(isEmpty(props.elementWidth), props.elementStyle, {
                boxSizing: 'border-box',
                overflow: 'hidden',
                ...props.elementStyle,
                width: props.elementWidth
            })
        })

        return () => (
            <n-element class={{ [`common-element ${props.elementClass}`]: true }} style={whereElement.value}>
                <Fragment>{slots.default ? slots.default() : props.elementContent}</Fragment>
            </n-element>
        )
    }
})
</script>
