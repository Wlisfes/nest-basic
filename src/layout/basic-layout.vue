<script lang="tsx">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { useProvider } from '@/hooks/hook-provider'
import { useLoyout } from '@/utils/utils-layout'

export default defineComponent({
    name: 'BasicLayout',
    setup() {
        const { IsHeader } = useLoyout()
        const { vars, inverted } = useProvider()

        return () => (
            <n-layout
                inverted={inverted.value}
                style={{ height: '100%', overflow: 'hidden', position: 'relative' }}
                content-style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
            >
                {IsHeader.value && (
                    <n-layout-header
                        inverted={inverted.value}
                        style={{ height: '60px', zIndex: 2999, backgroundColor: vars.value.cardColor }}
                    >
                        <basic-header></basic-header>
                    </n-layout-header>
                )}
                <n-layout-content
                    class="n-chunk n-column n-auto"
                    style={{ overflow: 'hidden', position: 'relative' }}
                    content-style={{ backgroundColor: vars.value.backColor }}
                    inverted={inverted.value}
                >
                    <RouterView></RouterView>
                </n-layout-content>
            </n-layout>
        )
    }
})
</script>
