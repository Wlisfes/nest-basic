<script lang="tsx">
import type { DataTableBaseColumn } from 'naive-ui'
import type { PropType } from 'vue'
import { defineComponent, computed } from 'vue'
import { isEmpty } from 'class-validator'

export default defineComponent({
    name: 'CommonUploaderTabler',
    props: {
        elementData: { type: Array as PropType<Array<Record<string, any>>>, default: () => [] }
    },
    setup(props) {
        const dataColumn = computed<Array<DataTableBaseColumn>>(() => {
            if (props.elementData.length === 0) {
                return []
            }
            return Object.keys({ number: 0, ...props.elementData[0] }).map(key => {
                return { key, title: key, resizable: true }
            })
        })

        /**单元格渲染**/
        function elementRender(value: unknown) {
            return isEmpty(value) ? (
                <div class="n-chunk n-center" style={{ height: '100%' }}>
                    <common-placeholder element-props={{ depth: 3 }}></common-placeholder>
                </div>
            ) : (
                <span>{value}</span>
            )
        }

        return () => {
            return (
                <n-data-table
                    class="common-uploader-tabler"
                    columns={dataColumn.value}
                    data={props.elementData}
                    bordered={false}
                    render-cell={elementRender}
                    v-slots={{
                        empty: () => (
                            <n-element class="n-chunk n-center n-middle">
                                <n-text depth={3}>暂无数据，您未上传csv/xlsx文件</n-text>
                            </n-element>
                        )
                    }}
                ></n-data-table>
            )
        }
    }
})
</script>

<style lang="scss" scoped>
.common-uploader-tabler {
    position: relative;
    :deep(.n-data-table-empty) {
        padding: 0;
        > .n-element.n-chunk {
            width: 100%;
            padding: 15px 20px;
            background-color: var(--table-header-color);
        }
    }
}
</style>
