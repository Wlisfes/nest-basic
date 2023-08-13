<script lang="tsx">
import { defineComponent, computed, Fragment, type PropType, type CSSProperties } from 'vue'

export default defineComponent({
    name: 'CommonContainer',
    props: {
        maxWidth: { type: String, default: 'auto' },
        reactStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) }
    },
    setup(props, { slots }) {
        const reactStyle = computed<CSSProperties>(() => ({
            maxWidth: props.maxWidth,
            ...props.reactStyle
        }))

        return () => (
            <n-el tag="section" class="common-container">
                <div class="common-container__default" style={reactStyle.value}>
                    {slots.default ? slots.default() : null}
                </div>
                {slots.footer && <Fragment>{slots.footer()}</Fragment>}
            </n-el>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-container {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    &__default {
        width: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        background-color: var(--card-color);
        box-sizing: border-box;
    }
}
</style>
