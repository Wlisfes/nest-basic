<script lang="tsx">
import { defineComponent } from 'vue'
import { useUser } from '@/store/user'

export default defineComponent({
    name: 'Home',
    setup(props) {
        const user = useUser()

        window.addEventListener('message', sessionInfoListener)

        async function sessionInfoListener(event: any) {
            if (event.origin === 'https://www.facebook.com') {
                try {
                    const response = JSON.parse(event.data)
                    if (response.type === 'WA_EMBEDDED_SIGNUP' && response.event === 'FINISH') {
                        return console.log('FINISH:----', response)
                    } else {
                        return console.log(response)
                    }
                } catch (e) {
                    console.log('error:----', e)
                }
                console.log(event.origin, '-----', event)
            }
        }

        function onWabaFacebook() {
            if (window.fbq) {
                window.fbq('trackCustom', 'WhatsAppOnboardingStart', {
                    appId: '1225994788065812',
                    feature: 'whatsapp_embedded_signup'
                })
            }
            window.FB.login(
                (response: any) => {
                    if (response.authResponse) {
                        console.log('Welcome!  Fetching your information.... ', response)
                    } else {
                        console.log('User cancelled login or did not fully authorize.')
                    }
                },
                {
                    scope: 'whatsapp_business_management, whatsapp_business_messaging',
                    extras: {
                        feature: 'whatsapp_embedded_signup',
                        version: 2,
                        setup: {}
                    }
                }
            )
        }

        // 云账号 API Key 是您访问Basic API 的密钥，请您务必妥善保管！
        return () => (
            <common-container max-width="1680px" react-style={{ padding: '64px 32px', margin: '20px 0' }}>
                <n-h1 strong class="n-flex">
                    Welcome: Super Admin
                    <n-button type="success" onClick={onWabaFacebook}>
                        Facebook Login
                    </n-button>
                </n-h1>
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
                        {Array.from({ length: 5 }, (x, index) => (
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
