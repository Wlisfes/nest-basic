<script lang="tsx">
import { defineComponent } from 'vue'
import { useCommon } from '@/store/common'

export default defineComponent({
    name: 'Layout',
    setup() {
        const store = useCommon()

        return () => (
            <n-el class="client-header" tag="header">
                <n-button onClick={() => store.setTheme(store.theme === 'light' ? 'dark' : 'light')}>{store.theme}</n-button>
            </n-el>
        )
    }
})
</script>

<style lang="scss" scoped>
.client-header {
    height: 100%;
    background-color: var(--primary-color);
}
</style>
