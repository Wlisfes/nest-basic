<script lang="tsx">
import { defineComponent, computed, type PropType } from 'vue'
import { RouterView } from 'vue-router'
import { useProvider } from '@/hooks/hook-provider'
import { useResize } from '@/hooks/hook-resize'
import { useLoyout, formatter, type ClientOption } from '@/utils/utils-layout'

export default defineComponent({
    name: 'ClientLayout',
    props: {
        client: { type: Array as PropType<Array<ClientOption>>, default: () => [] }
    },
    setup(props) {
        const { IsSidebar } = useLoyout()
        const { vars, inverted } = useProvider()
        const { device, collapse, current, setCollapse } = useResize()
        const dataClient = computed(() => formatter(props.client))

        return () => (
            <n-layout has-sider inverted={inverted.value} style={{ height: '100%', overflow: 'hidden', position: 'relative' }}>
                <basic-sider data-client={dataClient.value}></basic-sider>
                {IsSidebar.value && (
                    <n-layout-sider
                        bordered
                        inverted={inverted.value}
                        collapsed={collapse.value}
                        width={280}
                        collapsed-width={device.value === 'Mobile' ? 0 : 80}
                        native-scrollbar={false}
                        collapse-mode="width"
                        show-trigger={device.value === 'Mobile' ? false : 'bar'}
                        style={{ padding: '32px 0 0' }}
                        onUpdateCollapsed={(collapsed: boolean) => setCollapse(collapsed)}
                    >
                        <n-menu
                            accordion
                            root-indent={24}
                            collapsed-width={80}
                            collapsed={collapse.value}
                            inverted={inverted.value}
                            value={current.value}
                            options={dataClient.value}
                            style={{ '--n-item-height': '60px' }}
                        />
                    </n-layout-sider>
                )}
                <n-layout-content inverted={inverted.value} content-style={{ overflow: 'hidden', position: 'relative' }}>
                    <RouterView></RouterView>
                </n-layout-content>
            </n-layout>
        )
    }
})
</script>
