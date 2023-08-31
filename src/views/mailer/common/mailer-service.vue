<script lang="tsx">
import { defineComponent, Fragment, type PropType } from 'vue'
import { useSupporter } from '@/hooks/hook-reuser'
import { useLocale } from '@/hooks/hook-locale'
import { compute, sompute } from '@/utils/utils-remix'
import { whereProperter, createElement } from '@/utils/utils-layout'
import { divineColumn } from '@/utils/utils-common'
import { createNotice } from '@/utils/utils-naive'
import { httpUpdateMailerNameService } from '@/api/mailer.service'
import { fetchService } from '@/components/hooks/fetch-instance'
import type { ServiceMailer } from '@/interface/mailer.resolver'

export default defineComponent({
    name: 'MailerService',
    props: {
        node: { type: Object as PropType<ServiceMailer>, required: true },
        mobile: { type: Boolean, default: false }
    },
    emits: ['update'],
    setup(props, { emit }) {
        const { setSupporter, isSupported } = useSupporter()
        const { CLIENT_SERVICE, t } = useLocale()
        const CLIENT_TAG_TYPE = {
            inactivated: 'default',
            activated: 'success',
            disable: 'warning',
            delete: 'error'
        }

        function fetchUpdateService() {
            return fetchService({ title: '编辑应用服务', name: props.node.name }).then(({ observer }) => {
                observer.on('submit', async ({ done, data }) => {
                    try {
                        await done({ loading: true })
                        const { message } = await httpUpdateMailerNameService({
                            appId: props.node.appId,
                            name: data.name
                        })
                        await done({ visible: false })
                        await emit('update')
                        return await createNotice({ type: 'success', title: message })
                    } catch (e) {
                        await done({ loading: false })
                        return await createNotice({ type: 'error', title: e.message })
                    }
                })
            })
        }

        return () => (
            <n-card class="mailer-service" embedded content-style={whereProperter(props.mobile, { padding: '16px 16px' })}>
                <n-space size={10} wrap-item={false} align="center">
                    <n-alert
                        class="el-customize"
                        type={CLIENT_TAG_TYPE[props.node.status as keyof typeof CLIENT_TAG_TYPE]}
                        show-icon={false}
                        style={{ padding: '8px', borderRadius: '50%' }}
                    >
                        {props.node.status === 'inactivated' ? (
                            <n-icon component={compute('Service')} size={32} depth={3} color="var(--n-icon-color)" />
                        ) : (
                            <n-icon component={compute('Service')} size={32} depth={1} color="var(--n-icon-color)" />
                        )}
                    </n-alert>
                    <common-reactive
                        reverse
                        style={{ flex: 1, overflow: 'hidden' }}
                        label="应用名称"
                        content={
                            <n-h2 tag="h3" style={{ margin: 0, fontSize: '20px' }}>
                                <n-ellipsis tooltip={{ width: '300px', trigger: props.mobile ? 'click' : 'hover' }}>
                                    {props.node.name ?? '--'}
                                </n-ellipsis>
                            </n-h2>
                        }
                    ></common-reactive>
                    <n-tag
                        round
                        bordered={false}
                        type={CLIENT_TAG_TYPE[props.node.status as keyof typeof CLIENT_TAG_TYPE]}
                        style={{ marginBottom: 'auto', padding: '0 10px 0 15px' }}
                        v-slots={{
                            icon: createElement(
                                props.node.status === 'inactivated' ? (
                                    sompute('WarningRound', { size: 20, depth: 3 })
                                ) : props.node.status === 'activated' ? (
                                    sompute('EnableRound', { size: 20, depth: 1, color: 'var(--n-text-color)' })
                                ) : props.node.status === 'disable' ? (
                                    sompute('WarningRound', { size: 20, depth: 1, color: 'var(--n-text-color)' })
                                ) : (
                                    <Fragment>{sompute('CloseRound', { size: 20, depth: 1, color: 'var(--n-text-color)' })}</Fragment>
                                )
                            ),
                            default: createElement(<span>{divineColumn(CLIENT_SERVICE.value, props.node.status, { key: 'recover' })}</span>)
                        }}
                    ></n-tag>
                </n-space>
                <n-grid x-gap={16} y-gap={8} cols={2} style={whereProperter(props.mobile, { marginTop: '16px' }, { marginTop: '20px' })}>
                    <n-grid-item>
                        <common-reactive
                            label="App ID"
                            content={props.node.appId}
                            copy-icon={isSupported.value && Boolean(props.node.appId)}
                            onCopy={() => setSupporter(props.node.appId)}
                        ></common-reactive>
                    </n-grid-item>
                    <n-grid-item>
                        <common-reactive label="App IV" content={props.node.iv}></common-reactive>
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
                <n-divider style={whereProperter(props.mobile, { margin: '14px 0' }, { margin: '20px 0' })} />
                <n-space size={10} wrap-item={false} align="center">
                    <n-avatar round size={34} src={props.node.user.avatar} />
                    <common-reactive
                        reverse
                        style={{ flex: 1, overflow: 'hidden' }}
                        label={props.node.createTime}
                        content={props.node.user.nickname}
                    ></common-reactive>
                    <n-space size={20} wrap-item={false} align="center">
                        <n-button text focusable={false} onClick={fetchUpdateService}>
                            <n-icon component={compute('EditLine')} size={28} />
                        </n-button>
                        <n-button text focusable={false}>
                            <n-icon component={compute('Captcha')} size={28} />
                        </n-button>
                        <n-button text focusable={false}>
                            <n-icon component={compute('Settings')} size={30} />
                        </n-button>
                    </n-space>
                </n-space>
            </n-card>
        )
    }
})
</script>
