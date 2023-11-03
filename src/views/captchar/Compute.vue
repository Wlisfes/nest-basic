<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Compute',
    setup() {
        return () => (
            <common-container native-style={{ padding: '20px' }} react-style={{ padding: '64px 32px 32px' }}>
                验证统计
            </common-container>
        )
    }
})
</script>
