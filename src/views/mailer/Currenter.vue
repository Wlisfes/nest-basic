<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { useResize } from '@/hooks/hook-resize'
import { VueDraggable } from 'vue-draggable-plus'
import { createNotice } from '@/utils/utils-naive'
import { router } from '@/router'
import * as http from '@/api/instance.service'

export default defineComponent({
    name: 'Currenter',
    components: { VueDraggable },
    setup() {
        const { mobile } = useResize()

        /**保存表单**/
        async function onSubmit(evt: { json: Record<string, any>; mjml: string; setState: Function }) {
            try {
                await evt.setState({ loading: true })
                const { message } = await http.httpCreateMailerTemplate({
                    name: '测试模板',
                    mjml: evt.mjml,
                    json: evt.json
                })
                return await createNotice({
                    type: 'success',
                    title: message
                    // onAfterEnter: router.back
                })
            } catch (e) {
                return await createNotice({
                    type: 'error',
                    title: e.message,
                    onAfterEnter: () => evt.setState({ loading: false })
                })
            }
        }

        return () => (
            <common-container position="customize">
                <mailer-currenter onSubmit={onSubmit}></mailer-currenter>
            </common-container>
        )
    }
})
</script>
