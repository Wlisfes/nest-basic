<script lang="tsx">
import { defineComponent } from 'vue'
import { useUser } from '@/store/user'
import { compute } from '@/utils/utils-remix'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'Home',
    setup(props) {
        const user = useUser()
        const { state } = useState({
            loading: false
        })

        // 云账号 API Key 是您访问Basic API 的密钥，请您务必妥善保管！
        return () => (
            <common-container max-width="1680px" react-style={{ padding: '64px 32px', margin: '20px 0' }}>
                <n-h1 strong>Welcome: Super Admin</n-h1>
                <div class="common-basic">
                    <div class="common-basic__container">
                        <n-h2 style={{ marginBottom: '10px' }}>Basic for Developers</n-h2>
                        <n-blockquote style={{ margin: '0 0 30px' }}>
                            The cloud account API Key is your key to access the Basic API, please keep it safe!
                        </n-blockquote>
                        <n-form ref="formRef" size="large" label-placement="top">
                            <n-form-item label="API Key">
                                <n-input placeholder="API Key" readonly />
                            </n-form-item>
                            <n-form-item label="API Secret" show-feedback={false}>
                                <n-input placeholder="API Secret" readonly />
                            </n-form-item>
                        </n-form>
                    </div>
                    <div class="common-basic__approve">{/* <n-skeleton height="100%" /> */}</div>
                </div>
                <div class="common-product">
                    <n-h2 style={{ marginBottom: '10px' }}>Products and Services</n-h2>
                    <n-blockquote style={{ margin: '0 0 30px' }}>
                        The cloud account API Key is your key to access the Basic API, please keep it safe!
                    </n-blockquote>
                    <n-grid x-gap={24} y-gap={24} cols={3}>
                        {Array.from({ length: 5 }, (x, index) => (
                            <n-gi key={index} style={{ backgroundColor: 'var(--back-color)' }}>
                                <common-render
                                    loading={state.loading}
                                    spin={<n-skeleton height="156px" />}
                                    component={
                                        <n-space size={15} wrap-item={false} style={{ padding: '32px' }}>
                                            <n-button text focusable={false}>
                                                <n-icon component={compute('Captcha')} size={68} />
                                            </n-button>
                                            <n-space size={5} vertical wrap-item={false} style={{ flex: 1 }}>
                                                <n-h2 style={{ marginBottom: 0, lineHeight: '36px' }}>短信</n-h2>
                                                <n-text style={{ lineHeight: '22px' }}>
                                                    <n-ellipsis tooltip={false} line-clamp={2}>
                                                        致力于为客户提供高质量、可靠的短信解决方案。
                                                    </n-ellipsis>
                                                </n-text>
                                            </n-space>
                                        </n-space>
                                    }
                                ></common-render>
                            </n-gi>
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
    }
    &__approve {
        width: 380px;
        height: 260px;
        background-color: var(--back-color);
        @media (max-width: 1080px) {
            width: 100%;
        }
    }
}

.common-product {
    position: relative;
    margin-top: 40px;
}
</style>
