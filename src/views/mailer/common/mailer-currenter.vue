<script lang="tsx">
import { defineComponent, ref, computed, onMounted, watch, Fragment } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useState } from '@/hooks/hook-state'
import { whereProperter } from '@/utils/utils-layout'
import { compute } from '@/utils/utils-remix'
import {
    type NestOption,
    type NestState,
    NestBlock,
    observer,
    createMjmlTransfor,
    createJsonRender,
    createJsonTransfor,
    createJsonCameTransfor,
    createJsonRemoveTransfer,
    createCheckElement,
    OBSERVER_START_DRAG_EVENT,
    OBSERVER_END_DRAG_EVENT
} from '@/utils/utils-mailer'
import * as http from '@/api/instance.service'

export default defineComponent({
    name: 'MailerCurrenter',
    components: { VueDraggable },
    props: {
        maxWidth: { type: Number, default: 640 }
    },
    emits: ['submit'],
    setup(props, { emit }) {
        const { state, setState } = useState<NestState>({
            loading: false,
            current: undefined,
            execute: false
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
                'is-execute': state.execute,
                'is-selecter': state.current && state.current.uid === data.uid
            }
        }

        async function fetchBasicMailerTemplate() {
            try {
                const { data } = await http.httpBasicMailerTemplate({ id: 15 })
                const { html, json } = createMjmlTransfor(data.mjml)
                // const jsonData = createJsonCameTransfor(createJsonRemoveTransfer(json), true)
                // console.log(jsonData.children[0].children)
                dataSource.value = data.json.children[0].children ?? []
                console.log(data.json.children[0].children ?? [])
            } catch (e) {
                console.log(e)
            }
        }

        /**退出**/
        function onBackElement() {}

        /**预览**/
        async function onCheckElement() {
            const json = createJsonCameTransfor(JSON.parse(JSON.stringify(JsonRender.value)))
            const mjml = createJsonTransfor(json)
            const html = createMjmlTransfor(mjml).html
            console.log(createMjmlTransfor(mjml))
            return await createCheckElement(html)
        }

        /**保存**/
        function onSubmitElement(evt: Event) {
            emit('submit', {
                setState,
                evt,
                mjml: createJsonTransfor(createJsonCameTransfor(JSON.parse(JSON.stringify(JsonRender.value)))),
                json: createJsonRender(dataSource.value)
            })

            // window.localStorage.setItem('dataSourceElement', JSON.stringify(JsonRender.value))
        }

        async function onCurrentElement(data: NestOption) {
            await setState({ current: data })

            console.log(data)
        }

        watch(
            () => JsonRender.value,
            () => {
                // const json = createJsonCameTransfor(JSON.parse(JSON.stringify(JsonRender.value)))
                // const mjml = createJsonTransfor(json)
                // const html = createMjmlTransfor(mjml).html
                // console.log(json)
                // console.log(mjml)
            },
            { immediate: true, deep: true }
        )

        onMounted(() => {
            fetchBasicMailerTemplate()
            // const data = window.localStorage.getItem('dataSourceElement') as string
            // const evt = JSON.parse(data ?? {})
            // if (evt.children && evt.children.length > 0) {
            //     dataSource.value = evt.children[0].children ?? []
            // }

            observer.on('OBSERVER_START_DRAG_EVENT', async () => {
                return await setState({ execute: true })
            })
            observer.on('OBSERVER_END_DRAG_EVENT', async () => {
                return await setState({ execute: false })
            })

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
            // console.log(node.json)
        })

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
                        <n-button
                            size="large"
                            type="primary"
                            disabled={state.loading}
                            loading={state.loading}
                            style={{ minWidth: '88px' }}
                            onClick={onSubmitElement}
                        >
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
                                    <div key={item.uid} class={elementClassName(item)} onClick={e => onCurrentElement(item)}>
                                        {item.tagName === NestBlock.MJ_SECTION ? (
                                            <element-section v-model:node={item}></element-section>
                                        ) : null}
                                        <div class="element-border is-top"></div>
                                        <div class="element-border is-bottom"></div>
                                        <div class="element-border is-left"></div>
                                        <div class="element-border is-right"></div>
                                        <div class="element-anchor">
                                            <n-icon size={20} color="#ffffff" component={compute('Fullscreen')} />
                                        </div>
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
    padding: 30px 15px;
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
    cursor: pointer;
    // &:hover:not(.is-execute) {
    //     &:not(.is-selecter) > .element-border {
    //         border-style: dashed !important;
    //         border-color: var(--primary-color-hover) !important;
    //     }
    // }
    &.is-selecter > .element-border {
        border-style: solid !important;
        border-color: var(--primary-color-hover) !important;
    }
    &.sortable-ghost {
        opacity: 1;
        background-color: #ffffff;
        > .element-border {
            border-style: dashed !important;
            border-color: var(--primary-color-hover) !important;
        }
    }

    .element-anchor {
        position: absolute;
        opacity: 0;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        cursor: all-scroll;
        padding: 5px 5px 5px 8px;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        background-color: var(--primary-color-hover);
        transition: opacity 200ms;
    }

    .element-border {
        position: absolute;
        border-width: 0;
        transition: border-color 200ms;
        &.is-left {
            top: 0;
            bottom: 0;
            left: 0;
            border-left: 2px solid transparent;
        }
        &.is-right {
            top: 0;
            bottom: 0;
            right: 0;
            border-right: 2px solid transparent;
        }
        &.is-top {
            left: 0;
            right: 0;
            top: 0;
            border-top: 2px solid transparent;
        }
        &.is-bottom {
            left: 0;
            right: 0;
            bottom: 0;
            border-bottom: 2px solid transparent;
        }
    }
}
</style>
