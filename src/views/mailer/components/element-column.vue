<script lang="tsx">
import { defineComponent, ref, computed, Fragment, onMounted, type PropType, type CSSProperties } from 'vue'
import { useVModels } from '@vueuse/core'
import { type NestOption } from '@/utils/utils-mailer'

export default defineComponent({
    name: 'ElementColumn',
    props: {
        node: { type: Object as PropType<NestOption>, required: true }
    },
    setup(props, { emit, slots }) {
        const { node } = useVModels(props, emit)
        const elementColumn = computed<CSSProperties>(() => ({
            fontSize: '0px',
            textAlign: 'left',
            direction: 'ltr',
            display: 'inline-block',
            verticalAlign: 'top',
            backgroundColor: 'yellowgreen',
            boxSizing: 'border-box',
            paddingLeft: `${node.value.attributes.paddingLeft ?? 0}px`,
            paddingRight: `${node.value.attributes.paddingRight ?? 0}px`,
            paddingBottom: `${node.value.attributes.paddingBottom ?? 0}px`,
            paddingTop: `${node.value.attributes.paddingTop ?? 0}px`
        }))

        return () => (
            <div class="mj-column element-column" style={elementColumn.value}>
                {node.value.children && node.value.children.length > 0 && (
                    <Fragment>
                        {node.value.children.map(item => (
                            <element-component key={item.uid} v-model:node={item}></element-component>
                        ))}
                    </Fragment>
                )}
            </div>
        )
    }
})
</script>
