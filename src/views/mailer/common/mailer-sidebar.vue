<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { compute, type INameUI } from '@/utils/utils-remix'
import {
    nestBlocks,
    NestBlock,
    type NestBlocks,
    createSectionComponent,
    createColumnComponent,
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
    name: 'MailerSidebar',
    components: { VueDraggable },
    setup() {
        const dataBlocks = ref(nestBlocks)

        function clone(data: NestBlocks) {
            if (data.component === NestBlock.MJ_COLUMN) {
                const COUNT_COLUMN = { BasicColumn: 1, BasicDouble: 2, BasicThree: 3 }
                const children = Array.from({ length: COUNT_COLUMN[data.icon as keyof typeof COUNT_COLUMN] }).map(item => {
                    return createColumnComponent()
                    // [createTextComponent('<p>Holle</b>')]
                })
                return createSectionComponent(children)
            } else if (data.component === NestBlock.MJ_TEXT) {
                return createTextComponent('<p>Holle</b>')
            } else if (data.component === NestBlock.MJ_BUTTON) {
                return createButtonComponent({})
            } else if (data.component === NestBlock.MJ_IMAGE) {
                return createImageComponent({})
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
            <n-element class="mailer-sidebar">
                <n-scrollbar>
                    <vue-draggable
                        class="mailer-sidebar__draggable"
                        v-model={dataBlocks.value}
                        animation={150}
                        sort={false}
                        group={{ name: 'element', pull: 'clone', put: false }}
                        clone={clone}
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
        )
    }
})
</script>

<style lang="scss" scoped>
.mailer-sidebar {
    position: relative;
    width: 320px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: var(--card-color);
    &__draggable {
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
</style>
