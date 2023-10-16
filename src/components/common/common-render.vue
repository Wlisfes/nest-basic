<script lang="tsx">
import { defineComponent, Fragment, type PropType, type VNodeChild } from 'vue'

export default defineComponent({
    name: 'CommonRender',
    props: {
        loading: { type: Boolean, default: true },
        spiner: { type: Object as PropType<VNodeChild> }
    },
    setup(props, { slots }) {
        return () => <Fragment>{props.loading ? props.spiner : slots.default?.()}</Fragment>
    }
})
</script>
