<script lang="tsx">
import { defineComponent, ref, onMounted, computed, type PropType, type CSSProperties } from 'vue'
import { useVModels } from '@vueuse/core'
import { VueDraggable } from 'vue-draggable-plus'
import { type NestOption } from '@/utils/utils-mailer'

export default defineComponent({
    name: 'ElementImage',
    components: { VueDraggable },
    props: {
        node: { type: Object as PropType<NestOption>, required: true }
    },
    setup(props, { emit }) {
        const { node } = useVModels(props, emit)
        const imageScale = computed<CSSProperties>(() => ({
            textAlign: node.value.attributes.align,
            paddingLeft: `${node.value.attributes.paddingLeft ?? 0}px`,
            paddingRight: `${node.value.attributes.paddingRight ?? 0}px`,
            paddingBottom: `${node.value.attributes.paddingBottom ?? 0}px`,
            paddingTop: `${node.value.attributes.paddingTop ?? 0}px`
        }))
        const imageColumn = computed<CSSProperties>(() => ({
            width: '100%',
            fontSize: '0px',
            outline: 'none',
            display: 'inline-block',
            textDecoration: 'none',
            boxSizing: 'border-box',
            height: 'auto',
            borderRadius: `${node.value.attributes.borderRadius ?? 0}px`
        }))

        return () => (
            <div class="mj-image element-image" style={imageScale.value}>
                <img
                    src={node.value.attributes.src}
                    alt={node.value.attributes.alt}
                    srcset={node.value.attributes.srcset}
                    style={imageColumn.value}
                />
            </div>
        )
    }
})
</script>
