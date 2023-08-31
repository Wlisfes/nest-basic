<script lang="tsx">
import { defineComponent } from 'vue'
import { useResize } from '@/hooks/hook-resize'
import { useState } from '@/hooks/hook-state'
import { VueDraggable } from 'vue-draggable-plus'

export default defineComponent({
    name: 'Currenter',
    components: { VueDraggable },
    setup() {
        const { mobile } = useResize()
        const { dataColumn, dataSource } = useState({
            dataSource: [],
            dataColumn: [
                { name: 'Image', uid: 1693405215423 },
                { name: 'Button', uid: 1693405215424 },
                { name: 'Layout', uid: 1693405215425 },
                { name: 'Text', uid: 1693405215426 }
            ]
        })

        function onUpdate(data: any) {
            console.log(data)
        }

        function clone(element: Record<string, unknown>) {
            // console.log(element)

            return { name: element.name, uid: Date.now() }
        }

        function onClone() {
            console.log(dataSource.value)
        }

        return () => (
            <common-container bordered>
                <n-grid x-gap={20} y-gap={20} cols={4} style={{ flex: 1 }}>
                    <n-grid-item span={1}>
                        <vue-draggable
                            v-model={dataColumn.value}
                            ghostClass="ghost"
                            animation={150}
                            group={{ name: 'element', pull: 'clone', put: false }}
                            clone={clone}
                            onClone={onClone}
                        >
                            {dataColumn.value.map(item => (
                                <n-card key={item.uid} embedded>
                                    {item.name}
                                </n-card>
                            ))}
                        </vue-draggable>
                    </n-grid-item>
                    <n-grid-item span={3}>
                        <vue-draggable
                            v-model={dataSource.value}
                            ghostClass="ghost"
                            group="element"
                            animation={150}
                            style={{ height: '100%' }}
                            onUpdate={onUpdate}
                        >
                            {dataSource.value.map((item: any) => {
                                if (item.name === 'Button') {
                                    return (
                                        <div key={item.uid}>
                                            <n-button>{item.name}</n-button>
                                        </div>
                                    )
                                } else if (item.name === 'Image') {
                                    return (
                                        <div key={item.uid}>
                                            <n-image width="100" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
                                        </div>
                                    )
                                }

                                return (
                                    <n-card key={item.uid} embedded>
                                        {item.name}
                                    </n-card>
                                )
                            })}
                        </vue-draggable>
                        <div>{dataSource.value.join(',')}</div>
                    </n-grid-item>
                </n-grid>
            </common-container>
        )
    }
})
</script>

<style scoped>
.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}
</style>
