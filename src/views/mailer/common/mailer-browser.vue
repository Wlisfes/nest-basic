<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { compute } from '@/utils/utils-remix'
import {
    type NestBlocks,
    observer,
    OBSERVER_START_DRAG_EVENT,
    OBSERVER_END_DRAG_EVENT,
    nestBlocks,
    NestBlock,
    createNestBlocks,
    createColumnComponent,
    createSectionComponent,
    createTextComponent,
    createButtonComponent,
    createImageComponent,
    createDividerComponent,
    createSocialComponent,
    createNavbarComponent,
    createHeroComponent,
    createWrapperComponent
} from '@/utils/utils-mailer'

export default defineComponent({
    name: 'MailerBrowser',
    components: { VueDraggable },
    setup() {
        const current = ref<NestBlocks>()
        const dataLayoutBlocks = ref<Array<NestBlocks>>(createNestBlocks('Layout'))
        const dataElementBlocks = ref<Array<NestBlocks>>(createNestBlocks('Element'))

        function onStart() {
            return observer.emit(OBSERVER_START_DRAG_EVENT)
        }

        function onEnd() {
            return observer.emit(OBSERVER_END_DRAG_EVENT)
        }

        function onMove(e: any) {
            const { component } = current.value ?? {}
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

        function clone(data: NestBlocks) {
            current.value = data
            if (data.component === NestBlock.MJ_COLUMN) {
                const COUNT_COLUMN = { BasicColumn: 1, BasicDouble: 2, BasicThree: 3 }
                const children = Array.from({ length: COUNT_COLUMN[data.icon as keyof typeof COUNT_COLUMN] }).map(item => {
                    // return createColumnComponent([createTextComponent('<p>Holle</b>')])
                    return createColumnComponent()
                })
                return createSectionComponent(children)
            } else if (data.component === NestBlock.MJ_TEXT) {
                return createTextComponent('<p>Holle</b>')
            } else if (data.component === NestBlock.MJ_BUTTON) {
                return createButtonComponent('Get Your Order Here')
            } else if (data.component === NestBlock.MJ_IMAGE) {
                return createImageComponent(`https://www.online-image-editor.com//styles/2014/images/example_image.png`)
            } else if (data.component === NestBlock.MJ_DIVIDER) {
                return createDividerComponent({})
            } else if (data.component === NestBlock.MJ_SOCIAL) {
                return createSocialComponent({})
            } else if (data.component === NestBlock.MJ_NAVBAR) {
                return createNavbarComponent({})
            } else if (data.component === NestBlock.MJ_HERO) {
                return createHeroComponent({})
            } else if (data.component === NestBlock.MJ_WRAPPER) {
                return createWrapperComponent({})
            }
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
                            clone={clone}
                            onMove={onMove}
                            onStart={onStart}
                            onEnd={onEnd}
                        >
                            {dataLayoutBlocks.value.map(item => (
                                <div class="block-browser" key={item.uid}>
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
                            clone={clone}
                            onMove={onMove}
                            onStart={onStart}
                            onEnd={onEnd}
                        >
                            {dataElementBlocks.value.map(item => (
                                <div class="block-browser" key={item.uid}>
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
