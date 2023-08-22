<script lang="tsx">
import { defineComponent, watch, computed, Fragment, type PropType, type VNodeChild, type CSSProperties } from 'vue'
import { useCurrentElement, useElementSize } from '@vueuse/core'
import { divineCols } from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonResize',
    props: {
        cameStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
        cols: { type: Object as PropType<Record<number, number>>, default: () => ({}) },
        defaultCols: { type: Number, default: 24 },
        xGap: { type: Number, default: 20 },
        yGap: { type: Number, default: 20 },
        dataRender: { type: Function as PropType<(e: Record<string, unknown>) => VNodeChild> }
    },
    emit: ['resize'],
    setup(props, { emit, slots }) {
        const element = useCurrentElement<HTMLElement>()
        const { width, height } = useElementSize(element)
        const cols = computed(() => {
            return divineCols(props.cols, width.value, props.defaultCols)
        })
        const option = computed(() => ({
            cols: cols.value,
            width: width.value,
            height: height.value
        }))
        const cameStyle = computed<CSSProperties>(() => ({
            ...props.cameStyle,
            position: 'relative',
            display: 'grid',
            rowGap: props.yGap + 'px',
            columnGap: props.xGap + 'px',
            gridTemplateColumns: `repeat(${cols.value}, minmax(0px, 1fr))`
        }))

        watch(
            () => [width.value, height.value],
            () => {
                emit('resize', { width: width.value, height: height.value, cols: cols.value })
            },
            { immediate: true }
        )

        return () => (
            <n-element class="common-resize" style={cameStyle.value}>
                {slots.default ? (
                    <Fragment>{slots.default(option.value)}</Fragment>
                ) : props.dataRender ? (
                    <Fragment>{props.dataRender(option.value)}</Fragment>
                ) : null}
            </n-element>
        )
    }
})
</script>
