<script lang="tsx">
import type { ScrollbarInst } from 'naive-ui'
import type { PropType, CSSProperties } from 'vue'
import { defineComponent, ref, Fragment, computed } from 'vue'
import { isEmpty } from 'class-validator'
import { whereProperter } from '@/utils/utils-layout'
import { divineHandler } from '@/utils/utils-common'
import { Observer } from '@/utils/utils-observer'

export default defineComponent({
    name: 'CommonScrollbar',
    props: {
        observer: { type: Object as PropType<Observer<Record<string, any>>>, required: true },
        mobile: { type: Boolean, default: false },
        initialize: { type: Boolean, default: false },
        loading: { type: Boolean, default: false },
        minWidth: { type: Number },
        trigger: { type: String as PropType<'hover' | 'none'>, default: 'none' }
    },
    emits: ['scroll'],
    setup(props, { slots, emit }) {
        const instance = ref<ScrollbarInst>()

        /**更新位置**/
        async function onUpdate(option: Parameters<ScrollbarInst['scrollTo']>['0'] = { top: 0, left: 0, behavior: 'smooth' }) {
            if (props.mobile) {
                return await divineHandler(!!props.observer, () => {
                    return props.observer.emit('update', option)
                })
            }
            return instance.value?.scrollTo({
                top: option.top ?? 0,
                left: option.left ?? 0,
                behavior: option.behavior ?? 'smooth'
            })
        }

        return () => (
            <n-element class="common-scrollbar">
                {props.mobile ? (
                    <common-better
                        observer={props.observer}
                        min-width={props.minWidth}
                        initialize={props.initialize}
                        loading={props.loading}
                        onScroll={(evt: Event) => emit('scroll', evt)}
                    >
                        <Fragment>{slots.default?.({ instance: instance.value, onUpdate })}</Fragment>
                    </common-better>
                ) : (
                    <n-scrollbar ref={instance} trigger={props.trigger} x-scrollable onScroll={(evt: Event) => emit('scroll', evt)}>
                        <Fragment>{slots.default?.({ instance: instance.value, onUpdate })}</Fragment>
                    </n-scrollbar>
                )}
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
    > :deep(.n-scrollbar) > .n-scrollbar-rail {
        &.n-scrollbar-rail--vertical {
            right: 2px;
            width: 7px;
            .n-scrollbar-rail__scrollbar {
                width: 7px;
                border-radius: 7px;
            }
        }
        &.n-scrollbar-rail--horizontal {
            bottom: 2px;
            height: 7px;
            .n-scrollbar-rail__scrollbar {
                height: 7px;
                border-radius: 7px;
            }
        }
    }
}
</style>
