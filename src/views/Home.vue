<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { useNow, useDateFormat } from '@vueuse/core'
import { compute, type INameUI } from '@/utils/utils-compute'
import { useCustomer } from '@/store/customer'
import { useResizeContainer } from '@/hooks/hook-resize'
import { useState } from '@/hooks/hook-state'
import { useSupporter } from '@/hooks/hook-reuser'
import { useCurrent } from '@/locale/instance'
import { useResize } from '@/hooks/hook-resize'
import { divineCols, divineImportfiler } from '@/utils/utils-common'

export default defineComponent({
    name: 'Home',
    setup(props) {
        const { mobile } = useResizeContainer()
        const { setSupporter } = useSupporter()
        const { t, tm } = useCurrent()
        const { width } = useResize()
        const { state } = useState({ loading: false })
        const customer = useCustomer()
        const hours = computed(() => Number(useDateFormat(useNow(), 'HH').value))
        const cols = computed(() => divineCols({ 768: 1, 1081: 2 }, width.value, 3))
        const client = computed(() => ({
            title: t('client.title'),
            document: t('client.document'),
            welcome: {
                morning: t('client.welcome.morning', { nickname: customer.nickname }),
                midday: t('client.welcome.midday', { nickname: customer.nickname }),
                afternoon: t('client.welcome.afternoon', { nickname: customer.nickname }),
                night: t('client.welcome.night', { nickname: customer.nickname })
            },
            service: {
                title: t('client.service.title'),
                document: t('client.service.document'),
                column: tm('client.service.column') as Array<{ icon: INameUI; name: string; path: string; document: string }>
            }
        }))

        return () => (
            <common-container
                scrollbar
                mobile={mobile.value}
                content-style={{
                    padding: '64px 32px 32px',
                    width: '100%',
                    maxWidth: '1680px',
                    margin: '20px auto 0',
                    backgroundColor: 'var(--card-color)'
                }}
            >
                <n-h1 strong>
                    {hours.value >= 18 ? (
                        <n-text>{client.value.welcome.night}</n-text>
                    ) : hours.value >= 13 ? (
                        <n-text>{client.value.welcome.afternoon}</n-text>
                    ) : hours.value >= 10 ? (
                        <n-text>{client.value.welcome.midday}</n-text>
                    ) : (
                        <n-text>{client.value.welcome.morning}</n-text>
                    )}
                </n-h1>
                <div class="common-basic">
                    <div class="common-basic__container">
                        <n-h2 style={{ marginBottom: '10px' }}>{client.value.title}</n-h2>
                        <n-blockquote style={{ margin: '0 0 30px' }}>{client.value.document}</n-blockquote>
                        <n-form ref="formRef" size="large" label-placement="top">
                            <n-form-item label="API Key">
                                <n-input-group style={{ backgroundColor: 'var(--input-color-disabled)' }}>
                                    <n-input value={customer.apiKey} readonly type="text" placeholder="API Key"></n-input>
                                    <n-button
                                        focusable={false}
                                        type="tertiary"
                                        style={{ padding: '0 12px' }}
                                        onClick={(e: Event) => setSupporter(customer.apiKey)}
                                    >
                                        <n-icon size={18} component={compute('CopyRound')} />
                                    </n-button>
                                </n-input-group>
                            </n-form-item>
                            <n-form-item label="API Secret" show-feedback={false}>
                                <n-input-group style={{ backgroundColor: 'var(--input-color-disabled)' }}>
                                    <n-input
                                        value={customer.apiSecret}
                                        readonly
                                        type="password"
                                        show-password-on="click"
                                        placeholder="API Secret"
                                    ></n-input>
                                    <n-button
                                        focusable={false}
                                        type="tertiary"
                                        style={{ padding: '0 12px' }}
                                        onClick={(e: Event) => setSupporter(customer.apiSecret)}
                                    >
                                        <n-icon size={18} component={compute('CopyRound')} />
                                    </n-button>
                                </n-input-group>
                            </n-form-item>
                        </n-form>
                    </div>
                    <div class="common-basic__approve">
                        <n-image preview-disabled src={divineImportfiler(`basic/login-stomer.svg`)} style={{ width: '100%' }} />
                    </div>
                </div>
                <div class="common-service">
                    <n-h2 style={{ marginBottom: '10px' }}>{client.value.service.title}</n-h2>
                    <n-blockquote style={{ margin: '0 0 30px' }}>{client.value.service.document}</n-blockquote>
                    <n-grid x-gap={24} y-gap={24} cols={cols.value}>
                        {client.value.service.column.map(item => (
                            <n-grid-item style={{ backgroundColor: 'var(--back-color)' }}>
                                <common-render loading={state.loading} spiner={<n-skeleton height="156px" />}>
                                    {{
                                        default: () => (
                                            <router-link
                                                to={item.path}
                                                style={{ textDecoration: 'none', display: 'block', height: '100%' }}
                                            >
                                                <n-space class="common-service__column" size={15} wrap-item={false}>
                                                    <n-button text focusable={false}>
                                                        <n-icon component={compute(item.icon)} size={68} />
                                                    </n-button>
                                                    <n-space size={5} vertical wrap-item={false} style={{ flex: 1 }}>
                                                        <n-h2 style={{ marginBottom: 0, lineHeight: '36px' }}>{item.name}</n-h2>
                                                        <n-text style={{ lineHeight: '22px' }}>
                                                            <n-ellipsis tooltip={false} line-clamp={2}>
                                                                {item.document}
                                                            </n-ellipsis>
                                                        </n-text>
                                                    </n-space>
                                                </n-space>
                                            </router-link>
                                        )
                                    }}
                                </common-render>
                            </n-grid-item>
                        ))}
                    </n-grid>
                </div>
            </common-container>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-basic {
    display: flex;
    overflow: hidden;
    column-gap: 50px;
    @media (max-width: 1080px) {
        flex-direction: column;
        row-gap: 32px;
    }
    &__container {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .n-input {
            background-color: var(--n-color-disabled);
        }
    }
    &__approve {
        width: 380px;
        height: 260px;
        background-color: var(--back-color);
        border-radius: var(--border-radius);
        padding: 12px;
        @media (max-width: 1080px) {
            width: 100%;
        }
        .n-image > :deep(img) {
            width: 100%;
            display: block;
        }
    }
}

.common-service {
    position: relative;
    margin-top: 40px;
    &__column {
        height: 100%;
        padding: 32px;
        min-height: 91px;
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow-1);
        transition: box-shadow 0.3s var(--cubic-bezier-ease-in-out);
        &:hover {
            box-shadow: var(--box-shadow-2);
        }
    }
}
</style>
@/store/customer
