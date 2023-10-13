<script lang="tsx">
import type { PropType, CSSProperties, VNodeChild } from 'vue'
import type { ScrollbarInst } from 'naive-ui'
import { defineComponent, Fragment, computed } from 'vue'
import { isEmpty } from 'class-validator'
import { whereProperter } from '@/utils/utils-layout'
import { Observer } from '@/utils/utils-observer'

export default defineComponent({
    name: 'CommonContainer',
    props: {
        bordered: { type: Boolean, default: false },
        mobile: { type: Boolean, default: false },
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
        const observer = new Observer()

        const element = computed(() => {
            return whereProperter(isEmpty(props.minWidth), props.contentStyle, {
                minWidth: props.minWidth + 'px',
                ...props.contentStyle
            })
        })

        return () => (
            <n-element tag="section" class={{ 'common-container': true, 'is-bordered': props.bordered }}>
                <n-spin
                    class={{ 'common-container__loadiner': true, 'is-initialize': props.initialize }}
                    show={props.loading}
                    stroke-width={16}
                    size={68}
                >
                    {props.scrollbar ? (
                        <common-scrollbar
                            observer={observer}
                            mobile={props.mobile}
                            initialize={props.initialize}
                            loading={props.loading}
                            trigger={props.trigger}
                            min-width={props.minWidth}
                            onScroll={(evt: Event) => emit('scroll', evt)}
                        >
                            {{
                                default: (scope: { onUpdate: Function; instance: ScrollbarInst }) => (
                                    <Fragment>
                                        {props.request && (
                                            <div class="common-container__request" style={props.requestStyle}>
                                                {props.request}
                                            </div>
                                        )}
                                        <div class={{ [`common-container__fragment ${props.contentClass}`]: true }} style={element.value}>
                                            <Fragment>{slots.default?.({ observer, ...scope })}</Fragment>
                                        </div>
                                    </Fragment>
                                )
                            }}
                        </common-scrollbar>
                    ) : (
                        <div class="common-container__customize" style={props.customizeStyle}>
                            {props.request && (
                                <div class="common-container__request" style={props.requestStyle}>
                                    {props.request}
                                </div>
                            )}
                            <div class={{ [`common-container__fragment ${props.contentClass}`]: true }} style={element.value}>
                                <Fragment>{slots.default?.()}</Fragment>
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
            // > .n-scrollbar > .n-scrollbar-rail {
            //     &.n-scrollbar-rail--vertical {
            //         right: 2px;
            //         width: 7px;
            //         .n-scrollbar-rail__scrollbar {
            //             width: 7px;
            //             border-radius: 7px;
            //         }
            //     }
            //     &.n-scrollbar-rail--horizontal {
            //         bottom: 2px;
            //         height: 7px;
            //         .n-scrollbar-rail__scrollbar {
            //             height: 7px;
            //             border-radius: 7px;
            //         }
            //     }
            // }
        }
    }
    &__fragment,
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
