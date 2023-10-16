<script lang="tsx">
import { defineComponent } from 'vue'
import { useResizeContainer } from '@/hooks/hook-resize'

export default defineComponent({
    name: 'BulkSender',
    setup() {
        const { mobile, whereContent, whereRequest } = useResizeContainer()

        return () => (
            <common-container
                bordered
                scrollbar={true}
                mobile={mobile.value}
                loading={false}
                initialize={false}
                min-width={1080}
                content-style={whereContent.value}
                request-style={whereRequest.value}
                request={<common-header vertical={mobile.value} title="邮件群发"></common-header>}
            ></common-container>
        )
    }
})
</script>
