<script lang="tsx">
import { defineComponent, Fragment, type PropType } from 'vue'
import { useLocale } from '@/hooks/hook-locale'
import { compute, sompute } from '@/utils/utils-remix'
import { whereProperter, createElement } from '@/utils/utils-layout'
import { divineColumn } from '@/utils/utils-common'
import { type MailerApplication } from '@/api/http-email'

export default defineComponent({
    name: 'ClientService',
    props: {
        node: { type: Object as PropType<MailerApplication>, required: true },
        mobile: { type: Boolean, default: false }
    },
    setup(props, { slots }) {
        const { CLIENT_SERVICE } = useLocale()
        const CLIENT_TAG_TYPE = {
            inactivated: 'default',
            activated: 'success',
            disable: 'warning',
            delete: 'error'
        }

        return () => (
            <n-card class="client-service" embedded content-style={whereProperter(props.mobile, { padding: '16px 16px' })}>
                <n-space size={10} wrap-item={false} align="center">
                    <n-alert class="el-customize" type="success" show-icon={false} style={{ padding: '8px', borderRadius: '50%' }}>
                        <n-button text focusable={false}>
                            <n-icon component={compute('Service')} size={32} />
                        </n-button>
                    </n-alert>
                    <common-reactive
                        reverse
                        style={{ flex: 1, overflow: 'hidden' }}
                        label="应用名称"
                        content={
                            <n-h2 tag="h3" style={{ margin: 0 }}>
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
                        <common-reactive label="App ID" content={props.node.uid}></common-reactive>
                    </n-grid-item>
                    <n-grid-item>
                        <common-reactive label="App Key" content={props.node.appKey}></common-reactive>
                    </n-grid-item>
                    <n-grid-item span={2}>
                        <common-reactive
                            label="App Secret"
                            tooltip
                            trigger={props.mobile ? 'click' : 'hover'}
                            content={props.node.appSecret}
                        ></common-reactive>
                    </n-grid-item>
                </n-grid>
                <n-divider style={whereProperter(props.mobile, { margin: '14px 0' }, { margin: '20px 0' })} />
                <n-space size={10} wrap-item={false} align="center">
                    <n-avatar round size={34} src={props.node.user.avatar} />
                    <common-reactive
                        reverse
                        style={{ flex: 1 }}
                        label={props.node.createTime}
                        content={props.node.user.nickname}
                    ></common-reactive>
                </n-space>
            </n-card>
        )
    }
})
</script>

<style lang="scss" scoped>
.client-service {
    position: relative;
}
</style>
