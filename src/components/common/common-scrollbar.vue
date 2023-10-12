<script lang="tsx">
import type { ScrollbarInst } from 'naive-ui'
import type { PropType, CSSProperties } from 'vue'
import { defineComponent, ref, Fragment, computed } from 'vue'
import { isEmpty } from 'class-validator'
import { whereProperter } from '@/utils/utils-layout'

export default defineComponent({
    name: 'CommonScrollbar',
    props: {
        initialize: { type: Boolean, default: false },
        loading: { type: Boolean, default: false },
        minWidth: { type: Number },
        trigger: { type: String as PropType<'hover' | 'none'>, default: 'none' },
        contentStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) }
    },
    emits: ['scroll'],
    setup(props, { slots, emit }) {
        const instance = ref<ScrollbarInst>()

        const element = computed(() => {
            return whereProperter(isEmpty(props.minWidth), props.contentStyle, {
                minWidth: props.minWidth + 'px',
                ...props.contentStyle
            })
        })

        /**更新位置**/
        async function onUpdate(option: Parameters<ScrollbarInst['scrollTo']>['0'] = { top: 0, left: 0, behavior: 'smooth' }) {
            return instance.value?.scrollTo({
                top: option.top ?? 0,
                left: option.left ?? 0,
                behavior: option.behavior ?? 'smooth'
            })
        }

        return () => (
            <n-element class="common-scrollbar">
                <n-spin
                    class={{ 'common-scrollbar__loadiner': true, 'is-initialize': props.initialize }}
                    show={props.loading}
                    stroke-width={16}
                    size={68}
                >
                    <n-scrollbar ref={instance} trigger={props.trigger} x-scrollable onScroll={(evt: Event) => emit('scroll', evt)}>
                        <div class="common-container__customize" style={element.value}>
                            <Fragment>{slots.default?.({ instance: instance.value, onUpdate })}</Fragment>
                        </div>
                    </n-scrollbar>
                </n-spin>
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-scrollbar {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    &__loadiner {
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-sizing: border-box;
        &.is-initialize > :deep(.n-spin-content) {
            opacity: 0;
        }
        > :deep(.n-spin-content) {
            position: relative;
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-sizing: border-box;
        }
    }
    &__customize {
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-sizing: border-box;
    }
}
</style>
