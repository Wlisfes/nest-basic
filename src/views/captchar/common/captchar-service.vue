<script lang="tsx">
import { defineComponent, type PropType } from 'vue'
import { useSupporter } from '@/hooks/hook-reuser'
import { useCurrent } from '@/locale/instance'
import { compute, sompute, type INameUI } from '@/utils/utils-compute'
import { divineDelay } from '@/utils/utils-common'
import { createElement } from '@/utils/utils-layout'
import { createNotice, createDiscover } from '@/utils/utils-naive'
import { createNodeRender } from '@/utils/utils-instance'
import { useFormService } from '@/hooks/hook-service'
import { transfer } from '@/utils/utils-transfer'
import type { CaptcharAppwr } from '@/interface/captchar.resolver'
import * as http from '@/api/instance.service'

export default defineComponent({
    name: 'CaptcharService',
    props: {
        node: { type: Object as PropType<CaptcharAppwr>, required: true },
        mobile: { type: Boolean, default: false }
    },
    emits: ['update'],
    setup(props, { emit }) {
        const { t } = useCurrent()
        const { fetchNodeRender } = useFormService()
        const { setSupporter, isSupported } = useSupporter()

        const CLIENT_TAG_TYPE = {
            activated: 'success',
            disable: 'warning',
            delete: 'error'
        }

        /**开启编辑弹窗**/
        async function onUpdateRender() {
            return await fetchNodeRender({
                name: props.node.name,
                onSubmit: async (form: { name: string }, evt: { done: Function; destroy: Function }) => {
                    try {
                        await evt.done(true)
                        return await http.httpCaptcharUpdateAppwr({ appId: props.node.appId, name: form.name }).then(async data => {
                            await emit('update')
                            await createNotice({ type: 'success', title: data.message })
                            await evt.done(false)
                            return await evt.destroy()
                        })
                    } catch (e) {
                        await createNotice({ type: 'error', title: e.message })
                        return await evt.done(false)
                    }
                }
            })
        }

        /**重置密钥**/
        async function onResetSecret() {
            const { element } = await createNodeRender(<n-text type="error">{props.node.name}</n-text>, {
                style: { padding: '0 5px', fontWeight: 600 }
            })
            return await createDiscover({
                type: 'error',
                title: t('common.hint.value'),
                negativeText: t('common.cancel.value'),
                positiveText: t('common.confirm.value'),
                icon: createElement(sompute('WarningRound')),
                content: () => <n-h3 v-html={t('common.reset.hint', { name: element + '密钥' })}></n-h3>,
                onAfterEnter: (e: HTMLElement) => transfer(e),
                onPositiveClick: async (evt, vm, done: Function) => {
                    try {
                        await done(true)
                        return await http.httpCaptcharResetSecretAppwr({ appId: props.node.appId }).then(async data => {
                            await emit('update')
                            await createNotice({ title: t('common.reset.notice') })
                            return true
                        })
                    } catch (e) {
                        await done(false)
                        await createNotice({ type: 'error', title: e.message })
                        return false
                    }
                }
            })
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
                    <n-h2 tag="h2" style={{ margin: 0, flex: 1, overflow: 'hidden' }}>
                        <n-ellipsis tooltip={{ width: '300px', trigger: props.mobile ? 'click' : 'hover' }}>
                            {props.node.name ?? '--'}
                        </n-ellipsis>
                    </n-h2>
                    <captchar-suppor value={props.node.status}></captchar-suppor>
                </n-space>
                <n-grid x-gap={16} y-gap={8} cols={2} style={{ marginTop: '14px' }}>
                    <n-grid-item span={2}>
                        <common-reactive
                            label="App ID"
                            content={props.node.appId}
                            copy-icon={isSupported.value && Boolean(props.node.appId)}
                            onCopy={(evt: Event) => setSupporter(props.node.appId)}
                        ></common-reactive>
                    </n-grid-item>
                    <n-grid-item span={2}>
                        <common-reactive
                            label="App Secret"
                            tooltip
                            trigger={props.mobile ? 'click' : 'hover'}
                            copy-icon={isSupported.value && Boolean(props.node.appSecret)}
                            content={props.node.appSecret}
                            onCopy={(evt: Event) => setSupporter(props.node.appSecret)}
                        ></common-reactive>
                    </n-grid-item>
                </n-grid>
                <n-divider style={{ margin: '16px 0' }} />
                <n-space size={10} wrap-item={false} align="center">
                    <n-avatar round size={34} src={props.node.customer.avatar} />
                    <common-reactive
                        reverse
                        style={{ flex: 1, overflow: 'hidden' }}
                        label={props.node.createTime}
                        content={props.node.customer.nickname}
                    ></common-reactive>
                    <n-space size={20} wrap-item={false} align="center">
                        <n-button text focusable={false} onClick={onUpdateRender}>
                            <n-icon component={compute('EditLine')} size={28} />
                        </n-button>
                        <n-button text focusable={false} onClick={onResetSecret}>
                            <n-icon component={compute('Captchar')} size={28} />
                        </n-button>
                    </n-space>
                </n-space>
            </n-card>
        )
    }
})
</script>
