<script lang="tsx">
import type { TextProps } from 'naive-ui'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonPlaceholder',
    props: {
        elementProps: { type: Object as PropType<TextProps>, default: () => ({}) }
    },
    setup(props) {
        return () => (
            <n-text class="common-placeholder" {...props.elementProps}>
                <div class="element-placeholder"></div>
            </n-text>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-placeholder {
    position: relative;
    display: inline-block;
    .element-placeholder {
        width: 30px;
        height: 24px;
        background-image: linear-gradient(to right, var(--n-text-color) 0%, var(--n-text-color) 50%, transparent 50%);
        background-size: 12px 2px;
        background-repeat: repeat-x;
        background-position: left center;
    }
}
</style>
