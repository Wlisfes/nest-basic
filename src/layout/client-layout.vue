<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
    name: 'ClientLayout',
    setup() {
        return () => (
            <n-layout has-sider style={{ height: '100%' }}>
                <RouterView></RouterView>
            </n-layout>
        )
    }
})
</script>
