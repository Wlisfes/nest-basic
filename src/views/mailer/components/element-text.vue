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
            backgroundColor: 'antiquewhite',
            boxSizing: 'border-box',
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
