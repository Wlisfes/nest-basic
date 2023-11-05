<script lang="tsx">
import { defineComponent } from 'vue'
import { useResize } from '@/hooks/hook-resize'
import { sompute, type INameUI } from '@/utils/utils-compute'
import { Client, whereProperter } from '@/utils/utils-layout'
import { router } from '@/router'

export default defineComponent({
    name: 'Describe',
    setup() {
        const { mobile } = useResize()

        return () => (
            <common-container
                bordered
                mobile={mobile.value}
                content-style={whereProperter(mobile.value, { padding: '0 20px' }, { padding: '0 40px' })}
                request-style={whereProperter(mobile.value, { padding: '40px 20px 20px' }, { padding: '60px 40px 30px' })}
                request={<common-header vertical={mobile.value} title="概览"></common-header>}
            ></common-container>
        )
    }
})
</script>
