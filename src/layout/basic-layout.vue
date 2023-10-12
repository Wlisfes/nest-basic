<script lang="tsx">
import { defineComponent, computed, type CSSProperties } from 'vue'
import { RouterView } from 'vue-router'
import { useProvider } from '@/hooks/hook-provider'
import { useLoyout } from '@/utils/utils-layout'

export default defineComponent({
    name: 'BasicLayout',
    setup() {
        const { IsHeader } = useLoyout()
        const { vars, inverted } = useProvider()
        const headerReact = computed<CSSProperties>(() => ({
            height: '60px',
            backgroundColor: vars.value.cardColor
        }))
        const elementReact = computed<CSSProperties>(() => ({
            position: 'absolute',
            overflow: 'hidden',
            left: 0,
            right: 0,
            bottom: 0,
            top: IsHeader.value ? '60px' : '0px',
            backgroundColor: vars.value.backColor
        }))

        return () => (
            <n-element tag="section" style={{ height: '100%', overflow: 'hidden', position: 'relative' }}>
                {IsHeader.value && (
                    <n-layout-header inverted={inverted.value} style={headerReact.value}>
                        <basic-header></basic-header>
                    </n-layout-header>
                )}
                <n-element tag="section" style={elementReact.value}>
                    <RouterView></RouterView>
                </n-element>
            </n-element>
        )
    }
})
</script>
