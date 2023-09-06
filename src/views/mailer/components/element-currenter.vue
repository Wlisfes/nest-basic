<script lang="tsx">
import { defineComponent, ref, onMounted, type PropType } from 'vue'
import { useVModels } from '@vueuse/core'
import { type NestOption } from '@/utils/utils-mailer'

export default defineComponent({
    name: 'ElementCurrenter',
    setup() {
        return () => (
            <n-element style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                <mailer-sidebar></mailer-sidebar>
                <mailer-container></mailer-container>
            </n-element>
        )
    }
})
</script>
