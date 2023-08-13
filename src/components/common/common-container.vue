<script lang="tsx">
import { defineComponent, computed, Fragment, type PropType, type CSSProperties, type VNodeChild } from 'vue'

export default defineComponent({
    name: 'CommonContainer',
    props: {
        scrollbar: { type: Boolean, default: true },
        maxWidth: { type: String, default: 'auto' },
        reactStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
        screenRender: { type: Function as PropType<() => VNodeChild> },
        footerRender: { type: Function as PropType<() => VNodeChild> }
    },
    setup(props, { slots }) {
        const reactStyle = computed<CSSProperties>(() => ({
            maxWidth: props.maxWidth,
            ...props.reactStyle
        }))

        return () => (
            <n-el tag="section" class={{ 'n-basic n-column common-container': true, 'n-center': !props.scrollbar }}>
                {props.screenRender && <Fragment>{props.screenRender()}</Fragment>}
                {props.scrollbar ? (
                    <n-scrollbar class="common-container__scrollbar">
                        <div class="n-basic n-auto n-column n-center">
                            <div class="common-container__default n-basic n-column" style={reactStyle.value}>
                                {slots.default && <Fragment>{slots.default()}</Fragment>}
                            </div>
                        </div>
                    </n-scrollbar>
                ) : (
                    <div class="common-container__default n-basic n-column" style={reactStyle.value}>
                        {slots.default && <Fragment>{slots.default()}</Fragment>}
                    </div>
                )}
                {props.footerRender && <Fragment>{props.footerRender()}</Fragment>}
            </n-el>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
    &__default {
        width: 100%;
        flex: 1;
        background-color: var(--card-color);
        box-sizing: border-box;
        z-index: 1;
    }
}
</style>
