import { ref, onMounted } from 'vue'
import { useState } from '@/hooks/hook-state'
import OSSClient from 'ali-oss'
import * as http from '@/api/instance.service'

export function useOssService() {
    const loading = ref<boolean>(false)
    const client = ref<OSSClient>()

    initCreateClient()

    /**初始化创建OSS实例**/
    async function initCreateClient() {
        try {
            const { data } = await http.httpCreateOSSAuthorize()
            client.value = new OSSClient({
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
            })
        } catch (e) {}
    }
}
