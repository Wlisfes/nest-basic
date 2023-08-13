<script lang="tsx">
import { defineComponent, computed, type CSSProperties } from 'vue'
import { RouterView } from 'vue-router'
import { useProvider } from '@/hooks/hook-provider'

export default defineComponent({
    name: 'Layout',
    setup() {
        const { vars, inverted } = useProvider()
        const layoutReact = computed<CSSProperties>(() => ({
            backgroundColor: vars.value.backColor
        }))

        return () => (
            <n-layout class="app-layout">
                <n-layout-header class="app-layout__header" inverted={inverted.value}>
                    <client-header></client-header>
                </n-layout-header>
                <n-layout
                    class="app-layout__content"
                    position="absolute"
                    native-scrollbar={false}
                    inverted={inverted.value}
                    style={layoutReact.value}
                >
                    <RouterView></RouterView>
                </n-layout>
            </n-layout>
        )
    }
})
</script>

<style lang="scss" scoped>
.app-layout {
    height: 100%;
    &__header {
        height: 60px;
    }
    &__content {
        top: 60px;
    }
}
</style>
