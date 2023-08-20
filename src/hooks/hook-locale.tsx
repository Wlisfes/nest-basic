import { computed } from 'vue'
import { useCurrent } from '@/locale/instance'

export function useLocale() {
    const { t, tm, at, atm, locale } = useCurrent()

    return {
        locale,
        t,
        tm,
        at,
        atm,
        CLIENT_SERVICE: computed(() => tm('enumerate.CLIENT_SERVICE'))
    }
}
