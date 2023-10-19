<script lang="tsx">
import type { PropType } from 'vue'
import { defineComponent, computed, watch } from 'vue'
import { isEmpty } from 'class-validator'
import { Observer } from '@/utils/utils-observer'
import { useColumnter } from '@/hooks/hook-source'

export default defineComponent({
    name: 'CommonUploaderTabler',
    props: {
        mobile: { type: Boolean, default: false },
        maxColumn: { type: Number, default: 10 },
        elementData: { type: Array as PropType<Array<Record<string, any>>>, default: () => [] }
    },
    setup(props) {
        const { state, compile, setState } = useColumnter({ width: 360, column: 2, size: [10, 0] })
        const observer = new Observer()
        const width = computed<number>(() => dataColumn.value.reduce((w: number, c) => w + c.width, 0))
        const column = computed<number>(() => Object.keys({ number: 0, ...props.elementData[0] }).length)
        const dataSource = computed(() => props.elementData.splice(0, props.maxColumn))
        const dataColumn = computed(() => {
            if (props.elementData.length === 0) return []
            const widths = { number: 100, COLUMN_1: 300 }
            return Object.keys({ number: 0, ...props.elementData[0] }).map(key => {
                return { key, title: key, width: widths[key as keyof typeof widths] ?? 200 }
            })
        })

        watch(
            () => [width.value, column.value],
            async () => {
                await setState({ width: width.value, column: column.value })
            },
            { immediate: true, deep: true }
        )

        return () => {
            return (
                <n-element class="common-uploader-tabler">
                    {dataSource.value.length === 0 ? (
                        <n-element class="tabler-empty n-chunk n-center n-middle">
                            <n-text depth={3}>暂无数据，您未上传csv/xlsx文件</n-text>
                        </n-element>
                    ) : (
                        <common-scrollbar
                            observer={observer}
                            mobile={props.mobile}
                            min-width={width.value}
                            initialize={true}
                            loading={true}
                            trigger="hover"
                        >
                            <n-element class="tabler-element" style={{ minWidth: width.value + 'px' }}>
                                <n-space wrap-item={false} size={state.size}>
                                    {dataColumn.value.map((node, index) => {
                                        return (
                                            <common-element
                                                key={node.key}
                                                element-style={{ padding: '10px' }}
                                                element-width={compile(node.width)}
                                            >
                                                <n-text>{index === 0 ? '#' : node.key}</n-text>
                                            </common-element>
                                        )
                                    })}
                                </n-space>
                                {dataSource.value.map((data, index) => (
                                    <n-space key={index} wrap-item={false} size={state.size}>
                                        {dataColumn.value.map(node => (
                                            <common-element
                                                key={node.key}
                                                element-style={{ padding: '10px' }}
                                                element-width={compile(node.width)}
                                            >
                                                {node.key === 'number' ? (
                                                    <n-text depth={2}>{index + 1}</n-text>
                                                ) : isEmpty(data[node.key]) ? (
                                                    <common-placeholder element-props={{ depth: 3 }}></common-placeholder>
                                                ) : (
                                                    <n-text depth={2}>{data[node.key]}</n-text>
                                                )}
                                            </common-element>
                                        ))}
                                    </n-space>
                                ))}
                            </n-element>
                        </common-scrollbar>
                    )}
                </n-element>
            )
        }
    }
})
</script>

<style lang="scss" scoped>
.common-uploader-tabler {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    .tabler-empty {
        position: relative;
        width: 100%;
        height: 64px;
        padding: 15px 20px;
        background-color: var(--table-header-color);
    }
    .tabler-element {
        position: relative;
        padding-bottom: 10px;
        .n-space {
            border-bottom: 1px solid var(--divider-color);
            &:first-child {
                background-color: var(--table-header-color);
            }
            &:last-child {
                border-bottom: none;
            }
        }
    }
}
</style>
