<script lang="tsx">
import { defineComponent, ref, onMounted, type PropType } from 'vue'
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

        onMounted(() => {
            window.InlineEditor.create(element.value as HTMLElement, {
                initialData: node.value.content,
                language: 'en',
                placeholder: '请输入',
                toolbar: {
                    shouldNotGroupWhenFull: true
                }
            }).then((ckeditor: any) => {
                ckeditor.model.document.on('change', (e: any) => {
                    node.value.content = ckeditor.getData()
                })

                return (instance.value = ckeditor)
            })
        })

        return () => <div class="mj-text element-text" ref={element} style={{ height: '50px' }}></div>
    }
})
</script>
