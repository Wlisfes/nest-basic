import { computed } from 'vue'
import { useCurrent } from '@/locale/instance'

export function useLocale() {
    const { t, tm, locale } = useCurrent()

    return {
        locale,
        t,
        tm,
        CLIENT_SERVICE: computed(() => tm('enumerate.CLIENT_SERVICE'))
    }
}
