<script lang="tsx">
import { defineComponent, ref, computed, onMounted, watch, type PropType } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { useState } from '@/hooks/hook-state'
import { whereProperter, createElement } from '@/utils/utils-layout'
import { createMjmlTransfor } from '@/utils/utils-mailer'
import type { MailerTemplate } from '@/interface/mailer.resolver'
import _ from 'lodash'

export default defineComponent({
    name: 'MailerTemplate',
    props: {
        node: { type: Object as PropType<MailerTemplate>, required: true },
        mobile: { type: Boolean, default: false }
    },
    setup(props) {
        const element = ref<HTMLElement>()
        const { state, setState } = useState<{ width: number; height: number }>({
            height: 0,
            width: 640
        })
        const cache = computed(() => createMjmlTransfor(props.node.mjml))

        useResizeObserver(
            element,
            _.debounce(async function (entries) {
                const entry = entries[0]
                const { width, height } = entry.contentRect
                return await setState({ width, height })
            }, 100)
        )

        return () => (
            <n-card class="mailer-template" embedded content-style={{ padding: '0px' }}>
                <n-image src={props.node.cover} style={{ width: '100%' }} />
                {/* <common-scale scale={1 / 1.2}>
                    <div ref={element} class="mailer-template__element">
                        <svg width={state.width} height={state.height} viewBox={`0 0 ${state.width} ${state.height}`}>
                            <foreignObject width="100%" height="100%">
                                <div v-html={cache.value.html}></div>
                            </foreignObject>
                        </svg>
                    </div>
                </common-scale> */}
            </n-card>
        )
    }
})
</script>

<style lang="scss" scoped>
.mailer-template {
    position: relative;
    .n-image {
        width: 100%;
        :deep(img) {
            width: 100%;
            display: block;
        }
    }
    &__element {
        position: relative;
        height: 100%;
        cursor: pointer;
    }
}
</style>
