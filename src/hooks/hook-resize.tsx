import { computed, watch, type CSSProperties } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { useCommon } from '@/store/common'
import { whereProperter } from '@/utils/utils-layout'
import IsMobile from 'is-mobile'

export type Device = 'PC' | 'IPAD' | 'Mobile'
export type Option = {
    onResize?: (e: { width: number; height: number; collapse: boolean; device: Device }) => void
}

export function useResize(option?: Option) {
    const { width, height } = useWindowSize()
    const common = useCommon()

    async function setCollapse(collapse: boolean) {
        return await common.setCollapse(collapse)
    }

    async function setCurrent(current: string) {
        return await common.setCurrent(current)
    }

    async function setSider(sider: boolean) {
        return await common.setSider(sider)
    }

    async function onResize() {
        if (width.value >= 1280) {
            common.setDevice('PC')
            common.setCollapse(false)
        } else if (width.value > 768) {
            common.setDevice('IPAD')
            common.setCollapse(true)
        } else {
            common.setDevice('Mobile')
            common.setCollapse(true)
        }
        return option?.onResize?.({
            width: width.value,
            height: height.value,
            collapse: common.collapse,
            device: common.device
        })
    }

    watch(() => [width.value, height.value], onResize, { immediate: true })

    return {
        width,
        height,
        xs: computed(() => width.value <= 540),
        s: computed(() => width.value <= 768),
        m: computed(() => width.value <= 960),
        l: computed(() => width.value <= 1080),
        xl: computed(() => width.value <= 1280),
        xxl: computed(() => width.value <= 1680),
        xxxl: computed(() => width.value <= 1920),
        collapse: computed(() => common.collapse),
        device: computed(() => common.device),
        current: computed(() => common.current),
        sider: computed(() => common.sider),
        mobile: computed(() => IsMobile() || common.device === 'Mobile'),
        setCollapse,
        setCurrent,
        setSider
    }
}

export function useResizeContainer(
    option: Partial<{
        contentStyle: { mobile: CSSProperties; default: CSSProperties }
        requestStyle: { mobile: CSSProperties; default: CSSProperties }
        customizeStyle: { mobile: CSSProperties; default: CSSProperties }
    }> = {}
) {
    const { mobile } = useResize()

    const whereContent = computed(() => {
        return whereProperter(
            mobile.value,
            option.contentStyle?.mobile ?? { padding: '0 20px' },
            option.contentStyle?.default ?? { padding: '0 40px' }
        )
    })
    const whereRequest = computed(() => {
        return whereProperter(
            mobile.value,
            option.requestStyle?.mobile ?? { padding: '40px 20px 20px' },
            option.requestStyle?.default ?? { padding: '60px 40px 30px' }
        )
    })

    const whereCustomize = computed(() => {
        return whereProperter(mobile.value, option.customizeStyle?.mobile ?? {}, option.customizeStyle?.default ?? {})
    })

    return {
        mobile,
        whereContent,
        whereRequest,
        whereCustomize
    }
}
