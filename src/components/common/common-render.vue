<script lang="tsx">
import { defineComponent, Fragment, type PropType, type VNodeChild } from 'vue'

export default defineComponent({
    name: 'CommonRender',
    props: {
        loading: { type: Boolean, default: true },
        spin: { type: Object as PropType<VNodeChild> },
        component: { type: Object as PropType<VNodeChild> }
    },
    setup(props) {
        return () => <Fragment>{props.loading ? props.spin : props.component}</Fragment>
    }
})
</script>
