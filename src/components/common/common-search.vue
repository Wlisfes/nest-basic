<script lang="tsx">
import { defineComponent } from 'vue'
import { useVModels } from '@vueuse/core'
import { createElement } from '@/utils/utils-layout'
import { compute } from '@/utils/utils-compute'
import { stop, divineHandler } from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonSearch',
    props: {
        value: { type: String },
        size: { type: String, default: 'large' },
        placeholder: { type: String },
        clearable: { type: Boolean, default: true },
        disabled: { type: Boolean, default: false },
        loading: { type: Boolean, default: false }
    },
    emits: ['update', 'search'],
    setup(props, { emit }) {
        const { value, disabled, loading } = useVModels(props, emit)

        async function onSearch(e: KeyboardEvent) {
            return await divineHandler(e.code === 'Enter', () => emit('search', e))
        }

        return () => (
            <n-input
                v-model:value={value.value}
                disabled={disabled.value}
                size={props.size}
                clearable={props.clearable}
                placeholder={props.placeholder}
                on-update:value={(text: string) => emit('update', text)}
                onKeydown={(e: KeyboardEvent) => stop(e, () => onSearch(e))}
            >
                {{
                    prefix: createElement(
                        loading.value ? (
                            <n-icon size={22} component={compute('RadixSpinWith')} />
                        ) : (
                            <n-icon
                                size={22}
                                component={compute('SearchBlod')}
                                style={{ cursor: 'pointer' }}
                                onClick={(e: Event) => stop(e, () => emit('search', e))}
                            />
                        )
                    )
                }}
            </n-input>
        )
    }
})
</script>
