<script lang="tsx">
import { defineComponent, computed, Fragment, type CSSProperties } from 'vue'
import { useProvider } from '@/hooks/hook-provider'
import { useResize } from '@/hooks/hook-resize'

export default defineComponent({
    name: 'BasicSider',
    props: {
        dataClient: { type: Array, default: () => [] }
    },
    setup(props, { emit }) {
        const { vars, inverted } = useProvider()
        const { current, collapse, sider, setSider } = useResize()

        return () => (
            <n-drawer
                show={sider.value}
                z-index={3000}
                width={240}
                placement="left"
                on-mask-click={(e: MouseEvent) => setSider(false)}
                on-esc={(e: MouseEvent) => setSider(false)}
            >
                <n-menu
                    accordion
                    root-indent={24}
                    collapsed-width={80}
                    inverted={inverted.value}
                    value={current.value}
                    options={props.dataClient}
                    on-update:value={(key: string) => setSider(false)}
                    style={{ '--n-item-height': '60px' }}
                />
            </n-drawer>
        )
    }
})
</script>
