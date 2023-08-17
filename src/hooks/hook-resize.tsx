import { computed, watch } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { useCommon } from '@/store/common'

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

    async function onResize() {
        if (width.value > 1080) {
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
        xs: computed(() => width.value <= 540),
        s: computed(() => width.value <= 768),
        m: computed(() => width.value <= 960),
        l: computed(() => width.value <= 1080),
        xl: computed(() => width.value <= 1280),
        xxl: computed(() => width.value <= 1680),
        xxxl: computed(() => width.value <= 1920),
        collapse: computed(() => common.collapse),
        device: computed(() => common.device),
        width,
        height,
        setCollapse
    }
}

// import { watch, computed } from 'vue'
// import { useManager } from '@/store/manager'
// import { useWindowSize } from '@vueuse/core'

// export type IDevice = 'PC' | 'IPAD' | 'MOBILE'
// export type IOption = {
//     onResize?: (e: { width: number; height: number; collapse: boolean; device: IDevice }) => void
//     onDevice?: (device: IDevice) => void
//     onCollapse?: (collapse: boolean) => void
// }

// export function useResize(option: IOption = {}) {
//     const { width, height } = useWindowSize()
//     const store = useManager()

//     function setDevice(device: IDevice) {
//         store.setDevice(device)
//         option?.onDevice?.(device)
//     }

//     function setCollapse(collapse: boolean) {
//         store.setCollapse(collapse)
//         option?.onCollapse?.(collapse)
//     }

//     function onResize() {
//         if (width.value > 1080) {
//             setDevice('PC')
//             setCollapse(false)
//         } else if (width.value > 768) {
//             setDevice('IPAD')
//             setCollapse(true)
//         } else {
//             setDevice('MOBILE')
//             setCollapse(true)
//         }
//         return option?.onResize?.({
//             width: width.value,
//             height: height.value,
//             collapse: store.collapse,
//             device: store.device as IDevice
//         })
//     }

//     watch(
//         () => [width.value, height.value],
//         () => onResize(),
//         { immediate: true }
//     )

//     return {
//         collapse: computed(() => store.collapse),
//         device: computed(() => store.device as IDevice),
//         xs: computed(() => width.value <= 540),
//         s: computed(() => width.value <= 768),
//         m: computed(() => width.value <= 960),
//         l: computed(() => width.value <= 1080),
//         xl: computed(() => width.value <= 1280),
//         xxl: computed(() => width.value <= 1680),
//         xxxl: computed(() => width.value <= 1920),
//         width,
//         height
//     }
// }
