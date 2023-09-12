<script lang="tsx">
import { defineComponent, computed, type PropType } from 'vue'
import { whereProperter, createElement } from '@/utils/utils-layout'
import { createMjmlTransfor } from '@/utils/utils-mailer'
import type { MailerTemplate } from '@/interface/mailer.resolver'

export default defineComponent({
    name: 'MailerTemplate',
    props: {
        node: { type: Object as PropType<MailerTemplate>, required: true },
        mobile: { type: Boolean, default: false }
    },
    setup(props) {
        const template = computed(() => createMjmlTransfor(props.node.mjml))
        console.log(template)

        return () => (
            <n-card class="mailer-template" embedded content-style={whereProperter(props.mobile, { padding: '16px 16px' })}>
                <div v-html={template.value.html}></div>
            </n-card>
        )
    }
})
</script>
