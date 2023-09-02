<script lang="tsx">
import { defineComponent } from 'vue'
import { useResize } from '@/hooks/hook-resize'
import { VueDraggable } from 'vue-draggable-plus'

export default defineComponent({
    name: 'Currenter',
    components: { VueDraggable },
    setup() {
        const { mobile } = useResize()

        return () => (
            <common-container position="customize" bordered>
                <n-element style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                    <mailer-sidebar></mailer-sidebar>
                    <mailer-container></mailer-container>
                </n-element>
            </common-container>
        )
    }
})
</script>

<style lang="scss" scoped></style>
