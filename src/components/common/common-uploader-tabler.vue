<script lang="tsx">
import { defineComponent, computed, type PropType } from 'vue'

export default defineComponent({
    name: 'CommonUploaderTabler',
    props: {
        elementData: { type: Array as PropType<Array<Record<string, any>>>, default: () => [] }
    },
    setup(props) {
        const dataColumn = computed(() => [{ key: 'COLUMN_1', title: '21312' }])
        return () => {
            console.log(props.elementData)
            return (
                <n-data-table
                    class="common-uploader-tabler"
                    columns={dataColumn.value}
                    data={props.elementData}
                    bordered={false}
                    v-slots={{
                        empty: () => <n-card>111</n-card>
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
    }
}
</style>
