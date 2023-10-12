<script lang="tsx">
import type { ScrollbarInst } from 'naive-ui'
import type { PropType, CSSProperties } from 'vue'
import { defineComponent, ref, Fragment } from 'vue'

export default defineComponent({
    name: 'CommonScrollbar',
    props: {
        trigger: { type: String as PropType<'hover' | 'none'>, default: 'none' },
        contentStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) }
    },
    emits: ['scroll'],
    setup(props, { slots, emit }) {
        const instance = ref<ScrollbarInst>()

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
                <n-scrollbar ref={instance} trigger={props.trigger} x-scrollable onScroll={(evt: Event) => emit('scroll', evt)}>
                    <div class="common-container__customize" style={props.contentStyle}>
                        <Fragment>{slots.default?.({ instance: instance.value, onUpdate })}</Fragment>
                    </div>
                </n-scrollbar>
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
