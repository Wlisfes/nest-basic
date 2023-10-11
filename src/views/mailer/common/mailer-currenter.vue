<script lang="tsx">
import { defineComponent, onMounted, ref, type PropType } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { createMounte, divineHandler, divineUnzipCompr } from '@/utils/utils-common'
import { useState } from '@/hooks/hook-state'
import { useOssService } from '@/hooks/hook-aliyun'
import { compute } from '@/utils/utils-remix'
import { createElement } from '@/utils/utils-layout'
import { router } from '@/router'
import {
    type NestOption,
    type NestState,
    NestBlock,
    observer,
    createBasicRender,
    createJsonSource,
    createCheckElement,
    createHtml2Canvas
} from '@/utils/utils-mailer'
import * as http from '@/api/instance.service'

export default defineComponent({
    name: 'MailerCurrenter',
    components: { VueDraggable },
    emits: ['submit'],
    props: {
        keyId: { type: Number },
        command: { type: String as PropType<'CREATE' | 'UPDATE'>, default: 'CREATE' }
    },
    setup(props, { emit }) {
        const { createUpload, createRename } = useOssService({ immediate: false })
        const { state, dataSource, setState } = useState<NestState>({
            dataSource: [],
            width: 640,
            loading: false,
            current: undefined,
            execute: false,
            error: false
        })

        /**组件块样式**/
        function elementClassName(data: NestOption) {
            return {
                'element-component': true,
                'is-execute': state.execute,
                'is-selecter': state.current && state.current.uid === data.uid
            }
        }

        createMounte(async () => {
            observer.on('OBSERVER_START_DRAG_EVENT', async () => {
                return await setState({ execute: true })
            })
            observer.on('OBSERVER_END_DRAG_EVENT', async () => {
                return await setState({ execute: false })
            })

            await divineHandler(Boolean(props.keyId), () => {
                return fetchBasicMailer()
            })
        })

        /**邮件模板信息**/
        function fetchBasicMailer() {
            return new Promise(async resolve => {
                try {
                    await setState({ loading: true })
                    const { data } = await http.httpBasicMailerTemplate({ id: props.keyId as number })
                    const jsonDate = await divineUnzipCompr(data.json)
                    await setState({
                        loading: false,
                        dataSource: createJsonSource(JSON.parse(jsonDate))
                    })
                    resolve(data)
                } catch (e) {
                    console.error(e)
                    resolve(await setState({ loading: false, error: true }))
                }
            })
        }

        /**退出**/
        function onBackElement(evt: Event) {
            try {
                router.back()
            } catch (e) {
                console.log(e)
            }
        }

        /**预览**/
        async function onCheckElement() {
            return await createBasicRender(document.querySelector('.app-currenter') as HTMLElement, {
                attributes: { width: state.width },
                data: dataSource.value,
                reverse: false
            }).then(async ({ html }) => {
                return await createCheckElement(html)
            })
        }

        /**保存**/
        async function onSubmitElement(evt: Event) {
            await setState({ loading: true })
            return await createBasicRender(document.querySelector('.app-currenter') as HTMLElement, {
                attributes: { width: state.width },
                data: dataSource.value,
                reverse: false
            }).then(async data => {
                return await createUpload(data.blob, { fileName: await createRename('.png') }).then(file => {
                    return emit('submit', { setState, evt, width: state.width, ...file, ...data })
                })
            })
        }

        /**选中组件**/
        async function onCurrentElement(data: NestOption) {
            await setState({ current: data })
        }

        return () => (
            <n-element class="mailer-currenter">
                <n-element class="element-header">
                    <n-button
                        size="large"
                        secondary
                        focusable={false}
                        style={{ minWidth: '100px' }}
                        onClick={onBackElement}
                        v-slots={{ default: createElement(<span>退出</span>) }}
                    ></n-button>
                    <n-space wrap-item={false} align="center" justify="end" style={{ height: '60px' }}>
                        <n-button
                            size="large"
                            type="info"
                            focusable={false}
                            disabled={state.loading}
                            style={{ minWidth: '100px' }}
                            onClick={onCheckElement}
                            v-slots={{ default: createElement(<span>预览</span>) }}
                        ></n-button>
                        <n-button
                            size="large"
                            type="primary"
                            focusable={false}
                            disabled={state.loading}
                            loading={state.loading}
                            style={{ minWidth: '100px' }}
                            onClick={(evt: Event) => onSubmitElement(evt)}
                            v-slots={{ default: createElement(<span>保存</span>) }}
                        ></n-button>
                    </n-space>
                </n-element>
                <n-element style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                    <mailer-browser></mailer-browser>
                    <n-element class="element-spin">
                        <n-spin show={state.loading} size={64}>
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
                                                    <element-section v-model:node={item} width={state.width}></element-section>
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
                        </n-spin>
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
        padding: 0 15px;
        background-color: var(--card-color);
        border-bottom: 1px solid var(--divider-color);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .element-currenter {
        position: relative;
        display: flex;
        flex: 1;
        overflow: hidden;
    }
    .element-spin {
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        :deep(.n-spin-container),
        :deep(.n-spin-content) {
            position: relative;
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
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
