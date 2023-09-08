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
        const nodeSection = computed<CSSProperties>(() => ({
            direction: 'ltr',
            fontSize: '0px',
            textAlign: 'center',
            border: 'none',
            boxSizing: 'border-box',
            margin: '0 auto',
            maxWidth: `${props.maxWidth}px`,
            paddingLeft: `${node.value.attributes.paddingLeft ?? 0}px`,
            paddingRight: `${node.value.attributes.paddingRight ?? 0}px`,
            paddingBottom: `${node.value.attributes.paddingBottom ?? 0}px`,
            paddingTop: `${node.value.attributes.paddingTop ?? 0}px`
        }))

        return () => (
            <div class="mj-section element-section" style={nodeSection.value}>
                {node.value.children.length === 0 ? (
                    <vue-draggable
                        class="element-section__children"
                        style={{ minHeight: '98px', border: '2px dashed var(--border-color)' }}
                        draggable=".element-component"
                        v-model={node.value.children}
                        group={{ name: 'elements', pull: false, put: ['elements'] }}
                    >
                        <div></div>
                    </vue-draggable>
                ) : (
                    <vue-draggable
                        class="element-section__children"
                        draggable=".element-component"
                        v-model={node.value.children}
                        group={{ name: 'elements', pull: false, put: ['elements'] }}
                    >
                        {node.value.children.map(item => (
                            <div
                                class="element-component"
                                key={item.uid}
                                style={{
                                    display: 'flex',
                                    width: item.attributes.width ? `${item.attributes.width}%` : `${100 / node.value.children.length}%`
                                }}
                            >
                                {item.tagName === NestBlock.MJ_COLUMN ? <element-column v-model:node={item}></element-column> : null}
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
.element-section {
    position: relative;
    &__children {
        display: flex;
    }
}
</style>
