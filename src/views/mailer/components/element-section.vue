<script lang="tsx">
import { defineComponent, ref, onMounted, computed, Fragment, type PropType, type CSSProperties } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useVModels } from '@vueuse/core'
import { NestBlock, type NestOption } from '@/utils/utils-mailer'

export default defineComponent({
    name: 'ElementSection',
    components: { VueDraggable },
    props: {
        maxWidth: { type: Number, default: 640 },
        node: { type: Object as PropType<NestOption>, required: true }
    },
    setup(props, { emit }) {
        const { node } = useVModels(props, emit)
        const element = computed<CSSProperties>(() => ({
            position: 'relative',
            boxSizing: 'border-box',
            fontSize: '0px',
            display: 'flex',
            margin: '0 auto',
            maxWidth: `${props.maxWidth}px`,
            backgroundColor: node.value.attributes.backgroundColor,
            paddingLeft: `${node.value.attributes.paddingLeft ?? 0}px`,
            paddingRight: `${node.value.attributes.paddingRight ?? 0}px`,
            paddingBottom: `${node.value.attributes.paddingBottom ?? 0}px`,
            paddingTop: `${node.value.attributes.paddingTop ?? 0}px`
        }))

        function elementProperter(data: NestOption): CSSProperties {
            return {
                position: 'relative',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                width: data.attributes.width ? `${data.attributes.width}%` : `${100 / node.value.children.length}%`
            }
        }

        return () => (
            <vue-draggable class="mj-section element-section" style={element.value} v-model={node.value.children}>
                {node.value.children.map(item => (
                    <div class="element-component" style={elementProperter(item)} key={item.uid}>
                        {item.tagName === NestBlock.MJ_COLUMN ? <element-column v-model:node={item}></element-column> : null}
                    </div>
                ))}
            </vue-draggable>
        )
    }
})
</script>
