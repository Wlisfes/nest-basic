<script lang="tsx">
import { defineComponent } from 'vue'
import { useResizeContainer } from '@/hooks/hook-resize'
import { useSource, useColumnter } from '@/hooks/hook-source'

export default defineComponent({
    name: 'Recorder',
    setup() {
        const { size, compile } = useColumnter({ width: 960, column: 5, size: [16, 0] })
        const { mobile, whereContent, whereRequest } = useResizeContainer()

        return () => (
            <common-container
                bordered
                scrollbar={true}
                mobile={mobile.value}
                loading={false}
                initialize={false}
                content-style={whereContent.value}
                request-style={whereRequest.value}
                request={<common-header vertical={mobile.value} title="验证记录"></common-header>}
            >
                <n-space size={size.value} wrap-item={false} style={{ backgroundColor: 'red' }}>
                    <common-element element-width={compile(260)}>1</common-element>
                    <common-element element-width={compile(150)}>2</common-element>
                    <common-element element-width={compile(150)}>3</common-element>
                    <common-element element-width={compile(200)}>4</common-element>
                    <common-element element-width={compile(200)}>5</common-element>
                </n-space>
            </common-container>
        )
    }
})
</script>

<style scoped>
.common-element {
    opacity: 0.5;
    background-color: var(--primary-color);
}
</style>
