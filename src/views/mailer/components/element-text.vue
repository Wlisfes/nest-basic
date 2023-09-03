<script lang="tsx">
import { defineComponent, ref, computed, watch, onMounted, type PropType } from 'vue'
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
        // const instance = ref<InlineEditor>()

        onMounted(() => {
            ;(window as any).InlineEditor.create(element.value as HTMLElement, {
                initialData: node.value.content,
                language: 'en',
                placeholder: '请输入',
                toolbar: {
                    shouldNotGroupWhenFull: true
                    // items: [
                    //     'heading',
                    //     '|',
                    //     'fontFamily',
                    //     'fontSize',
                    //     'fontColor',
                    //     'fontBackgroundColor',
                    //     'alignment',
                    //     'indent',
                    //     'outdent',
                    //     '|',
                    //     'bold',
                    //     'italic',
                    //     'link',
                    //     'underline',
                    //     'strikethrough',
                    //     'horizontalLine',
                    //     'bulletedList',
                    //     'numberedList',
                    //     'selectAll',
                    //     '|',
                    //     'undo',
                    //     'redo'
                    // ]
                }
            }).then((ckeditor: any) => {
                ckeditor.model.document.on('change', (e: any) => {
                    node.value.content = ckeditor.getData()
                })
            })
        })

        return () => <div class="element-text" ref={element}></div>
    }
})
</script>

<style lang="scss" scoped></style>
