<script lang="tsx">
import type { UploadProps, UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui'
import { defineComponent, computed, type PropType } from 'vue'
import { useState } from '@/hooks/hook-state'
import { compute } from '@/utils/utils-compute'
import { baseURL } from '@/utils/utils-request'
import { divineCreateFormDatar } from '@/utils/utils-common'
import * as http from '@/api/instance.service'

export default defineComponent({
    name: 'CommonUploader',
    props: {
        baseURL: { type: String, default: baseURL },
        action: { type: String, default: `/api-basic/aliyun-oss/resolve/excel` },
        elementProps: { type: Object as PropType<UploadProps>, default: () => ({}) }
    },
    emits: [''],
    setup(props) {
        const { state, setState } = useState({
            dataSource: [] as Array<UploadFileInfo>
        })
        const elementProps = computed<UploadProps>(() => ({
            directoryDnd: true,
            max: 1,
            accept: '.csv, .xlsx',
            action: props.baseURL + props.action,
            fileList: state.dataSource,
            ...props.elementProps
        }))

        /**文件上传前钩子函数**/
        async function fetchBeforeUpload({ file }: { file: UploadFileInfo }) {
            await setState({ dataSource: [...state.dataSource, file] })
            return true
        }

        /**自定义上传**/
        async function fetchCustomizeRequest({ file, onProgress, onFinish, onError }: UploadCustomRequestOptions) {
            try {
                const { data } = await http.httpUploadExcelResolver(await divineCreateFormDatar([{ key: 'file', value: file.file }]), {
                    onUploadProgress: (pre: { progress: number; loaded: number; total: number }) => {
                        onProgress({ percent: Math.ceil((pre.loaded / pre.total) * 10000) / 100 })
                    }
                })
                console.log(data)
                onFinish()
            } catch (e) {
                console.error(e)
                onError()
            }
        }

        return () => (
            <n-upload
                class="common-uploader"
                {...elementProps.value}
                on-before-upload={fetchBeforeUpload}
                custom-request={fetchCustomizeRequest}
            >
                <n-upload-dragger style={{ padding: '20px' }}>
                    <n-element class="n-chunk n-center not-selecter" style={{ columnGap: '14px' }}>
                        <n-icon depth={2} size={48} component={compute('Exceler')} />
                        <n-element class="n-chunk n-column n-auto" style={{ textAlign: 'left' }}>
                            <n-element style={{ fontSize: '16px' }}>
                                <n-text type="success">点击</n-text>/<n-text>或者拖动文件上传</n-text>
                            </n-element>
                            <n-element style={{ textAlign: 'left', fontSize: '14px' }}>
                                <n-text depth={3}>文件格式为</n-text>
                                <n-text type="success">csv/excel</n-text>
                                <n-text depth={3}>，且文件大小不超过1MB</n-text>
                            </n-element>
                        </n-element>
                    </n-element>
                </n-upload-dragger>
            </n-upload>
        )
    }
})
</script>
