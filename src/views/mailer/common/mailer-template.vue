<script lang="tsx">
import type { ButtonProps, DropdownOption } from 'naive-ui'
import { defineComponent, type PropType } from 'vue'
import { useCurrent } from '@/locale/instance'
import { compute, sompute, type INameUI } from '@/utils/utils-compute'
import { divineDelay } from '@/utils/utils-common'
import { createElement } from '@/utils/utils-layout'
import { createDiscover, createNotice } from '@/utils/utils-naive'
import { createNodeRender } from '@/utils/utils-instance'
import { transfer } from '@/utils/utils-transfer'
import { router } from '@/router'
import type { MailerTemplate } from '@/interface/mailer.resolver'

export default defineComponent({
    name: 'MailerTemplate',
    props: {
        node: { type: Object as PropType<MailerTemplate>, required: true },
        mobile: { type: Boolean, default: false }
    },
    emit: ['update'],
    setup(props, { emit }) {
        const { t } = useCurrent()

        /**操作指令**/
        async function onSelecter(scope: { key: 'update' | 'delete' }) {
            /**编辑指令**/
            if (scope.key === 'update') {
                return router.push(`/mailer/update/currenter?keyId=${props.node.id}`)
            }

            /**删除指令**/
            if (scope.key === 'delete') {
                const { element } = await createNodeRender(<n-text type="error">{props.node.name}</n-text>, {
                    style: { padding: '0 5px', fontWeight: 600 }
                })
                return await createDiscover({
                    type: 'error',
                    title: t('common.hint.value'),
                    negativeText: t('common.cancel.value'),
                    positiveText: t('common.confirm.value'),
                    icon: createElement(sompute('WarningRound')),
                    content: () => <n-h3 v-html={t('common.delete.hint', { name: element })}></n-h3>,
                    onAfterEnter: target => transfer(target as never),
                    onPositiveClick: async (evt, vm, done: Function) => {
                        try {
                            await done(true)
                            // await httpRuleTransfer({ id: props.node.id, status: 'delete' })
                            await divineDelay(300)
                            return await createNotice({
                                title: t('common.delete.notice'),
                                onAfterEnter: () => emit('update')
                            }).then(() => true)
                        } catch (e) {
                            return await createNotice({
                                type: 'error',
                                title: e.message,
                                onAfterEnter: () => done(false)
                            }).then(() => false)
                        }
                    }
                })
            }
        }

        return () => (
            <n-card class="mailer-template" embedded content-style={{ padding: 0 }}>
                <common-scale scale={1 / 0.8} full-box={false} flex-box>
                    <n-image
                        src={props.node.cover}
                        style={{ width: '100%' }}
                        v-slots={{
                            placeholder: createElement(
                                <div class="n-chunk n-center n-middle" style={{ height: '100%' }}>
                                    {sompute('ImageHolder', { size: 64, color: 'var(--placeholder-color)' })}
                                </div>
                            )
                        }}
                    ></n-image>
                </common-scale>
                <n-element class="mailer-template__element">
                    <n-h2 style={{ marginBottom: 0 }}>
                        <n-ellipsis tooltip={{ contentStyle: { maxWidth: '240px' } }}>{props.node.name}</n-ellipsis>
                    </n-h2>
                    <n-space align="center" justify="space-between" wrap-item={false}>
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                            <n-ellipsis>{props.node.updateTime}</n-ellipsis>
                        </div>
                        <n-space align="center" wrap-item={false}>
                            <n-tooltip
                                trigger="hover"
                                v-slots={{
                                    trigger: createElement(<n-icon size={22} component={compute('PendingRound')} />),
                                    default: createElement(<span>11111</span>)
                                }}
                            ></n-tooltip>
                            <common-selecter
                                onSelecter={onSelecter}
                                element-props={{
                                    size: 'large',
                                    placement: 'top',
                                    options: [
                                        { label: '编辑模板', key: 'update', icon: 'RadixEdit', type: 'info' },
                                        { label: '删除模板', key: 'delete', icon: 'DeleteBold', type: 'error' }
                                    ],
                                    renderIcon: (scope: DropdownOption & { icon: INameUI; type: string }) => (
                                        <common-compute
                                            element-props={{ type: scope.type }}
                                            element-icon={scope.icon}
                                            element-size={20}
                                        ></common-compute>
                                    )
                                }}
                            >
                                <common-compute element-icon="Settings" element-size={24}></common-compute>
                            </common-selecter>
                        </n-space>
                    </n-space>
                </n-element>
            </n-card>
        )
    }
})
</script>

<style lang="scss" scoped>
.mailer-template {
    position: relative;
    overflow: hidden;
    &__element {
        padding: 15px 15px;
    }
}
</style>
