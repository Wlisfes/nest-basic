<script lang="tsx">
import { defineComponent, ref, computed, onMounted, Fragment, type PropType } from 'vue'
import { useCurrentElement } from '@vueuse/core'
import { isEmpty } from 'class-validator'
import { Observer } from '@/utils/utils-observer'
import { whereProperter } from '@/utils/utils-layout'
import { divineHandler } from '@/utils/utils-common'
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
        observer: { type: Object as PropType<Observer<Record<string, any>>>, required: true },
        minWidth: { type: Number },
        loading: { type: Boolean, default: false },
        probeType: { type: Number, default: 1 }, //1-会截流   2-不会截流   3-看文档
        click: { type: Boolean, default: true }, //点击列表是否派发click事件
        scrollX: { type: Boolean, default: true }, //是否开启横向滚动
        scrollY: { type: Boolean, default: true }, //是否开启纵向滚动
        bounce: { type: Boolean, default: false } //是否开启页面回弹
    },
    emits: ['scroll'],
    setup(props, { slots, emit }) {
        const instance = ref<BScroll>()
        const element = useCurrentElement<HTMLElement>()

        const whereElement = computed(() => {
            return whereProperter(isEmpty(props.minWidth), {}, { minWidth: props.minWidth + 'px' })
        })

        onMounted(() => {
            initScrollber().then(async () => {
                await divineHandler(!!props.observer, () => {
                    props.observer.on('update', (option: any) => {
                        instance.value?.scrollTo(option.left ?? 0, option.top ?? 0, 300)
                    })

                    /**刷新监听**/
                    props.observer.on('refresh', () => instance.value?.refresh())
                    /**禁用监听**/
                    props.observer.on('disable', () => instance.value?.disable())
                    /**启用监听**/
                    props.observer.on('enable', () => instance.value?.enable())
                    /**滚动监听**/
                    instance.value?.on('scroll', (evt: Event) => emit('scroll', evt))
                })
            })
        })

        /**初始化滚动插件**/
        async function initScrollber() {
            if (!element.value) {
                return new Error('element 初始化节点不存在')
            }

            return (instance.value = new BScroll(element.value, {
                probeType: props.probeType,
                click: props.click,
                scrollX: props.scrollX,
                scrollY: props.scrollY,
                bounce: props.bounce,
                mouseWheel: true,
                observeDOM: true,
                scrollbar: true
            }))
        }

        return () => (
            <n-element class="common-better">
                <div class="common-better__container" style={whereElement.value}>
                    <Fragment>{slots.default?.()}</Fragment>
                </div>
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
    &__container {
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }
    > :deep(.bscroll-vertical-scrollbar),
    > :deep(.bscroll-horizontal-scrollbar) {
        opacity: 1 !important;
        bottom: 2px !important;
        right: 2px !important;
        .bscroll-indicator {
            background-color: var(--scrollbar-color) !important;
            border: none !important;
            opacity: 1;
        }
    }
}
</style>
