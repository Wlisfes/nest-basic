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
        elementData: { type: Array as PropType<Array<Record<string, any>>>, default: () => [] }
    },
    setup(props) {
        const { state, compile, setState } = useColumnter({ width: 100, column: 5, size: [10, 0] })
        const observer = new Observer()
        const width = computed(() => dataColumn.value.reduce((w: number, c) => w + c.width, 0))
        const dataColumn = computed(() => {
            if (props.elementData.length === 0) return []
            return Object.keys({ number: 0, ...props.elementData[0] }).map(key => {
                return { key, title: key, width: 160 }
            })
        })

        /**单元格渲染**/
        function elementRender(scope: any) {
            const value: unknown = scope.data[scope.node.key]
            // console.log(minWidth.value, compile(scope.node.width))
            if (scope.node.key === 'COLUMN_1') {
                return (
                    <common-element key={scope.node.key}>
                        {isEmpty(value) ? (
                            <common-placeholder element-props={{ depth: 3 }}></common-placeholder>
                        ) : (
                            <n-text depth={2}>{value}</n-text>
                        )}
                    </common-element>
                )
            }
            return (
                <common-element key={scope.node.key}>
                    {scope.node.key === 'number' ? (
                        <n-text depth={2}>{scope.index + 1}</n-text>
                    ) : isEmpty(value) ? (
                        <common-placeholder element-props={{ depth: 3 }}></common-placeholder>
                    ) : (
                        <n-text depth={2}>{value}</n-text>
                    )}
                </common-element>
            )
        }

        return () => {
            return (
                <n-element class="common-uploader-tabler">
                    {props.elementData.length === 0 ? (
                        <n-element class="tabler-empty n-chunk n-center n-middle">
                            <n-text depth={3}>暂无数据，您未上传csv/xlsx文件</n-text>
                        </n-element>
                    ) : (
                        <common-scrollbar observer={observer} mobile={props.mobile} initialize={true} loading={true} trigger="hover">
                            <n-element style={{ minWidth: width.value + 'px' }}>
                                <n-space class="tabler-column" wrap-item={false} size={state.size}>
                                    {dataColumn.value.map(node => {
                                        return (
                                            <common-element
                                                key={node.key}
                                                element-class="n-chunk n-center"
                                                element-style={{ padding: '10px' }}
                                                element-width={compile(node.width)}
                                            >
                                                <n-text>{node.key}</n-text>
                                            </common-element>
                                        )
                                    })}
                                </n-space>
                                {props.elementData.map((data, index) => (
                                    <n-space class="tabler-column" align="center" key={index} size={state.size}>
                                        {dataColumn.value.map(node => elementRender({ index, data, node }))}
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
        padding: 15px 20px;
        background-color: var(--table-header-color);
    }
}
</style>
