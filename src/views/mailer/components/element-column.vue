<script lang="tsx">
import { defineComponent, ref, computed, Fragment, onMounted, type PropType, type CSSProperties } from 'vue'
import { useVModels } from '@vueuse/core'
import { VueDraggable } from 'vue-draggable-plus'
import { compute } from '@/utils/utils-remix'
import { type NestOption, NestBlock } from '@/utils/utils-mailer'

export default defineComponent({
    name: 'ElementColumn',
    components: { VueDraggable },
    props: {
        node: { type: Object as PropType<NestOption>, required: true }
    },
    setup(props, { emit }) {
        const { node } = useVModels(props, emit)
        const elementColumn = computed<CSSProperties>(() => ({
            width: '100%',
            fontSize: '0px',
            textAlign: 'left',
            direction: 'ltr',
            display: 'inline-block',
            verticalAlign: 'top',
            boxSizing: 'border-box',
            paddingLeft: `${node.value.attributes.paddingLeft ?? 0}px`,
            paddingRight: `${node.value.attributes.paddingRight ?? 0}px`,
            paddingBottom: `${node.value.attributes.paddingBottom ?? 0}px`,
            paddingTop: `${node.value.attributes.paddingTop ?? 0}px`
        }))

        return () => (
            <div class="mj-column element-column" style={elementColumn.value}>
                {node.value.children.length === 0 ? (
                    <vue-draggable
                        class="element-column__children"
                        style={{ height: '98px', border: '2px dashed #e0e0e6' }}
                        draggable=".element-component"
                        v-model={node.value.children}
                        group={{ name: 'elements', pull: false, put: ['elements'] }}
                    >
                        <div></div>
                    </vue-draggable>
                ) : (
                    <vue-draggable
                        class="element-column__children"
                        draggable=".element-component"
                        v-model={node.value.children}
                        group={{ name: 'elements', pull: false, put: ['elements'] }}
                    >
                        {node.value.children.map(item => (
                            <div key={item.uid} class="element-component">
                                {item.tagName === NestBlock.MJ_TEXT ? <element-text v-model:node={item}></element-text> : null}
                            </div>
                        ))}
                    </vue-draggable>
                )}
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.element-column {
    position: relative;
}
</style>
