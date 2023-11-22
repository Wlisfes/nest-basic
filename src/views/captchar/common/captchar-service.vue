<script lang="tsx">
import { defineComponent, type PropType } from 'vue'
import { useDialog } from 'naive-ui'
import { useSupporter } from '@/hooks/hook-reuser'
import { compute } from '@/utils/utils-compute'
import { createNotice } from '@/utils/utils-naive'
import { httpUpdateCaptchaNameService } from '@/api/captcha.service'
import { fetchService } from '@/components/hooks/fetch-instance'
import { transfer } from '@/utils/utils-transfer'
import type { CaptcharAppwr } from '@/interface/captchar.resolver'

export default defineComponent({
    name: 'CaptcharService',
    props: {
        node: { type: Object as PropType<CaptcharAppwr>, required: true },
        mobile: { type: Boolean, default: false }
    },
    emits: ['update'],
    setup(props, { emit }) {
        const dialog = useDialog()
        const { setSupporter, isSupported } = useSupporter()

        const CLIENT_TAG_TYPE = {
            activated: 'success',
            disable: 'warning',
            delete: 'error'
        }

        function fetchUpdateService() {
            dialog.warning({
                title: '使用渲染函数',
                class: 'el-customize el-transfer',
                content: () => 'Content',
                action: () => <common-inspector></common-inspector>
            })
            // return fetchService({ title: '编辑应用服务', name: props.node.name }).then(({ observer }) => {
            //     observer.on('submit', async ({ done, data }) => {
            //         try {
            //             await done({ loading: true })
            //             const { message } = await httpUpdateCaptchaNameService({
            //                 appId: props.node.appId,
            //                 name: data.name
            //             })
            //             await done({ visible: false })
            //             await emit('update')
            //             return await createNotice({ type: 'success', title: message })
            //         } catch (e) {
            //             await done({ loading: false })
            //             return await createNotice({ type: 'error', title: e.message })
            //         }
            //     })
            // })
        }

        return () => (
            <n-card class="captchar-service" embedded content-style={{ padding: '20px' }}>
                <n-space size={10} wrap-item={false} align="center">
                    <n-alert
                        class="el-customize"
                        type={CLIENT_TAG_TYPE[props.node.status as keyof typeof CLIENT_TAG_TYPE]}
                        show-icon={false}
                        style={{ padding: '8px', borderRadius: '50%' }}
                    >
                        <n-icon component={compute('Service')} size={32} depth={1} color="var(--n-icon-color)" />
                    </n-alert>
                    <common-reactive
                        label-none
                        style={{ flex: 1, overflow: 'hidden' }}
                        content={
                            <n-h2 tag="h3" style={{ margin: 0, fontSize: '20px' }}>
                                <n-ellipsis tooltip={{ width: '300px', trigger: props.mobile ? 'click' : 'hover' }}>
                                    {props.node.name ?? '--'}
                                </n-ellipsis>
                            </n-h2>
                        }
                    ></common-reactive>
                    <captchar-suppor value={props.node.status}></captchar-suppor>
                </n-space>
                <n-grid x-gap={16} y-gap={8} cols={2} style={{ marginTop: '14px' }}>
                    <n-grid-item span={2}>
                        <common-reactive
                            label="App ID"
                            content={props.node.appId}
                            copy-icon={isSupported.value && Boolean(props.node.appId)}
                            onCopy={() => setSupporter(props.node.appId)}
                        ></common-reactive>
                    </n-grid-item>
                    <n-grid-item span={2}>
                        <common-reactive
                            label="App Secret"
                            tooltip
                            trigger={props.mobile ? 'click' : 'hover'}
                            copy-icon={isSupported.value && Boolean(props.node.appSecret)}
                            content={props.node.appSecret}
                            onCopy={() => setSupporter(props.node.appSecret)}
                        ></common-reactive>
                    </n-grid-item>
                </n-grid>
                <n-divider style={{ margin: '14px 0' }} />
                <n-space size={10} wrap-item={false} align="center">
                    <n-avatar round size={34} src={props.node.customer.avatar} />
                    <common-reactive
                        reverse
                        style={{ flex: 1, overflow: 'hidden' }}
                        label={props.node.createTime}
                        content={props.node.customer.nickname}
                    ></common-reactive>
                    <n-space size={20} wrap-item={false} align="center">
                        <n-button text focusable={false} onClick={fetchUpdateService}>
                            <n-icon component={compute('EditLine')} size={28} />
                        </n-button>
                        <n-button text focusable={false}>
                            <n-icon component={compute('Captcha')} size={28} />
                        </n-button>
                    </n-space>
                </n-space>
            </n-card>
        )
    }
})
</script>
