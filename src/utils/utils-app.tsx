import CKEditor from '@ckeditor/ckeditor5-vue'
import { createApp, createVNode } from 'vue'
import { setupI18n } from '@/locale/instance'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'

export function createBootstrap(RootComponent: Parameters<typeof createApp>['0']) {
    const app = createApp(<common-provider>{createVNode(RootComponent)}</common-provider>)
    app.use(CKEditor)

    setupI18n(app)
    setupStore(app)
    setupRouter(app)

    return { app }
}
