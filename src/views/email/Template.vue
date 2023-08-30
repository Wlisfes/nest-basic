<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { useResize } from '@/hooks/hook-resize'
import { useState } from '@/hooks/hook-state'
import { whereProperter } from '@/utils/utils-layout'
import { vDraggable, VueDraggable } from 'vue-draggable-plus'

export default defineComponent({
    name: 'Template',
    directives: { vDraggable },
    components: { VueDraggable },
    setup() {
        const { mobile } = useResize()

        const dataColumn = ref([
            { name: 'Image', uid: 1693405215423 },
            { name: 'Button', uid: 1693405215424 },
            { name: 'Layout', uid: 1693405215425 },
            { name: 'Text', uid: 1693405215426 }
        ])

        return () => (
            <common-container
                bordered
                content-style={whereProperter(mobile.value, { padding: '0 20px' }, { padding: '0 40px' })}
                request-style={whereProperter(mobile.value, { padding: '40px 20px 20px' }, { padding: '60px 40px 30px' })}
                request={<common-header vertical={mobile.value} title="发送模板"></common-header>}
            >
                <n-grid x-gap={20} y-gap={20} cols={3} style={{ flex: 1 }}>
                    <n-grid-item span={1}></n-grid-item>
                    <n-grid-item span={2}>
                        <vue-draggable v-model={dataColumn.value} ghostClass="ghost" animation={150}>
                            {dataColumn.value.map(item => (
                                <n-card key={item.uid} embedded>
                                    {item.name}
                                </n-card>
                            ))}
                        </vue-draggable>
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
