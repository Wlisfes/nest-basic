<script lang="tsx">
import { defineComponent, computed, type CSSProperties } from 'vue'
import { RouterView } from 'vue-router'
import { useProvider } from '@/hooks/hook-provider'

export default defineComponent({
    name: 'BasicLayout',
    setup() {
        const { vars, inverted } = useProvider()
        const headerReact = computed<CSSProperties>(() => ({
            height: '60px',
            backgroundColor: inverted.value ? vars.value.cardColor : vars.value.cardColor
        }))
        const layoutReact = computed<CSSProperties>(() => ({
            top: '60px',
            backgroundColor: vars.value.backColor
        }))

        return () => (
            <n-layout style={{ height: '100%' }}>
                <n-layout-header inverted={inverted.value} style={headerReact.value}>
                    <basic-header></basic-header>
                </n-layout-header>
                <n-layout position="absolute" inverted={inverted.value} style={layoutReact.value}>
                    <RouterView></RouterView>
                </n-layout>
            </n-layout>
        )
    }
})
</script>
