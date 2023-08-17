<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Service',
    setup() {
        return () => (
            <common-container native-style={{ padding: '20px' }} react-style={{ padding: '64px 32px 32px' }}>
                Service
                {Array.from({ length: 50 }, (x, i) => (
                    <n-h1>{i}</n-h1>
                ))}
            </common-container>
        )
    }
})
</script>
