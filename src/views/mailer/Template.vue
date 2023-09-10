<script lang="tsx">
import { defineComponent } from 'vue'
import { useResize } from '@/hooks/hook-resize'
import { useState } from '@/hooks/hook-state'
import { whereProperter, createElement } from '@/utils/utils-layout'
import { sompute } from '@/utils/utils-remix'
import { router } from '@/router'
import { VueDraggable } from 'vue-draggable-plus'

export default defineComponent({
    name: 'Template',
    components: { VueDraggable },
    setup() {
        const { mobile } = useResize()
        const { state } = useState({
            loading: false,
            form: { name: undefined }
        })

        return () => (
            <common-container
                bordered
                content-style={whereProperter(mobile.value, { padding: '0 20px' }, { padding: '0 40px' })}
                request-style={whereProperter(mobile.value, { padding: '40px 20px 20px' }, { padding: '60px 40px 30px' })}
                request={
                    <common-header vertical={mobile.value} title="发送模板">
                        <n-space class="w-full h-full" size={14} wrap-item={false} align="center" justify="end">
                            <n-form-item show-feedback={false} show-label={false} style={{ flex: 1, maxWidth: '280px' }}>
                                <common-search
                                    v-model:value={state.form.name}
                                    loading={state.loading}
                                    disabled={state.loading}
                                    size="large"
                                    placeholder="模板名称"
                                    //onSearch={fetchUpdate}
                                ></common-search>
                            </n-form-item>
                            <n-button
                                strong
                                focusable={false}
                                type="primary"
                                size="large"
                                disabled={state.loading}
                                onClick={() => router.push(`/mailer/create/currenter`)}
                            >
                                {{ icon: createElement(sompute('AddRound')), default: createElement(<span>创建模板</span>) }}
                            </n-button>
                        </n-space>
                    </common-header>
                }
            ></common-container>
        )
    }
})
</script>

<style scoped>
.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}
</style>
