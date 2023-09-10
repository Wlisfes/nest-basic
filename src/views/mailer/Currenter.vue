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
            <common-container position="customize">
                <mailer-currenter></mailer-currenter>
            </common-container>
        )
    }
})
</script>
