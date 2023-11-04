<script lang="tsx">
import { defineComponent, Fragment, type PropType } from 'vue'
import { compute, sompute } from '@/utils/utils-compute'
import { divineTransfer } from '@/utils/utils-common'
import { whereProperter, createElement } from '@/utils/utils-layout'
import type { BundleMailer } from '@/interface/mailer.resolver'

export default defineComponent({
    name: 'MailerPackage',
    props: {
        node: { type: Object as PropType<BundleMailer>, required: true },
        mobile: { type: Boolean, default: false }
    },
    setup(props) {
        async function onSubscriber(done: Function) {
            done({ loading: true })
        }

        return () => (
            <n-card class="mailer-package" embedded content-style={whereProperter(props.mobile, { padding: '16px 16px' })}>
                {props.node.label && (
                    <n-el tag="div" style={{ position: 'absolute', top: 0, right: 0, userSelect: 'none' }}>
                        <n-tag bordered={false} type="success" size={props.mobile ? 'small' : 'medium'}>
                            <n-ellipsis style={{ maxWidth: '140px' }} tooltip={false}>
                                {props.node.label}
                            </n-ellipsis>
                        </n-tag>
                    </n-el>
                )}
                <n-h2 style={{ flex: 1, margin: 0, overflow: 'hidden', fontSize: '24px' }}>
                    <n-ellipsis tooltip={{ width: '300px', trigger: props.mobile ? 'click' : 'hover' }}>
                        {props.node.name ?? '--'}
                    </n-ellipsis>
                </n-h2>
                <n-tag bordered={false} type="warning" size={props.mobile ? 'small' : 'medium'} style={{ marginTop: '10px' }}>
                    {`仅限${props.node.max}个`}
                </n-tag>
                <n-space
                    size={10}
                    wrap-item={false}
                    align="center"
                    style={whereProperter(props.mobile, { margin: '10px 0 20px' }, { margin: '10px 0 20px' })}
                >
                    <n-h3 type="warning" class="n-chunk n-center" style={{ margin: 0, flex: 1, overflow: 'hidden' }}>
                        <n-icon component={compute('Money')} size={20} color="var(--n-bar-color)" />
                        <n-text type="warning" style={{ marginLeft: '-2px', fontSize: '22px' }}>
                            {divineTransfer(props.node.price - props.node.discount)}
                        </n-text>
                        {props.node.discount > 0 && (
                            <n-text delete depth={3} class="n-chunk n-center" style={{ marginLeft: '5px', marginTop: '4px' }}>
                                <n-icon component={compute('Money')} size={14} color="var(--n-text-color)" />
                                <n-text depth={3} style={{ marginLeft: '-2px', fontSize: '16px' }}>
                                    {divineTransfer(props.node.price)}
                                </n-text>
                            </n-text>
                        )}
                    </n-h3>
                </n-space>
                <n-space size={10} wrap-item={false} align="center" justify="space-between">
                    <common-state
                        data-render={(e: any, done: Function) => (
                            <n-button
                                type="primary"
                                strong
                                round
                                secondary
                                disabled={e.loading || e.disabled}
                                loading={e.loading}
                                style={{ minWidth: '140px' }}
                                onClick={(evt: Event) => onSubscriber(done)}
                            >
                                立即购买
                            </n-button>
                        )}
                    ></common-state>
                    <n-tag bordered={false} size={props.mobile ? 'small' : 'medium'}>
                        {`套餐剩余${props.node.surplus}个`}
                    </n-tag>
                </n-space>
            </n-card>
        )
    }
})
</script>

<style lang="scss" scoped>
.client-mailer-package {
    position: relative;
}
</style>
