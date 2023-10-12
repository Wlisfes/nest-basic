<script lang="tsx">
import type { PropType, CSSProperties } from 'vue'
import { defineComponent, computed, Fragment, watch } from 'vue'
import { useCurrentElement, useElementSize } from '@vueuse/core'
import { divineCols } from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonSource',
    props: {
        loading: { type: Boolean, default: false },
        initialize: { type: Boolean, default: false },
        page: { type: Number, default: 1 },
        size: { type: Number, default: 10 },
        pageSizes: { type: Array, default: () => [10, 20, 30, 40, 50] },
        total: { type: Number, default: 0 },
        dataSource: { type: Array as PropType<Array<Record<string, unknown>>>, default: () => [] },
        cameStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
        cols: { type: Object as PropType<Record<number, number>>, default: () => ({}) },
        defaultCols: { type: Number, default: 24 },
        xGap: { type: Number, default: 20 },
        yGap: { type: Number, default: 20 },
        pagination: { type: Boolean, default: true }
    },
    emits: ['update', 'resize'],
    setup(props, { emit, slots }) {
        const element = useCurrentElement<HTMLElement>()
        const { width, height } = useElementSize(element)
        const cols = computed(() => {
            return divineCols(props.cols, width.value, props.defaultCols)
        })
        const cameStyle = computed<CSSProperties>(() => ({
            paddingBottom: props.pagination ? '48px' : '64px',
            rowGap: props.yGap + 'px',
            columnGap: props.xGap + 'px',
            gridTemplateColumns: `repeat(${cols.value}, minmax(0px, 1fr))`,
            ...props.cameStyle
        }))

        watch(
            () => [width.value, height.value],
            () => {
                emit('resize', { width: width.value, height: height.value, cols: cols.value })
            },
            { immediate: true }
        )

        return () => (
            <n-element class="common-source">
                {props.initialize ? null : (
                    <Fragment>
                        {props.total === 0 ? (
                            slots.empty ? (
                                slots.empty()
                            ) : (
                                <n-empty style={{ minHeight: '240px', justifyContent: 'center' }}>
                                    {{
                                        default: () => (
                                            <n-text depth="3" style={{ fontSize: '20px' }}>
                                                暂无内容
                                            </n-text>
                                        )
                                    }}
                                </n-empty>
                            )
                        ) : (
                            <Fragment>
                                <div class="common-source__container" style={cameStyle.value}>
                                    {props.dataSource.map((item: Record<string, any>) => {
                                        return <Fragment key={item.id}>{slots.render?.(item)}</Fragment>
                                    })}
                                </div>
                                {props.pagination && (
                                    <div class="common-source__pagination">
                                        <n-pagination
                                            size="large"
                                            page={props.page}
                                            page-size={props.size}
                                            item-count={props.total}
                                            page-sizes={props.pageSizes}
                                            show-size-picker
                                            display-order={['pages', 'size-picker']}
                                            on-update:page={(page: number) => emit('update', { page })}
                                            on-update:page-size={(size: number) => emit('update', { size, page: 1 })}
                                        />
                                    </div>
                                )}
                            </Fragment>
                        )}
                    </Fragment>
                )}
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-source {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    &__container {
        position: relative;
        display: grid;
        overflow: hidden;
    }
    &__pagination {
        display: flex;
        justify-content: center;
        padding-bottom: 64px;
    }
}
</style>
