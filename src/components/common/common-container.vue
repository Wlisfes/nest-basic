<script lang="tsx">
import type { PropType, CSSProperties, VNodeChild } from 'vue'
import type { ScrollbarInst } from 'naive-ui'
import { defineComponent, ref, Fragment } from 'vue'

export default defineComponent({
    name: 'CommonContainer',
    props: {
        bordered: { type: Boolean, default: false },
        scrollbar: { type: Boolean, default: false },
        scrollbarTrigger: { type: String as PropType<'hover' | 'none'>, default: 'none' },
        contentStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
        request: { type: Object as PropType<VNodeChild> },
        requestStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
        customizeStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) }
    },
    setup(props, { slots }) {
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
            <n-element tag="section" class={{ 'common-container': true, 'is-bordered': props.bordered }}>
                {props.scrollbar ? (
                    <n-scrollbar ref={instance} trigger={props.scrollbarTrigger} x-scrollable>
                        {props.request && (
                            <div class="common-container__request" style={props.requestStyle}>
                                {props.request}
                            </div>
                        )}
                        <div class="common-container__scrollbar" style={props.contentStyle}>
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
                        <div class="common-container__scrollbar" style={props.contentStyle}>
                            <Fragment>{slots.default?.({ instance: instance.value, onUpdate })}</Fragment>
                        </div>
                    </div>
                )}
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
    &__scrollbar,
    &__customize {
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-sizing: border-box;
    }
    &__request {
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-sizing: border-box;
    }
}
</style>
