<script lang="tsx">
import { defineComponent, ref, onMounted, Fragment } from 'vue'
import { useCurrentElement } from '@vueuse/core'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import ObserveDOM from '@better-scroll/observe-dom'
import ScrollBar from '@better-scroll/scroll-bar'
BScroll.use(MouseWheel)
BScroll.use(ObserveDOM)
BScroll.use(ScrollBar)

export default defineComponent({
    name: 'CommonBetter',
    props: {
        probeType: { type: Number, default: 1 }, //1-会截流   2-不会截流   3-看文档
        click: { type: Boolean, default: true }, //点击列表是否派发click事件
        scrollX: { type: Boolean, default: false }, //是否开启横向滚动
        scrollY: { type: Boolean, default: true }, //是否开启纵向滚动
        bounce: { type: Boolean, default: false } //是否开启页面回弹
    },
    setup(props, { slots }) {
        const instance = ref<BScroll>()
        const element = useCurrentElement<HTMLElement>()

        onMounted(() => {
            console.log(element.value)
            initScrollber()
        })

        /**初始化滚动插件**/
        function initScrollber() {
            if (!element.value) {
                return new Error('element 初始化节点不存在')
            }

            instance.value = new BScroll(element.value, {
                probeType: props.probeType,
                click: props.click,
                scrollX: props.scrollX,
                scrollY: props.scrollY,
                bounce: props.bounce,
                mouseWheel: true,
                observeDOM: true,
                scrollbar: true
            })

            console.log(instance.value)
        }

        return () => (
            <n-element class="common-better">
                <Fragment>{slots.default?.()}</Fragment>
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-better {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
</style>
