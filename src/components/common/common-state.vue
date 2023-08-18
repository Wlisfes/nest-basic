<script lang="tsx">
import { defineComponent, Fragment, watch } from 'vue'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'CommonState',
    props: {
        disabled: { type: Boolean, default: false },
        loading: { type: Boolean, default: false }
    },
    setup(props, { slots, emit }) {
        const { state, setState } = useState({
            disabled: props.disabled,
            loading: props.loading
        })

        watch(
            () => props.disabled,
            () => setState({ disabled: props.disabled })
        )
        watch(
            () => props.loading,
            () => setState({ loading: props.loading })
        )

        return () => <Fragment>{slots.default ? slots.default(state, setState) : undefined}</Fragment>
    }
})
</script>
