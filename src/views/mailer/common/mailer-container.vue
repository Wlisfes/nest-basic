<script lang="tsx">
import { defineComponent, ref, computed, watch, onMounted } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import {
    createJsonTransfor,
    createMjmlTransfor,
    createJsonCameTransfor,
    createStyleCameTransfor,
    type NestOption
} from '@/utils/utils-mailer'

export default defineComponent({
    name: 'MailerContainer',
    components: { VueDraggable },
    props: {
        maxWidth: { type: Number, default: 840 }
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
                    </mj-body>
                </mjml>
            `)
            console.log(node.json)
            console.log(node.html)
        })

        watch(
            () => JsonRender.value,
            () => {
                const json = createJsonCameTransfor(JSON.parse(JSON.stringify(JsonRender.value)))
                const mjml = createJsonTransfor(json)
                const html = createMjmlTransfor(mjml).html
                content.value = html
                // console.log(json)
                // console.log(mjml)
            },
            { immediate: true, deep: true }
        )

        return () => (
            <n-element class="mailer-container">
                <n-scrollbar>
                    <vue-draggable
                        class="mailer-container__draggable"
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
                {/* <n-scrollbar>
                    <div v-html={content.value}></div>
                </n-scrollbar> */}
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
    &__draggable {
        flex: 1;
        margin: 0 auto;
        width: 100%;
        background-color: var(--card-color);
    }
}
</style>
