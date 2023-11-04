<script lang="tsx">
import { defineComponent, ref, onMounted, Fragment, type PropType } from 'vue'
import { useVModels } from '@vueuse/core'
import { NestBlock, type NestOption } from '@/utils/utils-mailer'

export default defineComponent({
    name: 'ElementComponent',
    props: {
        node: { type: Object as PropType<NestOption>, required: true }
    },
    setup(props, { emit }) {
        const { node } = useVModels(props, emit)

        // console.log(node.value)

        return () => {
            if (node.value.tagName === NestBlock.MJ_SECTION) {
                /**块组件**/
                return <element-section key={node.value.uid} v-model:node={node.value}></element-section>
            } else if (node.value.tagName === NestBlock.MJ_COLUMN) {
                /**列组件**/
                return <element-column key={node.value.uid} v-model:node={node.value}></element-column>
            } else if (node.value.tagName === NestBlock.MJ_TEXT) {
                /**文本组件**/
                return <element-text key={node.value.uid} v-model:node={node.value}></element-text>
            } else if (node.value.tagName === NestBlock.MJ_BUTTON) {
                /**按钮组件**/
                return <element-button key={node.value.uid} v-model:node={node.value}></element-button>
            } else if (node.value.tagName === NestBlock.MJ_IMAGE) {
                /**图片组件**/
                return <element-image key={node.value.uid} v-model:node={node.value}></element-image>
            }

            return <div>111</div>
        }
    }
})
</script>
