<script lang="tsx">
import { defineComponent, type PropType } from 'vue'
import { useLocale } from '@/hooks/hook-locale'
import { compute } from '@/utils/utils-compute'
import { divineColumn } from '@/utils/utils-common'
const CLIENT_TAG_TYPE = {
    activated: 'success',
    disable: 'warning',
    delete: 'error'
}

export default defineComponent({
    name: 'CaptcharSuppor',
    props: {
        value: {
            type: String as PropType<keyof typeof CLIENT_TAG_TYPE>,
            required: true
        }
    },
    setup(props) {
        const { CLIENT_SERVICE } = useLocale()

        return () => (
            <n-tag round bordered={false} type={CLIENT_TAG_TYPE[props.value]} style={{ marginBottom: 'auto', padding: '0 10px 0 15px' }}>
                {{
                    default: () => <span>{divineColumn(CLIENT_SERVICE.value, props.value, { key: 'recover' })}</span>,
                    icon: (e: unknown) => {
                        return props.value === 'activated' ? (
                            <n-icon color="var(--n-text-color)" depth={1} size={20} component={compute('EnableRound')} />
                        ) : props.value === 'disable' ? (
                            <n-icon color="var(--n-text-color)" depth={1} size={20} component={compute('WarningRound')} />
                        ) : (
                            <n-icon color="var(--n-text-color)" depth={1} size={20} component={compute('CloseRound')} />
                        )
                    }
                }}
            </n-tag>
        )
    }
})
</script>
