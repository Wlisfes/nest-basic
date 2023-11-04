<script lang="tsx">
import { defineComponent, type PropType } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isEmpty } from 'class-validator'
import { createMounte, divineHandler, divineCompress } from '@/utils/utils-common'
import { VueDraggable } from 'vue-draggable-plus'
import { createNotice } from '@/utils/utils-naive'
import * as http from '@/api/instance.service'

export default defineComponent({
    name: 'Currenter',
    components: { VueDraggable },
    props: {
        command: { type: String as PropType<'CREATE' | 'UPDATE'>, default: 'CREATE' }
    },
    setup(props) {
        const route = useRoute()
        const router = useRouter()

        createMounte(async () => {
            await divineHandler(
                () => props.command === 'UPDATE' && isEmpty(route.query.keyId),
                () => {
                    return router.replace(`/mailer/template`)
                }
            )
        })

        /**保存表单**/
        function onSubmit(evt: { width: number; url: string; jsonMjml: string; jsonDate: string; setState: Function }) {
            /**创建邮件模板**/
            if (props.command === 'CREATE') {
                return evt.setState({ loading: true }).finally(async () => {
                    try {
                        const { message } = await http.httpCreateMailerTemplate({
                            name: '测试模板',
                            cover: evt.url,
                            width: evt.width,
                            mjml: evt.jsonMjml,
                            json: evt.jsonDate,
                            status: 'sketch'
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
                        const { message } = await http.httpUpdateMailerTemplate({
                            id: Number(route.query.keyId),
                            name: '测试模板',
                            cover: evt.url,
                            width: evt.width,
                            mjml: await divineCompress(evt.jsonMjml),
                            json: await divineCompress(JSON.stringify(evt.jsonDate)),
                            status: 'pending'
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
                <mailer-currenter
                    command={props.command}
                    keyId={isEmpty(route.query.keyId) ? undefined : Number(route.query.keyId)}
                    onSubmit={onSubmit}
                ></mailer-currenter>
            </common-container>
        )
    }
})
</script>
