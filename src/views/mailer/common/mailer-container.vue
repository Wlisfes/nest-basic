<script lang="tsx">
import { defineComponent, ref, computed, watch, onMounted } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { createJsonTransfor, createMjmlTransfor, type NestOption } from '@/utils/utils-mailer'

export default defineComponent({
    name: 'MailerContainer',
    components: { VueDraggable },
    props: {
        maxWidth: { type: Number, default: 640 }
    },
    setup(props) {
        const content = ref<string>('')
        const dataSource = ref<Array<NestOption>>([])
        const JsonRender = computed(() => ({
            tagName: 'mjml',
            attributes: {},
            children: [
                {
                    tagName: 'mj-body',
                    attributes: {},
                    children: dataSource.value
                }
            ]
        }))

        onMounted(() => {
            // const html = createMjmlTransfor(`
            //     <mjml>
            //         <mj-body border="1px solid #ff0000">
            //             <mj-section background-color="#f0f0f0">
            //                 <mj-column>
            //                     <mj-text font-style="italic" font-size="20px" color="#626262">Column1</mj-text>
            //                 </mj-column>
            //                 <mj-column>
            //                     <mj-text font-style="italic" font-size="20px" color="#626262">Column2</mj-text>
            //                 </mj-column>
            //             </mj-section>
            //         </mj-body>
            //     </mjml>
            // `).html
            // content.value = html
            // console.log(html)
        })

        watch(
            () => JsonRender.value,
            () => {
                content.value = createMjmlTransfor(createJsonTransfor(JsonRender.value)).html
            },
            { immediate: true, deep: true }
        )

        return () => (
            <n-element class="mailer-container">
                <n-scrollbar>
                    <vue-draggable
                        v-model={dataSource.value}
                        ghostClass="ghost"
                        group="element"
                        animation={150}
                        style={{
                            flex: 1,
                            margin: '0 auto',
                            width: '100%',
                            maxWidth: props.maxWidth + 'px',
                            backgroundColor: 'var(--card-color)'
                        }}
                    >
                        {dataSource.value.map(item => (
                            <element-component key={item.uid} v-model:node={item}></element-component>
                        ))}
                    </vue-draggable>
                </n-scrollbar>
                <n-scrollbar>
                    <div v-html={content.value}></div>
                </n-scrollbar>
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.mailer-container {
    position: relative;
    display: flex;
    flex: 1;
}
</style>
