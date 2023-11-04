<script lang="tsx">
import { defineComponent, computed, type PropType, type CSSProperties } from 'vue'
import { useVModels } from '@vueuse/core'
import { type NestOption } from '@/utils/utils-mailer'

export default defineComponent({
    name: 'ElementButton',
    props: {
        node: { type: Object as PropType<NestOption>, required: true }
    },
    setup(props, { emit }) {
        const { node } = useVModels(props, emit)
        const buttonColumn = computed<CSSProperties>(() => ({
            textAlign: node.value.attributes.align,
            paddingLeft: `${node.value.attributes.paddingLeft ?? 0}px`,
            paddingRight: `${node.value.attributes.paddingRight ?? 0}px`,
            paddingBottom: `${node.value.attributes.paddingBottom ?? 0}px`,
            paddingTop: `${node.value.attributes.paddingTop ?? 0}px`
        }))
        const buttonColumnText = computed<CSSProperties>(() => ({
            wordBreak: 'break-word',
            boxSizing: 'border-box',
            outline: 'none',
            border: 'none',
            display: 'inline-block',
            fontSize: `${node.value.attributes.fontSize ?? 0}px`,
            lineHeight: node.value.attributes.lineHeight,
            color: node.value.attributes.color,
            fontWeight: node.value.attributes.fontWeight,
            backgroundColor: node.value.attributes.backgroundColor,
            padding: node.value.attributes.innerPadding,
            borderRadius: `${node.value.attributes.borderRadius ?? 0}px`
        }))

        return () => (
            <div class="mj-button element-button" style={buttonColumn.value}>
                <a style={buttonColumnText.value} contenteditable>
                    {node.value.content}
                </a>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.element-button {
    position: relative;
    overflow: hidden;
}
</style>
