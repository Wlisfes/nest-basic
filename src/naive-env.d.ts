import { LoadingBarInst } from 'naive-ui/lib/loading-bar'
import { NotificationApiInjection } from 'naive-ui/lib/notification'
import { DialogApiInjection } from 'naive-ui/lib/dialog'
import { MessageApiInjection } from 'naive-ui/lib/message'
import { CookieStorage } from '@/utils/utils-cookie'

declare global {
    interface Window {
        $message: MessageApiInjection
        $loading: LoadingBarInst
        $notification: NotificationApiInjection
        $dialog: DialogApiInjection
        $cookie: CookieStorage
        InlineEditor: typeof import('@ckeditor/ckeditor5-build-inline')['default']
        AliyunUpload: {
            Vod: new (option) => any
        }
        LZString: {
            compress: (o: string) => string
            compressToBase64: (r: string) => string
            decompress: (r: string) => string
            decompressFromBase64: (r: string) => string
        }
    }
}
