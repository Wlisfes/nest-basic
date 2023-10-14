<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { compute } from '@/utils/utils-compute'
import { useState } from '@/hooks/hook-state'
import {
    type NestBlocks,
    NestBlock,
    observer,
    OBSERVER_START_DRAG_EVENT,
    OBSERVER_END_DRAG_EVENT,
    cloneElement,
    createNestBlocks
} from '@/utils/utils-mailer'

export default defineComponent({
    name: 'MailerBrowser',
    components: { VueDraggable },
    setup() {
        const dataLayoutBlocks = ref<Array<NestBlocks>>(createNestBlocks('Layout'))
        const dataElementBlocks = ref<Array<NestBlocks>>(createNestBlocks('Element'))
        const { state, setState } = useState<{ current: NestBlocks | undefined }>({
            current: undefined
        })

        /**开始拖拽**/
        async function onStartElement() {
            return observer.emit(OBSERVER_START_DRAG_EVENT)
        }

        /**结束拖拽**/
        async function onEndElement() {
            return observer.emit(OBSERVER_END_DRAG_EVENT)
        }

        /**拖拽中**/
        async function onMoveElement(e: any, r: any) {
            const { component } = (state.current ?? {}) as NestBlocks
            if (!component) {
                return false
            } else if ([NestBlock.MJ_SECTION, NestBlock.MJ_COLUMN, NestBlock.MJ_HERO, NestBlock.MJ_WRAPPER].includes(component)) {
                if (e.to.classList.contains('app-currenter')) {
                    return true
                }
                return false
            } else if (
                [
                    NestBlock.MJ_TEXT,
                    NestBlock.MJ_BUTTON,
                    NestBlock.MJ_IMAGE,
                    NestBlock.MJ_DIVIDER,
                    NestBlock.MJ_SOCIAL,
                    NestBlock.MJ_NAVBAR
                ].includes(component)
            ) {
                if (e.to.classList.contains('component-currenter')) {
                    return true
                }
                return false
            }

            return false
        }

        return () => (
            <n-element class="element-browser">
                <n-scrollbar>
                    <n-element style={{ padding: '15px', userSelect: 'none' }}>
                        <n-h2 prefix="bar" style={{ marginBottom: '15px' }}>
                            Layout
                        </n-h2>
                        <vue-draggable
                            class="app-browser"
                            v-model={dataLayoutBlocks.value}
                            animation={150}
                            sort={false}
                            group={{ name: 'element', pull: 'clone', put: false }}
                            clone={(data: NestBlocks) => cloneElement(() => setState({ current: data }), data)}
                            onMove={onMoveElement}
                            onStart={onStartElement}
                            onEnd={onEndElement}
                        >
                            {dataLayoutBlocks.value.map(item => (
                                <div class="block-browser block-layout" key={item.uid}>
                                    <n-card embedded content-style={{ padding: '10px', textAlign: 'center' }}>
                                        <n-icon component={compute(item.icon)} size={50} />
                                        <n-text style={{ fontSize: '14px', marginTop: '0', display: 'block' }}>{item.name}</n-text>
                                    </n-card>
                                </div>
                            ))}
                        </vue-draggable>
                    </n-element>
                    <n-element style={{ padding: '15px', userSelect: 'none' }}>
                        <n-h2 prefix="bar" type="info" style={{ marginBottom: '15px' }}>
                            Element
                        </n-h2>
                        <vue-draggable
                            class="app-browser"
                            v-model={dataElementBlocks.value}
                            animation={150}
                            sort={false}
                            group={{ name: 'elements', pull: 'clone', put: false }}
                            onMove={onMoveElement}
                            clone={(data: NestBlocks) => cloneElement(() => setState({ current: data }), data)}
                            onStart={onStartElement}
                            onEnd={onEndElement}
                        >
                            {dataElementBlocks.value.map(item => (
                                <div class="block-browser block-element" key={item.uid}>
                                    <n-card embedded content-style={{ padding: '10px', textAlign: 'center' }}>
                                        <n-icon component={compute(item.icon)} size={50} />
                                        <n-text style={{ fontSize: '14px', marginTop: '0', display: 'block' }}>{item.name}</n-text>
                                    </n-card>
                                </div>
                            ))}
                        </vue-draggable>
                    </n-element>
                </n-scrollbar>
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.element-browser {
    position: relative;
    width: 260px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: var(--card-color);
}

.app-browser {
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(2, minmax(0px, 1fr));
    .block-browser {
        position: relative;
        .n-card {
            color: var(--text-color-3);
            cursor: all-scroll;
            border-width: 2px;
            &:hover {
                color: var(--primary-color-hover);
                .n-text {
                    color: var(--primary-color-hover);
                }
            }
        }
        &.sortable-ghost > .n-card {
            border-style: dashed;
            border-color: var(--primary-color-hover);
        }
    }
}
</style>
