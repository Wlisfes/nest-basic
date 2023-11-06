<script lang="tsx">
import { defineComponent, type PropType } from 'vue'
import { useLocale } from '@/hooks/hook-locale'
import { compute } from '@/utils/utils-compute'
import { divineColumn } from '@/utils/utils-common'

export default defineComponent({
    name: 'CaptcharSuppor',
    props: {
        value: { type: String, required: true }
    },
    setup(props) {
        const { CAPTCHAR_SUPPOR } = useLocale()

        return () => (
            <n-tag
                round
                bordered={false}
                type={divineColumn(CAPTCHAR_SUPPOR.value, props.value, { key: 'type' })}
                style={{ marginBottom: 'auto', padding: '0 10px 0 15px' }}
            >
                {{
                    default: () => <span>{divineColumn(CAPTCHAR_SUPPOR.value, props.value, { key: 'label' })}</span>,
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
