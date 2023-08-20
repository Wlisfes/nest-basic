import { createComponent } from '@/utils/utils-instance'

/**创建、编辑应用表单**/
export async function fetchService(props: { name?: string; title: string }) {
    return await import('@/components/hooks/fetch-service.vue').then(async component => {
        return await createComponent(component.default, props)
    })
}
