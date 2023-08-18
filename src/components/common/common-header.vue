<script lang="tsx">
import { defineComponent, Fragment, type PropType, type Component } from 'vue'
import { compute } from '@/utils/utils-remix'

export default defineComponent({
    name: 'CommonHeader',
    props: {
        title: { type: String },
        titleRender: { type: Object as PropType<Component> },
        content: { type: String },
        contentRender: { type: Object as PropType<Component> },
        vertical: { type: Boolean, default: false },
        order: { type: Number, default: 4 }
    },
    emits: ['handler'],
    setup(props, { emit, slots }) {
        return () => (
            <Fragment>
                <n-el class={{ 'common-header': true, 'is-vertical': props.vertical }}>
                    <div class="common-header__main">
                        <n-button text focusable={false} style={{ marginRight: '10px' }} onClick={(e: Event) => emit('handler', e)}>
                            <n-icon size={30} component={compute('ArrowLeftLine')} />
                        </n-button>
                        <div class="common-header__title">
                            {props.titleRender || props.title ? (
                                <Fragment>
                                    {props.titleRender ?? (
                                        <n-h1 style={{ margin: 0 }}>
                                            <n-ellipsis>{props.title}</n-ellipsis>
                                        </n-h1>
                                    )}
                                </Fragment>
                            ) : null}
                        </div>
                    </div>
                    {slots.default && (
                        <div class="common-header__extra" style={{ order: props.vertical ? props.order : 2 }}>
                            {slots.default()}
                        </div>
                    )}
                    {(props.contentRender || props.content) && (
                        <div class="common-header__content">
                            {props.titleRender ?? <n-text style={{ fontSize: '18px' }}>{props.content}</n-text>}
                        </div>
                    )}
                </n-el>
            </Fragment>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-header {
    display: flex;
    flex-wrap: wrap;
    line-height: 1.5;
    gap: 16px;
    &.is-vertical {
        flex-direction: column;
    }
    &__main {
        flex: 1;
        display: flex;
        align-items: center;
        order: 1;
    }
    &__content {
        width: 100%;
        order: 3;
    }
}
</style>
