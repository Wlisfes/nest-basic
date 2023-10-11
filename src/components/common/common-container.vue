<script lang="tsx">
import { defineComponent, computed, Fragment, type PropType, type CSSProperties, type VNodeChild } from 'vue'

export default defineComponent({
    name: 'CommonContainer',
    props: {
        bordered: { type: Boolean, default: false },
        mobile: { type: Boolean, default: true },
        position: { type: String as PropType<'static' | 'customize'>, default: 'static' },
        maxWidth: { type: String, default: 'auto' },
        scrollbarStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
        contentStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
        request: { type: Object as PropType<VNodeChild> },
        requestStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) }
    },
    setup(props, { slots }) {
        const scrollbarStyle = computed<CSSProperties>(() => ({
            boxSizing: 'border-box',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            ...props.scrollbarStyle
        }))
        const contentStyle = computed<CSSProperties>(() => ({
            maxWidth: props.maxWidth,
            width: '100%',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--card-color)',
            boxSizing: 'border-box',
            ...props.contentStyle
        }))

        return () => (
            <n-el tag="section" class={{ 'common-container': true, 'is-bordered': props.bordered }}>
                {props.position === 'customize' ? (
                    <div class="common-container__customize">{slots.default && slots.default()}</div>
                ) : (
                    <Fragment>
                        {props.request && !props.mobile && (
                            <div class="common-container__request" style={props.requestStyle}>
                                {props.request}
                            </div>
                        )}
                        <div class="common-container__scrollbar">
                            <n-scrollbar x-scrollable>
                                {props.request && props.mobile && (
                                    <div class="common-container__request" style={props.requestStyle}>
                                        {props.request}
                                    </div>
                                )}
                                <div style={scrollbarStyle.value}>
                                    <div style={contentStyle.value}>{slots.default && <Fragment>{slots.default()}</Fragment>}</div>
                                </div>
                            </n-scrollbar>
                        </div>
                    </Fragment>
                )}
            </n-el>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-container {
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: padding 0.3s var(--cubic-bezier-ease-in-out);
    display: flex;
    flex-direction: column;
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
        background-color: var(--card-color);
        box-sizing: border-box;
    }
    &__scrollbar,
    &__customize {
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
}
</style>
