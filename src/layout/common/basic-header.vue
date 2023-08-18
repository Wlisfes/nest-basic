<script lang="tsx">
import { defineComponent, computed, type CSSProperties } from 'vue'
import { useFullscreen } from '@vueuse/core'
import { useUser } from '@/store/user'
import { useProvider } from '@/hooks/hook-provider'
import { useResize } from '@/hooks/hook-resize'
import { useState } from '@/hooks/hook-state'
import { useCurrent } from '@/locale/instance'
import { compute } from '@/utils/utils-remix'
import { divineDelay } from '@/utils/utils-common'
import { router } from '@/router'

export default defineComponent({
    name: 'BasicHeader',
    setup(props) {
        const user = useUser()
        const { device } = useResize()
        const { locale, t, tm, setLocale } = useCurrent()
        const { isFullscreen, toggle } = useFullscreen()
        const { inverted, setTheme } = useProvider()
        const { state, setState } = useState({ loading: false })
        const headerReact = computed<CSSProperties>(() => ({
            height: '100%',
            padding: device.value === 'Mobile' ? '0 20px' : '0 32px',
            justifyContent: device.value !== 'Mobile' ? 'space-between' : 'flex-end',
            transition: 'padding 0.3s var(--cubic-bezier-ease-in-out)'
        }))

        function logout() {
            return setState({ loading: true }).then(async () => {
                await divineDelay(500)
                await window.$cookie.delStore(window.$cookie.APP_AUTH_TOKEN)
                await window.$cookie.delStore(window.$cookie.APP_AUTH_REFRESH)
                await window.$cookie.delStore(window.$cookie.APP_AUTH_EXPIRE)
                return router.replace({ path: `/middle/login` })
            })
        }

        return () => (
            <n-el tag="header" class="n-flex n-center not-selecter" style={headerReact.value}>
                {device.value !== 'Mobile' && (
                    <router-link to="/" style={{ textDecoration: 'none' }}>
                        <n-space size={8} wrap-item={false}>
                            <n-button text focusable={false}>
                                <n-icon component={compute('Simple')} size={28} style />
                            </n-button>
                            <n-text style={{ fontSize: '24px', lineHeight: '28px' }}>{t('client.title')}</n-text>
                        </n-space>
                    </router-link>
                )}
                <n-space size={24} wrap-item={false} align="center">
                    <n-button text focusable={false}>
                        <n-badge>
                            <n-button text focusable={false}>
                                <n-icon class="n-pointer" component={compute('Speaker')} size={22} />
                            </n-button>
                        </n-badge>
                    </n-button>
                    <n-popselect
                        show-arrow
                        trigger="click"
                        value={locale.value}
                        options={tm('client.language.column')}
                        on-update:value={(value: 'en' | 'cn') => setLocale(value)}
                    >
                        <n-button text focusable={false}>
                            <n-icon class="n-pointer" component={compute('Language')} size={24} />
                        </n-button>
                    </n-popselect>
                    <n-button text focusable={false} onClick={toggle}>
                        <n-icon class="n-pointer" component={compute(isFullscreen.value ? 'Foutscreen' : 'Fullscreen')} size={25} />
                    </n-button>
                    <n-button text focusable={false} onClick={(e: Event) => setTheme(inverted.value ? 'light' : 'dark')}>
                        <n-icon class="n-pointer" component={compute(inverted.value ? 'ThemeDark' : 'ThemeLight')} size={24} />
                    </n-button>
                    <n-popover trigger="click" placement="bottom-end" style={{ width: '300px', padding: '14px 10px' }}>
                        {{
                            trigger: () => (
                                <n-space size={10} wrap-item={false} align="center" class="n-pointer">
                                    <n-avatar round size={36} object-fit="cover" src={user.avatar}></n-avatar>
                                    <n-ellipsis tooltip={false} style={{ maxWidth: '100px' }}>
                                        <n-text>{user.nickname}</n-text>
                                    </n-ellipsis>
                                </n-space>
                            ),
                            default: () => (
                                <n-el class="not-selecter" style={{ display: 'grid' }}>
                                    <div style={{ padding: '0 8px' }}>
                                        <n-h3 style={{ margin: 0 }}>{user.nickname}</n-h3>
                                        <n-text>{t('client.basic.userId', { uid: user.uid })}</n-text>
                                    </div>
                                    <n-space size={20} wrap-item={false} align="center" style={{ padding: '14px 8px 10px' }}>
                                        <n-el style={{ flex: 1, overflow: 'hidden' }}>
                                            <n-text>{t('client.basic.balance')}</n-text>
                                            <n-h3 class="n-flex n-center" style={{ margin: 0 }}>
                                                <n-icon component={compute('Money')} size={18} />
                                                <n-text style={{ marginLeft: '-2px', overflow: 'hidden' }}>
                                                    <n-ellipsis tooltip={false}>8592.56</n-ellipsis>
                                                </n-text>
                                            </n-h3>
                                        </n-el>
                                        <n-el style={{ flex: 1, overflow: 'hidden' }}>
                                            <n-text>{t('client.basic.credit')}</n-text>
                                            <n-h3 class="n-flex n-center" style={{ margin: 0 }}>
                                                <n-icon component={compute('Money')} size={18} color="var(--warning-color)" />
                                                <n-text style={{ color: 'var(--warning-color)', marginLeft: '-2px', overflow: 'hidden' }}>
                                                    <n-ellipsis tooltip={false}>200.00</n-ellipsis>
                                                </n-text>
                                            </n-h3>
                                        </n-el>
                                    </n-space>
                                    <n-button quaternary focusable={false} size="large">
                                        <n-h3 style={{ margin: 0 }}>{t('client.basic.settings')}</n-h3>
                                    </n-button>
                                    <n-button
                                        quaternary
                                        focusable={false}
                                        size="large"
                                        disabled={state.loading}
                                        loading={state.loading}
                                        onClick={logout}
                                    >
                                        <n-h3 style={{ margin: 0 }}>{t('client.basic.logout')}</n-h3>
                                    </n-button>
                                </n-el>
                            )
                        }}
                    </n-popover>
                </n-space>
            </n-el>
        )
    }
})
</script>
