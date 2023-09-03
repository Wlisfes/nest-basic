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
            textAlign: 'center',
            padding: '20px 0px',
            fontSize: '0px',
            direction: 'ltr',
            border: 'none'
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
