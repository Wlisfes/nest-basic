<script lang="tsx">
import { defineComponent, ref, onMounted, computed, type PropType, type CSSProperties } from 'vue'
import { useVModels } from '@vueuse/core'
import * as Mailer from '@/utils/utils-mailer'

export default defineComponent({
    name: 'ElementText',
    props: {
        node: { type: Object as PropType<Mailer.NestOption>, required: true }
    },
    setup(props, { emit }) {
        const { node } = useVModels(props, emit)
        const element = ref<HTMLElement>()
        const instance = ref<any>()
        const elementText = computed<CSSProperties>(() => ({
            boxShadow: 'none',
            boxSizing: 'border-box',
            fontSize: `${node.value.attributes.fontSize ?? 0}px`,
            paddingLeft: `${node.value.attributes.paddingLeft ?? 0}px`,
            paddingRight: `${node.value.attributes.paddingRight ?? 0}px`,
            paddingBottom: `${node.value.attributes.paddingBottom ?? 0}px`,
            paddingTop: `${node.value.attributes.paddingTop ?? 0}px`
        }))

        onMounted(() => {
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

                Mailer.observer.on(Mailer.START_DRAG_EVENT, () => {
                    if (!ckeditor.isReadOnly) {
                        ckeditor.enableReadOnlyMode(node.value.uid.toString())
                    }
                })

                Mailer.observer.on(Mailer.END_DRAG_EVENT, () => {
                    if (ckeditor.isReadOnly) {
                        ckeditor.disableReadOnlyMode(node.value.uid.toString())
                    }
                })

                return (instance.value = ckeditor)
            })
        })

        return () => <div class="mj-text element-text" id={node.value.uid.toString()} ref={element} style={elementText.value}></div>
    }
})
</script>

<style lang="scss" scoped>
.element-text {
    position: relative;
    border-color: transparent;
    transition: border-color 0.2s;
    &.ck-focused {
        border-color: var(--primary-color-hover) !important;
    }
}
</style>
