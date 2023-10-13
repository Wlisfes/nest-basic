<script lang="tsx">
import type { PropType, CSSProperties, VNodeChild } from 'vue'
import type { ScrollbarInst } from 'naive-ui'
import { defineComponent, ref, Fragment, computed } from 'vue'
import { isEmpty } from 'class-validator'
import { whereProperter } from '@/utils/utils-layout'

export default defineComponent({
    name: 'CommonContainer',
    props: {
        bordered: { type: Boolean, default: false },
        loading: { type: Boolean, default: false },
        initialize: { type: Boolean, default: false },
        minWidth: { type: Number },
        scrollbar: { type: Boolean, default: false },
        trigger: { type: String as PropType<'hover' | 'none'>, default: 'none' },
        contentClass: { type: String, default: '' },
        contentStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
        request: { type: Object as PropType<VNodeChild> },
        requestStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
        customizeStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) }
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
            <n-element tag="section" class={{ 'common-container': true, 'is-bordered': props.bordered }}>
                <n-spin
                    class={{ 'common-container__loadiner': true, 'is-initialize': props.initialize }}
                    show={props.loading}
                    stroke-width={16}
                    size={68}
                >
                    {props.scrollbar ? (
                        <n-scrollbar ref={instance} trigger={props.trigger} x-scrollable onScroll={(evt: Event) => emit('scroll', evt)}>
                            {props.request && (
                                <div class="common-container__request" style={props.requestStyle}>
                                    {props.request}
                                </div>
                            )}
                            <div class={{ [`common-container__scrollbar ${props.contentClass}`]: true }} style={element.value}>
                                <Fragment>{slots.default?.({ instance: instance.value, onUpdate })}</Fragment>
                            </div>
                        </n-scrollbar>
                    ) : (
                        <div class="common-container__customize" style={props.customizeStyle}>
                            {props.request && (
                                <div class="common-container__request" style={props.requestStyle}>
                                    {props.request}
                                </div>
                            )}
                            <div class={{ [`common-container__scrollbar ${props.contentClass}`]: true }} style={element.value}>
                                <Fragment>{slots.default?.({ instance: instance.value, onUpdate })}</Fragment>
                            </div>
                        </div>
                    )}
                </n-spin>
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-container {
    height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: padding 0.3s var(--cubic-bezier-ease-in-out);
    &.is-bordered::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: -0.5px;
        height: 1px;
        background-color: var(--divider-color);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    }
    &__request {
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-sizing: border-box;
    }
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
    &__scrollbar,
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
