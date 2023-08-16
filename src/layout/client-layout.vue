<script lang="tsx">
import { defineComponent, computed, ref, type PropType } from 'vue'
import { RouterView } from 'vue-router'
import { useProvider } from '@/hooks/hook-provider'
import { formatter, type ClientOption } from '@/utils/utils-layout'

export default defineComponent({
    name: 'ClientLayout',
    props: {
        client: { type: Array as PropType<Array<ClientOption>>, default: () => [] },
        path: { type: String }
    },
    setup(props) {
        const { vars, inverted } = useProvider()
        const dataClient = computed(() => formatter(props.client))
        const collapsed = ref(true)

        return () => (
            <n-layout has-sider style={{ height: '100%' }}>
                <n-layout-sider
                    collapsed={collapsed.value}
                    width={280}
                    collapsed-width={80}
                    native-scrollbar={false}
                    collapse-mode="width"
                    show-trigger={'bar'}
                    style={{ padding: '32px 0 0' }}
                    onUpdateCollapsed={() => (collapsed.value = !collapsed.value)}
                >
                    <n-menu
                        accordion
                        root-indent={24}
                        collapsed-width={80}
                        value="/captcha/document"
                        options={dataClient.value}
                        style={{ '--n-item-height': '50px' }}
                    />
                </n-layout-sider>
                <n-layout>
                    <n-layout style={{ backgroundColor: vars.value.backColor }} position="absolute" inverted={inverted.value}>
                        <RouterView></RouterView>
                    </n-layout>
                </n-layout>
            </n-layout>
        )
    }
})
</script>
