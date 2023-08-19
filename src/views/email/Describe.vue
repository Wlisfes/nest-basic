<script lang="tsx">
import { defineComponent } from 'vue'
import { router } from '@/router'

export default defineComponent({
    name: 'Describe',
    setup() {
        return () => (
            <common-container native-style={{ padding: '20px' }} react-style={{ padding: '64px 32px 32px' }}>
                概述
                <div>
                    <n-button onClick={() => router.push('/email/service')}>应用服务</n-button>
                </div>
            </common-container>
        )
    }
})
</script>
