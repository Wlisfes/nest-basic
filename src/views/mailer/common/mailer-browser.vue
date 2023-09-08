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
        const dataBlocks = ref(nestBlocks)

        function onStart() {
            return observer.emit(OBSERVER_START_DRAG_EVENT)
        }

        function onEnd() {
            return observer.emit(OBSERVER_END_DRAG_EVENT)
        }

        function onMove(e: any) {
            if (!current.value) {
                return false
            } else if (current.value.component === NestBlock.MJ_COLUMN) {
                if (e.to.classList.contains('context-draggable')) {
                    return true
                }
                return false
            } else if (current.value.component === NestBlock.MJ_TEXT) {
                if (e.to.classList.contains('element-column__draggable')) {
                    return true
                }
                return false
            } else if (current.value.component === NestBlock.MJ_BUTTON) {
                if (e.to.classList.contains('element-column__draggable')) {
                    return true
                }
                return false
            } else if (current.value.component === NestBlock.MJ_IMAGE) {
                if (e.to.classList.contains('element-column__draggable')) {
                    return true
                }
                return false
            }

            return true
        }

        function clone(data: NestBlocks) {
            current.value = data
            if (data.component === NestBlock.MJ_COLUMN) {
                const COUNT_COLUMN = { BasicColumn: 1, BasicDouble: 2, BasicThree: 3 }
                const children = Array.from({ length: COUNT_COLUMN[data.icon as keyof typeof COUNT_COLUMN] }).map(item => {
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
            <n-element class="mailer-browser">
                <n-scrollbar>
                    <vue-draggable
                        class="browser-draggable"
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
                                <n-icon component={compute(item.icon)} size={60} />
                                <n-text style={{ fontSize: '16px', marginTop: '0', display: 'block' }}>{item.name}</n-text>
                            </n-card>
                        ))}
                    </vue-draggable>
                </n-scrollbar>
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.mailer-browser {
    position: relative;
    width: 280px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: var(--card-color);
    .browser-draggable {
        padding: 15px;
        display: grid;
        gap: 15px;
        grid-template-columns: repeat(2, minmax(0px, 1fr));
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
            &.sortable-ghost {
                border-style: dashed;
                border-color: var(--primary-color-hover);
            }
        }
    }
}
</style>
