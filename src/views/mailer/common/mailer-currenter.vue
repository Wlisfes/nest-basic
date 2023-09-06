<script lang="tsx">
import { defineComponent, ref, computed, onMounted, watch } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { compute } from '@/utils/utils-remix'
import * as mailer from '@/utils/utils-mailer'

export default defineComponent({
    name: 'MailerCurrenter',
    components: { VueDraggable },
    props: {
        maxWidth: { type: Number, default: 640 }
    },
    setup(props) {
        // const observer = ref(mailer.observer)
        const content = ref<string>('')
        const execute = ref<boolean>(false)
        const current = ref<mailer.NestBlocks>()
        const dataBlocks = ref(mailer.nestBlocks)
        const dataSource = ref<Array<mailer.NestOption>>([])
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
            const node = mailer.createMjmlTransfor(`
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
                                <mj-button>
                                    Get Your Order Here
                                </mj-button>
                                <mj-button>
                                    Get Your Order Here
                                </mj-button>
                            </mj-column>
                        </mj-section>
                        <mj-section background-color="#f0f0f0">
                            <mj-column>
                                <mj-button>
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
            content.value = node.html
        })

        watch(
            () => JsonRender.value,
            () => {
                const json = mailer.createJsonCameTransfor(JSON.parse(JSON.stringify(JsonRender.value)))
                const mjml = mailer.createJsonTransfor(json)
                const html = mailer.createMjmlTransfor(mjml).html

                // console.log(json)
                // console.log(mjml)
            },
            { immediate: true, deep: true }
        )

        function clone(data: mailer.NestBlocks) {
            current.value = data
            if (data.component === mailer.NestBlock.MJ_COLUMN) {
                const COUNT_COLUMN = { BasicColumn: 1, BasicDouble: 2, BasicThree: 3 }
                const children = Array.from({ length: COUNT_COLUMN[data.icon as keyof typeof COUNT_COLUMN] }).map(item => {
                    return mailer.createColumnComponent()
                })
                return mailer.createSectionComponent(children)
            } else if (data.component === mailer.NestBlock.MJ_TEXT) {
                return mailer.createTextComponent('<p>Holle</b>')
            } else if (data.component === mailer.NestBlock.MJ_BUTTON) {
                return mailer.createButtonComponent('Get Your Order Here')
            } else if (data.component === mailer.NestBlock.MJ_IMAGE) {
                return mailer.createImageComponent({})
            } else if (data.component === mailer.NestBlock.MJ_DIVIDER) {
                return mailer.createDividerComponent({})
            } else if (data.component === mailer.NestBlock.MJ_SOCIAL) {
                return mailer.createSocialComponent({})
            } else if (data.component === mailer.NestBlock.MJ_NAVBAR) {
                return mailer.createNavbarComponent({})
            } else if (data.component === mailer.NestBlock.MJ_HERO) {
                return mailer.createHeroComponent({})
            } else if (data.component === mailer.NestBlock.MJ_WRAPPER) {
                return mailer.createWrapperComponent({})
            }
        }

        function onStart() {
            return mailer.observer.emit(mailer.START_DRAG_EVENT)
        }

        function onEnd() {
            return mailer.observer.emit(mailer.END_DRAG_EVENT)
        }

        function onMove(e: any) {
            if (!current.value) {
                return false
            } else if (current.value.component === mailer.NestBlock.MJ_COLUMN) {
                if (e.to.classList.contains('context-draggable')) {
                    return true
                }
                return false
            } else if (current.value.component === mailer.NestBlock.MJ_TEXT) {
                if (e.to.classList.contains('element-column__draggable')) {
                    return true
                }
                return false
            } else if (current.value.component === mailer.NestBlock.MJ_BUTTON) {
                if (e.to.classList.contains('element-column__draggable')) {
                    return true
                }
                return false
            }

            return true
        }

        return () => (
            <n-element class="mailer-currenter" style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                <n-element class="current-sidebar">
                    <n-scrollbar>
                        <vue-draggable
                            class="sidebar-draggable"
                            v-model={dataBlocks.value}
                            animation={150}
                            sort={false}
                            group={{ name: 'element', pull: 'clone', put: false }}
                            clone={clone}
                            onMove={onMove}
                            onStart={onStart}
                            onEnd={onEnd}
                        >
                            {dataBlocks.value.map(item => (
                                <n-card key={item.uid} embedded content-style={{ padding: '10px', textAlign: 'center' }}>
                                    <n-icon component={compute(item.icon)} size={68} />
                                    <n-text style={{ fontSize: '16px', marginTop: '0', display: 'block' }}>{item.name}</n-text>
                                </n-card>
                            ))}
                        </vue-draggable>
                    </n-scrollbar>
                </n-element>
                <n-element class="current-context">
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
                                <element-component key={item.uid} v-model:node={item} execute={execute.value}></element-component>
                            ))}
                        </vue-draggable>
                    </n-scrollbar>
                    <n-scrollbar>
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
    flex: 1;
    display: flex;
    overflow: hidden;
}

.current-sidebar {
    position: relative;
    width: 320px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: var(--card-color);
    .sidebar-draggable {
        padding: 15px;
        display: grid;
        gap: 15px;
        grid-template-columns: repeat(2, minmax(0px, 1fr));
        .n-card {
            color: var(--text-color-3);
            cursor: all-scroll;
            &:hover {
                color: var(--primary-color-hover);
                .n-text {
                    color: var(--primary-color-hover);
                }
            }
        }
    }
}

.current-context {
    position: relative;
    display: flex;
    flex: 1;
    .context-draggable {
        flex: 1;
        margin: 0 auto;
        width: 100%;
        background-color: var(--card-color);
    }
}
</style>
