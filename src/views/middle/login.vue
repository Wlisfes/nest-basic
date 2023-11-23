<script lang="tsx">
import { defineComponent } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { OnClickOutside } from '@vueuse/components'
import { useCurrent } from '@/locale/instance'
import { useCustomize } from '@/hooks/hook-customize'
import { createNotice } from '@/utils/utils-naive'
import { stop } from '@/utils/utils-common'
import { httpCommonCustomerAuthorize } from '@/api/instance.service'

export default defineComponent({
    name: 'Login',
    components: { OnClickOutside },
    setup() {
        const router = useRouter()
        const { t } = useCurrent()
        const { formRef, state, setVisible, setDisabled, setLoading, divineFormValidater } = useCustomize({
            form: {
                mobile: '18888888888',
                password: '123456'
            },
            rules: {
                mobile: [
                    { required: true, trigger: ['blur', 'change'], message: t('middle.mobile.placeholder') },
                    { trigger: ['blur', 'change'], pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: t('middle.mobile.rule') }
                ],
                password: [
                    { required: true, trigger: ['blur', 'change'], message: t('middle.password.placeholder') },
                    { trigger: ['blur', 'change'], min: 6, max: 18, message: t('middle.password.rule') }
                ]
            }
        })

        /**关闭验证码**/
        async function onOutsideCloser(evt: PointerEvent) {
            await setVisible(false)
            return await setDisabled(false)
        }

        /**验证表单**/
        async function onSubmit() {
            return divineFormValidater(async () => {
                await setDisabled(true)
                await setVisible(true)
            })
        }

        /**滑动验证成功**/
        async function fetchAuthorize(e: { token: string; session: string }) {
            try {
                await setLoading(true)
                await setDisabled(true)
                await setVisible(false)
                const { data } = await httpCommonCustomerAuthorize({
                    mobile: state.form.mobile as never,
                    password: window.btoa(state.form.password as never),
                    session: e.session,
                    token: e.token
                })
                await window.$cookie.setStore(window.$cookie.APP_AUTH_TOKEN, data.token, data.expire * 1000)
                await window.$cookie.setStore(window.$cookie.APP_AUTH_EXPIRE, Date.now() + data.expire * 0.9 * 1000, data.expire * 1000)
                return await createNotice({
                    type: 'success',
                    title: data.message,
                    onAfterEnter: () => {
                        setLoading(false).finally(() => {
                            const path = window.$cookie.getStore(window.$cookie.APP_AUTH_RELACE, '/')
                            router.replace(path as string)
                        })
                    }
                })
            } catch (e) {
                return await createNotice({
                    type: 'error',
                    title: e.message,
                    onAfterEnter: async () => {
                        await setLoading(false)
                        await setDisabled(false)
                    }
                })
            }
        }

        return () => (
            <div>
                <h1>{t('middle.login.value')}</h1>
                <n-form ref={formRef} model={state.form} rules={state.rules} label-placement="left">
                    <n-form-item path="mobile">
                        <n-input
                            v-model:value={state.form.mobile}
                            maxlength={11}
                            type="text"
                            size="medium"
                            input-props={{ autocomplete: 'off' }}
                            placeholder={t('middle.mobile.placeholder')}
                        ></n-input>
                    </n-form-item>
                    <n-form-item path="password">
                        <n-input
                            v-model:value={state.form.password}
                            maxlength={16}
                            size="medium"
                            type="password"
                            show-password-on="mousedown"
                            input-props={{ autocomplete: 'new-password' }}
                            placeholder={t('middle.password.placeholder')}
                        ></n-input>
                    </n-form-item>
                    <n-form-item>
                        <n-popover trigger="manual" style={{ padding: 0 }} show={state.visible}>
                            {{
                                default: () => (
                                    <onClickOutside onTrigger={onOutsideCloser}>
                                        <common-captcha onSuccess={fetchAuthorize}></common-captcha>
                                    </onClickOutside>
                                ),
                                trigger: () => (
                                    <n-button
                                        class="antd-submit"
                                        type="info"
                                        size="medium"
                                        disabled={state.disabled}
                                        loading={state.loading}
                                        onClick={(e: Event) => stop(e, onSubmit)}
                                    >
                                        {t('middle.login.alias')}
                                    </n-button>
                                )
                            }}
                        </n-popover>
                    </n-form-item>
                    <n-form-item show-feedback={false}>
                        <n-space justify="space-between" style={{ width: '100%' }}>
                            <RouterLink replace to="/middle/register">
                                <n-a href="#">{t('middle.password.alias')}</n-a>
                            </RouterLink>
                            <RouterLink replace to="/middle/register">
                                <n-a href="#">{t('middle.register.alias')}</n-a>
                            </RouterLink>
                        </n-space>
                    </n-form-item>
                </n-form>
            </div>
        )
    }
})
</script>
@/api/user.service
