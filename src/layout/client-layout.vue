<script lang="tsx">
import { defineComponent, computed, type PropType } from 'vue'
import { RouterView } from 'vue-router'
import { useProvider } from '@/hooks/hook-provider'
import { useResize } from '@/hooks/hook-resize'
import { formatter, type ClientOption } from '@/utils/utils-layout'

export default defineComponent({
    name: 'ClientLayout',
    props: {
        client: { type: Array as PropType<Array<ClientOption>>, default: () => [] },
        path: { type: String }
    },
    setup(props) {
        const { vars, inverted } = useProvider()
        const { device, collapse, setCollapse } = useResize()
        const dataClient = computed(() => formatter(props.client))

        return () => (
            <n-layout has-sider style={{ height: '100%' }}>
                <n-layout-sider
                    inverted={inverted.value}
                    collapsed={collapse.value}
                    width={280}
                    collapsed-width={device.value === 'Mobile' ? 0 : 80}
                    native-scrollbar={false}
                    collapse-mode="width"
                    show-trigger={device.value === 'Mobile' ? false : 'bar'}
                    style={{ padding: '32px 0 0' }}
                    onUpdateCollapsed={() => setCollapse(!collapse.value)}
                >
                    <n-menu
                        accordion
                        inverted={inverted.value}
                        root-indent={24}
                        collapsed-width={80}
                        value="/captcha/service"
                        options={dataClient.value}
                        style={{ '--n-item-height': '50px' }}
                    />
                </n-layout-sider>
                <n-layout>
                    <n-layout position="absolute" inverted={inverted.value} style={{ backgroundColor: vars.value.backColor }}>
                        <RouterView></RouterView>
                    </n-layout>
                </n-layout>
            </n-layout>
        )
    }
})
</script>
