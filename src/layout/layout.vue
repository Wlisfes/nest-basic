<script lang="tsx">
import { defineComponent, computed, type CSSProperties } from 'vue'
import { RouterView } from 'vue-router'
import { useProvider } from '@/hooks/hook-provider'

export default defineComponent({
    name: 'Layout',
    setup() {
        const { vars, inverted } = useProvider()
        const headerReact = computed<CSSProperties>(() => ({
            backgroundColor: inverted.value ? vars.value.cardColor : vars.value.cardColor
        }))
        const layoutReact = computed<CSSProperties>(() => ({
            backgroundColor: vars.value.backColor
        }))

        return () => (
            <n-layout class="client-layout">
                <n-layout-header class="client-layout__header" inverted={inverted.value} style={headerReact.value}>
                    <client-header></client-header>
                </n-layout-header>
                <n-layout class="client-layout__content" position="absolute" inverted={inverted.value} style={layoutReact.value}>
                    <RouterView></RouterView>
                </n-layout>
            </n-layout>
        )
    }
})
</script>

<style lang="scss" scoped>
.client-layout {
    height: 100%;
    &__header {
        height: 68px;
    }
    &__content {
        top: 68px;
    }
}
</style>
