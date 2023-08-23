<script lang="tsx">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { useCurrent } from '@/locale/instance'

export default defineComponent({
    name: 'Compute',
    setup() {
        const { locale, setLocale } = useCurrent()

        return () => (
            <n-el class="compute-container">
                {/* <common-screen></common-screen> */}
                <div class="app-compute">
                    <div class="n-locale">
                        <n-text class="n-locale__value" depth={1} onClick={() => setLocale(locale.value === 'cn' ? 'en' : 'cn')}>
                            {{ default: () => locale.value.toUpperCase() }}
                        </n-text>
                    </div>
                    <RouterView></RouterView>
                </div>
            </n-el>
        )
    }
})
</script>

<style lang="scss" scoped>
.compute-container {
    background: url('https://oss.lisfes.cn/stomer/2023-08/cover/1692758385264.jpg') center center / cover no-repeat;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    justify-content: center;
    align-items: flex-end;
    padding: 32px;
    box-sizing: border-box;
    @media (max-width: 1000px) {
        align-items: center;
    }
    .n-locale {
        position: absolute;
        right: -50px;
        top: -50px;
        width: 100px;
        height: 100px;
        transform: rotateZ(45deg);
        user-select: none;
        transition: all 300ms;
        background-color: var(--back-color);
        &__value {
            position: absolute;
            left: 37px;
            top: 67px;
            transform: rotateZ(-45deg);
            font-weight: 500;
            font-size: 16px;
            cursor: pointer;
            letter-spacing: 1px;
        }
    }
    .app-compute {
        position: relative;
        background-color: var(--card-color);
        border-radius: 8px;
        box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25), 0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
        width: 100%;
        max-width: 480px;
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        overflow: hidden;
        padding: 24px;
        box-sizing: border-box;
        :deep(.n-input) {
            .n-input-wrapper {
                padding: 0;
            }
            .n-input__input-el {
                max-width: calc(100% - 24px);
                padding: 8px 12px;
                box-sizing: content-box;
            }
            .n-input__placeholder {
                padding: 0 12px;
            }
            .n-input__suffix {
                position: absolute;
                height: 100%;
                margin-left: 0;
                top: 0;
                right: 12px;
            }
        }
        :deep(.n-space > div) {
            display: flex;
            cursor: pointer;
        }
        :deep(h1) {
            font-size: 30px;
            color: var(--text-color-2);
            line-height: 1.5;
            margin: 0 0 30px;
        }
        :deep(.antd-submit) {
            height: 50px;
            width: 100%;
            font-size: 16px;
            border-radius: 4px;
        }
    }
}
</style>
