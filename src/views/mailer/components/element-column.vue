<script lang="tsx">
import { defineComponent, ref, computed, Fragment, onMounted, type PropType, type CSSProperties } from 'vue'
import { useVModels } from '@vueuse/core'
import { VueDraggable } from 'vue-draggable-plus'
import { compute } from '@/utils/utils-remix'
import { type NestOption } from '@/utils/utils-mailer'

export default defineComponent({
    name: 'ElementColumn',
    components: { VueDraggable },
    props: {
        node: { type: Object as PropType<NestOption>, required: true }
    },
    setup(props, { emit }) {
        const { node } = useVModels(props, emit)
        const elementColumn = computed<CSSProperties>(() => ({
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
                <vue-draggable
                    class="element-column__draggable"
                    v-model={node.value.children}
                    ghostClass="ghost"
                    group="element"
                    animation={150}
                >
                    {node.value.children.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '20px 10px 10px' }}>
                            <n-icon size={100} depth={3} color="var(--text-color-2)" component={compute('BasicContent')} />
                            <n-text style={{ fontSize: '16px', color: 'var(--text-color-3)', display: 'block' }}>
                                Drop Content block here
                            </n-text>
                        </div>
                    )}
                    {node.value.children.map(item => (
                        <element-component key={item.uid} v-model:node={item}></element-component>
                    ))}
                </vue-draggable>
            </div>
        )
    }
})
</script>
