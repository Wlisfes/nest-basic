<script lang="tsx">
import { defineComponent, ref, onMounted, computed, type PropType, type CSSProperties } from 'vue'
import { useVModels } from '@vueuse/core'
import { type NestOption } from '@/utils/utils-mailer'

export default defineComponent({
    name: 'ElementText',
    props: {
        node: { type: Object as PropType<NestOption>, required: true }
    },
    setup(props, { emit }) {
        const { node } = useVModels(props, emit)
        const element = ref<HTMLElement>()
        const instance = ref<typeof window.InlineEditor>()
        const elementText = computed<CSSProperties>(() => ({
            boxSizing: 'border-box',
            border: 'none',
            fontSize: `${node.value.attributes.fontSize ?? 0}px`,
            paddingLeft: `${node.value.attributes.paddingLeft ?? 0}px`,
            paddingRight: `${node.value.attributes.paddingRight ?? 0}px`,
            paddingBottom: `${node.value.attributes.paddingBottom ?? 0}px`,
            paddingTop: `${node.value.attributes.paddingTop ?? 0}px`
        }))

        onMounted(() => {
            // console.log(node.value)

            window.InlineEditor.create(
                element.value as HTMLElement,
                {
                    initialData: node.value.content,
                    language: 'zh-cn',
                    placeholder: '请输入',
                    toolbar: {
                        shouldNotGroupWhenFull: true
                    },
                    fontSize: {
                        options: [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36]
                    },
                    lineHeight: {
                        options: [1, 1.3, 1.5, 1.7, 2, 2.5]
                    }
                } as never
            ).then((ckeditor: any) => {
                ckeditor.model.document.on('change', (e: any) => {
                    node.value.content = ckeditor.getData()
                })

                return (instance.value = ckeditor)
            })
        })

        return () => <div class="mj-text element-text" ref={element} style={elementText.value}></div>
    }
})
</script>

<style lang="scss" scoped>
.element-text {
    position: relative;
    transition: box-shadow 200ms;
    &.ck-focused {
        box-shadow: 0 0 0 2px var(--primary-color-hover) !important;
    }
    :deep(p) {
        margin-top: 13px;
        margin-bottom: 13px;
    }
}
</style>
