import { useClipboard } from '@vueuse/core'
import { useCurrent } from '@/locale/instance'
import { divineHandler } from '@/utils/utils-common'
import { createNotice } from '@/utils/utils-naive'

export function useSupporter() {
    const { t } = useCurrent()
    const { copy, isSupported } = useClipboard()

    /**复制事件**/
    async function setSupporter(value: string | number = '') {
        return await divineHandler(isSupported.value, async () => {
            try {
                await copy(value.toString())
                return await createNotice({ title: t('common.copy.notice') })
            } catch (e) {
                return await createNotice({ type: 'error', title: t('common.copy.fail') })
            }
        }).then(result => {
            return divineHandler(!result, () => {
                return createNotice({ type: 'error', title: t('common.copy.supported') })
            })
        })
    }

    return { t, copy, isSupported, setSupporter }
}
