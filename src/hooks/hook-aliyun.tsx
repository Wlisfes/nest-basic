import { ref, onMounted, toRefs } from 'vue'
import { useState } from '@/hooks/hook-state'
import { moment } from '@/utils/utils-common'
import { createNotice } from '@/utils/utils-naive'
import { type OSSAuthorize } from '@/interface/aliyun.resolver'
import * as http from '@/api/instance.service'
import OSSClient from 'ali-oss'

export function useOssService(option: { immediate: boolean }) {
    const client = ref<OSSClient>()
    const { state, setState } = useState<Partial<OSSAuthorize> & { loading: boolean }>({
        endpoint: '',
        loading: false
    })

    onMounted(() => {
        if (option.immediate) {
            createClient().catch(e => {})
        }
    })

    /**初始化创建OSS实例**/
    async function createClient() {
        return await http.httpCreateOSSAuthorize().then(async ({ data }) => {
            await setState({ endpoint: `https://${data.endpoint ?? 'oss.lisfes.cn'}` })
            return (client.value = new OSSClient({
                region: data.region,
                accessKeyId: data.accessKeyId,
                accessKeySecret: data.accessKeySecret,
                stsToken: data.token,
                bucket: data.bucket,
                refreshSTSTokenInterval: data.interval,
                refreshSTSToken: () => {
                    return new Promise(async resolve => {
                        const response = await http.httpCreateOSSAuthorize()
                        resolve({
                            accessKeyId: response.data.accessKeyId,
                            accessKeySecret: response.data.accessKeySecret,
                            stsToken: response.data.token
                        })
                    })
                }
            }))
        })
    }

    /**文件重命名**/
    async function createRename(suffix: string, path: string = 'static') {
        const fileName = Date.now() + suffix
        const date = moment().format('YYYY-MM')
        return `basic/${path}/${date}/${fileName}`
    }

    /**文件上传**/
    async function createUpload(blob: Blob, option: { fileName: string; success?: Function; failure?: Function }) {
        try {
            if (!client.value) {
                await createClient()
            }
            const response = await client.value?.put(option.fileName, blob)
            if (response && response.res.status === 200) {
                return {
                    name: response.name,
                    url: `${state.endpoint}/${response.name}`
                }
            }
            throw { message: '上传失败' }
        } catch (e) {
            createNotice({
                type: 'error',
                title: e.message,
                onAfterEnter: () => setState({ loading: false })
            })
        }
    }

    return { ...toRefs(state), state, client, setState, createRename, createUpload }
}
