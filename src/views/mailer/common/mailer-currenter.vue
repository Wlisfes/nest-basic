<script lang="tsx">
import { defineComponent, ref, onMounted, computed, type PropType } from 'vue'
import { useVModels } from '@vueuse/core'
import { VueDraggable } from 'vue-draggable-plus'
import { useState } from '@/hooks/hook-state'
import { compute, type INameUI } from '@/utils/utils-remix'
import * as mailer from '@/utils/utils-mailer'

export default defineComponent({
    name: 'MailerCurrenter',
    components: { VueDraggable },
    props: {
        maxWidth: { type: Number, default: 840 }
    },
    setup(props) {
        const { state, setState } = useState({ current: null, content: '' })
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
                return mailer.createButtonComponent({})
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

        function onMove(e: any) {
            if (!current.value) {
                return false
            } else if (current.value.component === mailer.NestBlock.MJ_COLUMN) {
                if (e.to.classList.contains('mailer-container__draggable')) {
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

        function onStart(e: any) {
            console.log('onStart', e)
        }

        function onEnd(e: any) {
            console.log('onEnd', e)
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
                                <element-component key={item.uid} v-model:node={item}></element-component>
                            ))}
                        </vue-draggable>
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
