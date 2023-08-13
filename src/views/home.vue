<script lang="tsx">
import { defineComponent } from 'vue'
import { useUser } from '@/store/user'

export default defineComponent({
    name: 'Home',
    setup(props) {
        const user = useUser()

        // 云账号 API Key 是您访问Basic API 的密钥，请您务必妥善保管！
        return () => (
            <common-container max-width="1680px" react-style={{ padding: '64px 32px' }}>
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
                    <div class="common-basic__approve">
                        <n-skeleton height="100%" />
                    </div>
                </div>

                <div class="common-product">
                    <n-h2 style={{ marginBottom: '10px' }}>Products and Services</n-h2>
                    <n-blockquote style={{ margin: '0 0 30px' }}>
                        The cloud account API Key is your key to access the Basic API, please keep it safe!
                    </n-blockquote>
                    <n-grid x-gap={24} y-gap={24} cols={3}>
                        {[1, 2, 3, 4, 5].map(index => (
                            <n-gi key={index}>
                                <n-skeleton height="180px" />
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
    @media (max-width: 960px) {
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
        @media (max-width: 960px) {
            width: 100%;
        }
    }
}

.common-product {
    position: relative;
    margin-top: 40px;
}
</style>
