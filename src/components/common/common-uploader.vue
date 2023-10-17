<script lang="tsx">
import type { UploadInst, UploadProps, UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui'
import { defineComponent, ref, computed, Fragment, type PropType } from 'vue'
import { compute } from '@/utils/utils-compute'
import { baseURL } from '@/utils/utils-request'
import { createMounte, divineHandler, divineCreateFormDatar } from '@/utils/utils-common'
import { Observer } from '@/utils/utils-observer'
import { createNotice } from '@/utils/utils-naive'
import * as http from '@/api/instance.service'

export default defineComponent({
    name: 'CommonUploader',
    props: {
        observer: { type: Object as PropType<Observer<Record<string, any>>> },
        baseURL: { type: String, default: baseURL },
        elementProps: { type: Object as PropType<UploadProps>, default: () => ({}) },
        elementData: { type: Array as PropType<Array<UploadFileInfo>>, default: () => [] },
        elementSuccess: { type: Function, default: Function },
        elementFailure: { type: Function, default: Function },
        elementReset: { type: Function, default: Function },
        elementRemove: { type: Function, default: Function }
    },
    emits: ['success', 'failure', 'reset', 'remove'],
    setup(props, { emit }) {
        const instance = ref<UploadInst>()
        const elementProps = computed<UploadProps>(() => ({
            directoryDnd: true,
            max: 1,
            accept: '.csv, .xlsx',
            action: (props.baseURL ?? '') + (props.elementProps ?? `/api-basic/aliyun-oss/resolve/excel`),
            defaultFileList: props.elementData,
            ...props.elementProps
        }))

        createMounte(async () => {
            await divineHandler(!!props.observer, () => {
                props.observer?.on('reset', () => {
                    if (instance.value) {
                        instance.value.clear()
                        props.elementReset()
                        emit('reset')
                    }
                })
            })
        })

        /**文件上传前钩子函数**/
        async function fetchBeforeUpload({ file }: { file: UploadFileInfo }) {
            const suffix = file.file?.name.slice(file.file.name.lastIndexOf('.'))
            const checkAccept = elementProps.value.accept?.split(',').some(name => name.trim() === suffix)
            if (!checkAccept) {
                return await createNotice({
                    type: 'error',
                    title: '上传失败',
                    content: () => (
                        <Fragment>
                            <n-text depth={3}>上传文件格式为</n-text>
                            <n-text type="success">csv/excel</n-text>
                            <n-text depth={3}>，且文件大小不超过1MB</n-text>
                        </Fragment>
                    )
                }).then(() => false)
            }
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
                return await createNotice({
                    type: 'success',
                    title: '上传成功',
                    onAfterEnter: () => {
                        emit('success', { ...data, file })
                        props.elementSuccess({ ...data, file })
                        onFinish()
                    }
                })
            } catch (e) {
                return await createNotice({
                    type: 'error',
                    title: '上传失败',
                    content: () => <n-text depth={3}>{e.message}</n-text>,
                    onAfterEnter: () => {
                        emit('failure', { ...e, file })
                        props.elementFailure({ ...e, file })
                        onError()
                    }
                })
            }
        }

        /**删除事件**/
        async function handleRemove({ file }: { file: UploadFileInfo }) {
            props.elementRemove({ file })
            return emit('remove', { file })
        }

        return () => (
            <n-upload
                class="common-uploader"
                ref={instance}
                {...elementProps.value}
                on-before-upload={fetchBeforeUpload}
                custom-request={fetchCustomizeRequest}
                on-remove={handleRemove}
            >
                <n-upload-dragger style={{ padding: '20px' }}>
                    <n-element class="n-chunk n-center not-selecter" style={{ columnGap: '14px' }}>
                        <n-icon depth={2} size={44} component={compute('Exceler')} />
                        <n-element class="n-chunk n-column n-auto" style={{ textAlign: 'left' }}>
                            <n-element style={{ fontSize: '16px' }}>
                                <n-text type="success">点击</n-text>/<n-text>或者拖动文件上传</n-text>
                            </n-element>
                            <n-element style={{ textAlign: 'left', fontSize: '14px' }}>
                                <n-text depth={3}>上传文件格式为</n-text>
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

<style lang="scss" scoped>
.common-uploader {
    position: relative;
    :deep(.n-upload-file-list) {
        margin-top: 0;
        > .n-upload-file:first-child {
            margin-top: 8px;
        }
    }
}
</style>
