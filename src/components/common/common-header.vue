<script lang="tsx">
import { defineComponent, createVNode, type PropType, type VNodeChild, type Component } from 'vue'
import { sompute } from '@/utils/utils-remix'
import { createInclude } from '@/utils/utils-layout'

export default defineComponent({
    name: 'CommonHeader',
    props: {
        titleRender: { type: Object as PropType<VNodeChild> },
        footerRender: { type: Object as PropType<VNodeChild> }
    },
    setup(props) {
        console.log(createInclude(props.footerRender as unknown as Component))
        return () => (
            <n-page-header
                on-back={Function}
                v-slots={{
                    back: () => sompute('ArrowLeftLine', { size: 30 }),
                    title: () =>
                        createVNode((props.titleRender ?? <n-h1 style={{ margin: 0 }}>让你的听觉更懂视觉</n-h1>) as unknown as Component),
                    footer: createInclude(props.footerRender as unknown as Component)
                }}
            ></n-page-header>
        )
    }
})
</script>
