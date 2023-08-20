<script lang="tsx">
import { defineComponent } from 'vue'
import { useResize } from '@/hooks/hook-resize'
import { useSource } from '@/hooks/hook-source'
import { divineDelay } from '@/utils/utils-common'
import { whereProperter, createElement } from '@/utils/utils-layout'
import { compute, sompute } from '@/utils/utils-remix'
import { httpColumnMailService, type MailerApplication } from '@/api/http-email.service'

export default defineComponent({
    name: 'Package',
    setup() {
        return () => (
            <common-container native-style={{ padding: '20px' }} react-style={{ padding: '64px 32px 32px' }}>
                Package
            </common-container>
        )
    }
})
</script>
