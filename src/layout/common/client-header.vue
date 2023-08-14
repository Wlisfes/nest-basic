<script lang="tsx">
import { defineComponent } from 'vue'
import { useUser } from '@/store/user'
import { useProvider } from '@/hooks/hook-provider'
import { compute } from '@/utils/utils-remix'

export default defineComponent({
    name: 'Layout',
    setup(props) {
        const { inverted, setTheme } = useProvider()
        const user = useUser()

        return () => (
            <n-el class="client-header n-flex n-center n-space not-selecter" tag="header">
                <n-space size={8} wrap-item={false}>
                    <n-icon component={compute('Simple')} size={28} style />
                    <n-text style={{ fontSize: '24px', lineHeight: '28px' }}>Basic for Developers</n-text>
                </n-space>
                <n-space size={20} wrap-item={false} align="center">
                    <n-icon
                        class="n-pointer"
                        component={compute(inverted.value ? 'ThemeDark' : 'ThemeLight')}
                        size={24}
                        onClick={(e: Event) => setTheme(inverted.value ? 'light' : 'dark')}
                    />
                    <n-popover trigger="click">
                        {{
                            trigger: () => (
                                <n-space size={10} wrap-item={false} align="center" class="n-pointer">
                                    <n-avatar round size={36} object-fit="cover" src={user.avatar}>
                                        {{
                                            placeholder: () => <n-skeleton height="36px" width="36px" />
                                        }}
                                    </n-avatar>
                                    <n-text>{user.nickname}</n-text>
                                </n-space>
                            ),
                            default: () => <div>长得像根条一样</div>
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
