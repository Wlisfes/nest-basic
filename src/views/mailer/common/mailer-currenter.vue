<script lang="tsx">
import { defineComponent, ref, computed, onMounted, watch } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { type NestOption, createMjmlTransfor, createJsonTransfor, createJsonCameTransfor } from '@/utils/utils-mailer'

export default defineComponent({
    name: 'MailerCurrenter',
    components: { VueDraggable },
    props: {
        maxWidth: { type: Number, default: 640 }
    },
    setup(props) {
        const content = ref<string>('')
        const html = ref<string>('')
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
            const node = createMjmlTransfor(`
                <mjml>
                    <mj-head>
                        <mj-style inline="inline">
                            .blue-text div {
                                color: blue !important;
                            }
                        </mj-style>
                    </mj-head>
                    <mj-body border="1px solid #ff0000">
                        <mj-section background-color="#f0f0f0">
                            <mj-column>
                                <mj-text font-style="italic" font-size="20px" color="#626262">Column1</mj-text>
                            </mj-column>
                            <mj-column>
                                <mj-text font-style="italic" font-size="20px" color="#626262">Column2</mj-text>
                            </mj-column>
                        </mj-section>
                        <mj-section background-color="#f0f0f0">
                            <mj-column>
                                <mj-image width="100%" src="https://www.online-image-editor.com//styles/2014/images/example_image.png" />
                            </mj-column>
                        </mj-section>
                        <mj-section background-color="#f0f0f0">
                            <mj-column>
                                <mj-button inner-padding="20px 30px">
                                    Get Your Order Here
                                </mj-button>
                                <mj-button>
                                    Get Your Order Here
                                </mj-button>
                            </mj-column>
                        </mj-section>
                        <mj-section background-color="#f0f0f0">
                            <mj-column>
                                <mj-button padding-bottom="10px" padding-left="10px" padding-right="10px" padding-top="10px">
                                    Get Your Order Here
                                </mj-button>
                            </mj-column>
                            <mj-column>
                                <mj-button
                                    align="center"
                                    background-color="#f3a333"
                                    color="#ffffff"
                                    font-weight="normal"
                                    border-radius="30px"
                                    line-height="1.6"
                                    target="_blank"
                                    vertical-align="middle"
                                    border="none"
                                    text-align="center"
                                    href="#"
                                    font-size="13px"
                                    padding="10px 25px 10px 25px"
                                >
                                    Get Your Order Here
                                </mj-button>
                            </mj-column>
                        </mj-section>
                    </mj-body>
                </mjml>
            `)
            console.log(node.json)
            html.value = node.html
        })

        watch(
            () => JsonRender.value,
            () => {
                const json = createJsonCameTransfor(JSON.parse(JSON.stringify(JsonRender.value)))
                const mjml = createJsonTransfor(json)
                const html = createMjmlTransfor(mjml).html

                // console.log(json)
                console.log(mjml)
                content.value = html
            },
            { immediate: true, deep: true }
        )

        return () => (
            <n-element style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                <mailer-browser></mailer-browser>
                <n-element class="mailer-currenter">
                    <n-scrollbar>
                        <vue-draggable
                            class="context-draggable"
                            style={{ maxWidth: props.maxWidth + 'px' }}
                            v-model={dataSource.value}
                            ghostClass="ghost"
                            group="element"
                            animation={150}
                        >
                            {dataSource.value.map(item => (
                                <element-component key={item.uid} v-model:node={item}></element-component>
                            ))}
                        </vue-draggable>
                    </n-scrollbar>
                    <n-scrollbar>
                        <div v-html={html.value}></div>
                        <div v-html={content.value}></div>
                    </n-scrollbar>
                </n-element>
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.mailer-currenter {
    position: relative;
    display: flex;
    flex: 1;
    overflow: hidden;
    .context-draggable {
        flex: 1;
        margin: 0 auto;
        width: 100%;
        background-color: var(--card-color);
    }
}
</style>
