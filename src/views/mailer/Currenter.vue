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
        function onSubmit(evt: { width: number; url: string; jsonMjml: string; jsonDate: Record<string, any>; setState: Function }) {
            /**创建邮件模板**/
            if (props.command === 'CREATE') {
                return evt.setState({ loading: true }).finally(async () => {
                    try {
                        const { message } = await http.httpCreateMailerTemplate({
                            name: '测试模板',
                            cover: evt.url,
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
                })
            }

            /**编辑邮件模板**/
            if (props.command === 'UPDATE') {
                return evt.setState({ loading: true }).finally(async () => {
                    try {
                        console.log(evt)
                        const { message } = await http.httpUpdateMailerTemplate({
                            id: 28,
                            name: '测试模板',
                            cover: evt.url,
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
                })
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
