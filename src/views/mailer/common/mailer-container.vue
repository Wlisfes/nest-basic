<script lang="tsx">
import { defineComponent, ref, computed, watch } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { createJsonTransfor, createMjmlTransfor } from '@/utils/utils-mailer'

export default defineComponent({
    name: 'MailerContainer',
    components: { VueDraggable },
    props: {
        maxWidth: { type: Number, default: 640 }
    },
    setup(props) {
        const dataSource = ref([])
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

        console.log(createJsonTransfor(JsonRender.value))

        return () => (
            <n-element class="mailer-container">
                <n-scrollbar>
                    <vue-draggable
                        v-model={dataSource.value}
                        ghostClass="ghost"
                        group="element"
                        animation={150}
                        style={{ flex: 1, margin: '0 auto', width: '100%', maxWidth: props.maxWidth + 'px' }}
                    >
                        {dataSource.value.map((item: any) => {
                            return (
                                <n-card key={item.uid} embedded content-style={{ padding: '10px', textAlign: 'center' }}>
                                    <n-text style={{ fontSize: '16px', marginTop: '0', display: 'block' }}>{item.tagName}</n-text>
                                </n-card>
                            )
                        })}
                    </vue-draggable>
                </n-scrollbar>
                <n-scrollbar>
                    <div v-html={createMjmlTransfor(createJsonTransfor(JsonRender.value)).html}></div>
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
