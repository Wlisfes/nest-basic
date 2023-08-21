<script lang="tsx">
import { defineComponent } from 'vue'
import { sompute, type INameUI } from '@/utils/utils-remix'
import { router } from '@/router'
import { Client } from '@/utils/utils-layout'

export default defineComponent({
    name: 'Describe',
    setup() {
        return () => (
            <common-container native-style={{ padding: '20px' }} react-style={{ padding: '64px 32px 32px' }}>
                <common-resize></common-resize>
                <n-space vertical>
                    {Client.email.map(item => (
                        <n-button key={item.key} onClick={() => router.push(item.key)}>
                            {{
                                icon: () => sompute(item.icon as INameUI),
                                default: () => item.label
                            }}
                        </n-button>
                    ))}
                </n-space>
            </common-container>
        )
    }
})
</script>
