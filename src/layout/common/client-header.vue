<script lang="tsx">
import { defineComponent } from 'vue'
import { useFullscreen } from '@vueuse/core'
import { useUser } from '@/store/user'
import { useProvider } from '@/hooks/hook-provider'
import { compute } from '@/utils/utils-remix'
import { useCurrent } from '@/locale/instance'

export default defineComponent({
    name: 'Layout',
    setup(props) {
        const { locale, t, tm, setLocale } = useCurrent()
        const { isFullscreen, toggle } = useFullscreen()
        const { inverted, setTheme } = useProvider()
        const { uid, avatar, nickname } = useUser()

        return () => (
            <n-el class="client-header n-flex n-center n-space not-selecter" tag="header">
                <n-space size={8} wrap-item={false}>
                    <n-icon component={compute('Simple')} size={28} style />
                    <n-text style={{ fontSize: '24px', lineHeight: '28px' }}>{t('client.title')}</n-text>
                </n-space>
                <n-space size={24} wrap-item={false} align="center">
                    <n-badge>
                        <n-button text focusable={false}>
                            <n-icon class="n-pointer" component={compute('Speaker')} size={24} />
                        </n-button>
                    </n-badge>
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
                        <n-icon class="n-pointer" component={compute(isFullscreen.value ? 'Foutscreen' : 'Fullscreen')} size={24} />
                    </n-button>
                    <n-button text focusable={false} onClick={(e: Event) => setTheme(inverted.value ? 'light' : 'dark')}>
                        <n-icon class="n-pointer" component={compute(inverted.value ? 'ThemeDark' : 'ThemeLight')} size={24} />
                    </n-button>
                    <n-popover trigger="click" placement="bottom-end" style={{ width: '300px', padding: '14px 10px' }}>
                        {{
                            trigger: () => (
                                <n-space size={10} wrap-item={false} align="center" class="n-pointer">
                                    <n-avatar round size={36} object-fit="cover" src={avatar}></n-avatar>
                                    <n-ellipsis tooltip={false} style={{ maxWidth: '100px' }}>
                                        <n-text>{nickname}</n-text>
                                    </n-ellipsis>
                                </n-space>
                            ),
                            default: () => (
                                <n-el class="not-selecter" style={{ display: 'grid' }}>
                                    <div style={{ padding: '0 8px' }}>
                                        <n-h3 style={{ margin: 0 }}>{nickname}</n-h3>
                                        <n-text>{t('client.basic.userId', { uid })}</n-text>
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
                                    <n-button quaternary focusable={false} size="large">
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

<style lang="scss" scoped>
.client-header {
    height: 100%;
    padding: 0 32px;
}
</style>
