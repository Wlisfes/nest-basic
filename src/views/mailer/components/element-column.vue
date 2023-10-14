<script lang="tsx">
import { defineComponent, ref, computed, Fragment, onMounted, type PropType, type CSSProperties } from 'vue'
import { useVModels } from '@vueuse/core'
import { VueDraggable } from 'vue-draggable-plus'
import { compute } from '@/utils/utils-compute'
import { whereProperter } from '@/utils/utils-layout'
import { type NestOption, NestBlock } from '@/utils/utils-mailer'

export default defineComponent({
    name: 'ElementColumn',
    components: { VueDraggable },
    props: {
        node: { type: Object as PropType<NestOption>, required: true }
    },
    setup(props, { emit }) {
        const { node } = useVModels(props, emit)
        const element = computed<CSSProperties>(() => ({
            position: 'relative',
            width: '100%',
            fontSize: '0px',
            boxSizing: 'border-box',
            flex: 1,
            paddingLeft: `${node.value.attributes.paddingLeft ?? 0}px`,
            paddingRight: `${node.value.attributes.paddingRight ?? 0}px`,
            paddingBottom: `${node.value.attributes.paddingBottom ?? 0}px`,
            paddingTop: `${node.value.attributes.paddingTop ?? 0}px`
        }))

        //prettier-ignore
        function elementProperter(data: NestOption): CSSProperties {
            return whereProperter(data.children.length === 0, {
                    height: '98px',
                    border: '2px dashed #e0e0e6'
                }, {
                    height: '100%'
                }
            )
        }

        return () => (
            <div class="mj-column element-column" style={element.value}>
                <vue-draggable
                    class="component-currenter"
                    style={elementProperter(node.value)}
                    v-model={node.value.children}
                    group={{ name: 'elements', pull: false, put: ['elements'] }}
                >
                    {node.value.children.map(item => (
                        <div key={item.uid} class="element-component">
                            {item.tagName === NestBlock.MJ_TEXT ? (
                                <element-text v-model:node={item}></element-text>
                            ) : item.tagName === NestBlock.MJ_BUTTON ? (
                                <element-button v-model:node={item}></element-button>
                            ) : item.tagName === NestBlock.MJ_IMAGE ? (
                                <element-image v-model:node={item}></element-image>
                            ) : null}
                        </div>
                    ))}
                </vue-draggable>
            </div>
        )
    }
})
</script>
