<script lang="tsx">
import { defineComponent, ref, computed, onMounted, watch, Fragment } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useState } from '@/hooks/hook-state'
import { whereProperter } from '@/utils/utils-layout'
import {
    type NestOption,
    type NestState,
    NestBlock,
    createMjmlTransfor,
    createJsonTransfor,
    createJsonCameTransfor,
    createCheckElement
} from '@/utils/utils-mailer'

export default defineComponent({
    name: 'MailerCurrenter',
    components: { VueDraggable },
    props: {
        maxWidth: { type: Number, default: 640 }
    },
    setup(props) {
        const { state, setState } = useState<NestState>({
            current: undefined
        })
        const dataSource = ref<Array<NestOption>>([])
        const JsonRender = computed(() => ({
            tagName: 'mjml',
            attributes: {},
            children: [{ tagName: 'mj-body', attributes: {}, children: dataSource.value }]
        }))

        /**组件块样式**/
        function elementClassName(data: NestOption) {
            return {
                'element-component': true,
                'is-selecter': state.current && state.current.uid === data.uid
            }
        }

        function onBackElement() {}

        async function onCheckElement() {
            const json = createJsonCameTransfor(JSON.parse(JSON.stringify(JsonRender.value)))
            const mjml = createJsonTransfor(json)
            const html = createMjmlTransfor(mjml).html
            return await createCheckElement(html)
        }

        function onSubmitElement() {}

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
        })

        watch(
            () => JsonRender.value,
            () => {
                const json = createJsonCameTransfor(JSON.parse(JSON.stringify(JsonRender.value)))
                const mjml = createJsonTransfor(json)
                const html = createMjmlTransfor(mjml).html

                console.log(json)
                console.log(mjml)
            },
            { immediate: true, deep: true }
        )

        function onMouseover(e: MouseEvent) {}

        function onMouseout(e: MouseEvent) {}

        async function onCurrentElement(data: NestOption) {
            await setState({ current: data })

            console.log(data)
        }

        return () => (
            <n-element class="mailer-currenter">
                <n-element class="element-header">
                    <n-space wrap-item={false} align="center" justify="end" style={{ height: '60px' }}>
                        <n-button size="large" style={{ minWidth: '88px' }}>
                            返回
                        </n-button>
                        <n-button size="large" type="info" style={{ minWidth: '88px' }} onClick={onCheckElement}>
                            预览
                        </n-button>
                        <n-button size="large" type="primary" style={{ minWidth: '88px' }} onClick={onSubmitElement}>
                            保存
                        </n-button>
                    </n-space>
                </n-element>
                <n-element style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                    <mailer-browser></mailer-browser>
                    <n-element class="element-currenter">
                        <n-scrollbar>
                            <vue-draggable
                                class="app-currenter"
                                v-model={dataSource.value}
                                force-fallback={false}
                                group={{ name: 'element' }}
                                animation={150}
                            >
                                {dataSource.value.map(item => (
                                    <div
                                        key={item.uid}
                                        class={elementClassName(item)}
                                        onClick={e => onCurrentElement(item)}
                                        onMouseover={onMouseover}
                                        onMouseout={onMouseout}
                                    >
                                        {item.tagName === NestBlock.MJ_SECTION ? (
                                            <element-section v-model:node={item}></element-section>
                                        ) : null}
                                        <div class="element-border is-top"></div>
                                        <div class="element-border is-bottom"></div>
                                        <div class="element-border is-left"></div>
                                        <div class="element-border is-right"></div>
                                        <div></div>
                                    </div>
                                ))}
                            </vue-draggable>
                        </n-scrollbar>
                    </n-element>
                    <mailer-properter></mailer-properter>
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
    flex-direction: column;
    overflow: hidden;
    .element-header {
        padding: 0 30px;
        background-color: var(--card-color);
        border-bottom: 1px solid var(--divider-color);
    }
    .element-currenter {
        position: relative;
        display: flex;
        flex: 1;
        overflow: hidden;
    }
}

.app-currenter {
    flex: 1;
    margin: 0 auto;
    padding: 15px;
    width: 100%;
    :deep(.block-browser > .n-card) {
        color: var(--text-color-3);
        cursor: all-scroll;
        border-radius: 0;
        border-width: 2px;
        border-style: dashed;
        border-color: var(--primary-color-hover);
        height: 44px;
        .n-icon {
            display: none;
        }
    }
}

.element-component {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    &.is-selecter > .element-border,
    &:hover > .element-border {
        border-color: var(--primary-color-hover) !important;
    }
    &.sortable-ghost {
        background-color: #ffffff;
        .element-border {
            border-style: dashed;
            border-color: var(--primary-color-hover);
            &.is-left {
                left: -2px;
            }
            &.is-right {
                right: -2px;
            }
            &.is-top {
                top: -2px;
            }
            &.is-bottom {
                bottom: -2px;
            }
        }
    }

    .element-border {
        position: absolute;
        transition: border-color 200ms;
        &.is-left {
            top: 0;
            bottom: 0;
            left: 0;
            border-left-color: transparent;
            border-left-width: 2px;
            border-left-style: solid;
        }
        &.is-right {
            top: 0;
            bottom: 0;
            right: 0;
            border-right-color: transparent;
            border-right-width: 2px;
            border-right-style: solid;
        }
        &.is-top {
            left: 0;
            right: 0;
            top: 0;
            border-top-color: transparent;
            border-top-width: 2px;
            border-top-style: solid;
        }
        &.is-bottom {
            left: 0;
            right: 0;
            bottom: 0;
            border-bottom-color: transparent;
            border-bottom-width: 2px;
            border-bottom-style: solid;
        }
    }
}
</style>
