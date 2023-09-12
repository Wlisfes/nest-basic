<script lang="tsx">
import { defineComponent, onMounted, type PropType } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useState } from '@/hooks/hook-state'
import { compute } from '@/utils/utils-remix'
import {
    type NestOption,
    type NestState,
    NestBlock,
    observer,
    createBasicRender,
    createJsonSource,
    createCheckElement
} from '@/utils/utils-mailer'
import * as http from '@/api/instance.service'

export default defineComponent({
    name: 'MailerCurrenter',
    components: { VueDraggable },
    emits: ['submit'],
    props: {
        command: {
            type: String as PropType<'CREATE' | 'UPDATE'>,
            default: 'CREATE'
        }
    },
    setup(props, { emit }) {
        const { state, dataSource, setState } = useState<NestState>({
            dataSource: [],
            width: 640,
            loading: false,
            current: undefined,
            execute: false
        })

        /**组件块样式**/
        function elementClassName(data: NestOption) {
            return {
                'element-component': true,
                'is-execute': state.execute,
                'is-selecter': state.current && state.current.uid === data.uid
            }
        }

        /**邮件模板信息**/
        async function fetchBasicMailerTemplate() {
            try {
                const { data } = await http.httpBasicMailerTemplate({ id: 16 })
                await setState
                dataSource.value = createJsonSource(data.json)
            } catch (e) {
                console.log(e)
            }
        }

        /**退出**/
        function onBackElement() {}

        /**预览**/
        async function onCheckElement() {
            return await createBasicRender({ width: state.width }, dataSource.value).then(async ({ html }) => {
                return await createCheckElement(html)
            })
        }

        /**保存**/
        async function onSubmitElement(evt: Event) {
            return await createBasicRender({ width: state.width }, dataSource.value).then(data => {
                emit('submit', { setState, evt, ...data })
            })
        }

        /**选中组件**/
        async function onCurrentElement(data: NestOption) {
            await setState({ current: data })
        }

        onMounted(() => {
            fetchBasicMailerTemplate()

            observer.on('OBSERVER_START_DRAG_EVENT', async () => {
                return await setState({ execute: true })
            })
            observer.on('OBSERVER_END_DRAG_EVENT', async () => {
                return await setState({ execute: false })
            })
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
                    <n-element class="element-spin">
                        <n-spin show={state.loading}>
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
        padding: 0 40px;
        background-color: var(--card-color);
        border-bottom: 1px solid var(--divider-color);
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
