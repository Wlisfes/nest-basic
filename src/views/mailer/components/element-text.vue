<script lang="tsx">
import { defineComponent, ref, computed, watch, onMounted, type PropType } from 'vue'
import { useVModels } from '@vueuse/core'
import { type NestOption } from '@/utils/utils-mailer'
// import InlineEditor from '@ckeditor/ckeditor5-editor-inline'

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
            // InlineEditor.create(element.value as HTMLElement, {
            //     // initialData: node.value.content,
            //     language: 'zh',
            //     placeholder: '请输入'
            // }).then(ckeditor => {
            //     ckeditor.model.document.on('change', e => {
            //         node.value.content = ckeditor.getData()
            //     })
            //     return (instance.value = ckeditor)
            // })
        })

        return () => <div>1111111111</div>
    }
})
</script>
