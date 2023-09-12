<script lang="tsx">
import { defineComponent, onMounted, type PropType } from 'vue'
import { useResize } from '@/hooks/hook-resize'
import { VueDraggable } from 'vue-draggable-plus'
import { createNotice } from '@/utils/utils-naive'
import { router } from '@/router'
import * as http from '@/api/instance.service'

export default defineComponent({
    name: 'Currenter',
    components: { VueDraggable },
    props: {
        command: {
            type: String as PropType<'CREATE' | 'UPDATE'>,
            default: 'CREATE'
        }
    },
    setup(props) {
        const { mobile } = useResize()

        /**保存表单**/
        async function onSubmit(evt: { width: number; jsonDate: Record<string, any>; jsonMjml: string; setState: Function }) {
            if (props.command === 'CREATE') {
                /**创建邮件模板**/
                try {
                    await evt.setState({ loading: true })
                    const { message } = await http.httpCreateMailerTemplate({
                        name: '测试模板',
                        width: evt.width,
                        mjml: evt.jsonMjml,
                        json: evt.jsonDate
                    })
                    return await createNotice({ type: 'success', title: message, onAfterEnter: router.back })
                } catch (e) {
                    return await createNotice({
                        type: 'error',
                        title: e.message,
                        onAfterEnter: () => evt.setState({ loading: false })
                    })
                }
            } else if (props.command === 'UPDATE') {
                /**编辑邮件模板**/
                try {
                    await evt.setState({ loading: true })
                    const { message } = await http.httpUpdateMailerTemplate({
                        id: 16,
                        name: '测试模板',
                        width: evt.width,
                        mjml: evt.jsonMjml,
                        json: evt.jsonDate
                    })
                    return await createNotice({ type: 'success', title: message, onAfterEnter: router.back })
                } catch (e) {
                    return await createNotice({
                        type: 'error',
                        title: e.message,
                        onAfterEnter: () => evt.setState({ loading: false })
                    })
                }
            }
        }

        return () => (
            <common-container position="customize">
                <mailer-currenter command={props.command} onSubmit={onSubmit}></mailer-currenter>
            </common-container>
        )
    }
})
</script>
