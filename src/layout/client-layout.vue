<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { RouterView } from 'vue-router'
import { useProvider } from '@/hooks/hook-provider'

export default defineComponent({
    name: 'ClientLayout',
    setup() {
        const { vars, inverted } = useProvider()

        return () => (
            <n-layout has-sider style={{ height: '100%' }}>
                <n-layout-sider width={280} native-scrollbar={false} collapse-mode="width"></n-layout-sider>
                <n-layout>
                    <n-layout style={{ backgroundColor: vars.value.backColor }} position="absolute" inverted={inverted.value}>
                        <RouterView></RouterView>
                    </n-layout>
                </n-layout>
            </n-layout>
        )
    }
})
</script>
