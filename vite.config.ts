import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
    const root = process.cwd()
    const env = loadEnv(mode, root)

    return {
        plugins: [
            vue(),
            vueJsx(),
            AutoImport({
                resolvers: [NaiveUiResolver(), IconsResolver()]
            }),
            Components({
                dts: true,
                deep: true,
                extensions: ['vue', 'tsx'],
                include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/, /\.tsx\?tsx/],
                dirs: [
                    'src/components',
                    'src/layout',
                    'src/views/nodemailer/common',
                    'src/views/nodemailer/components',
                    'src/views/captchar/common'
                ],
                resolvers: [
                    NaiveUiResolver(),
                    IconsResolver({
                        prefix: false,
                        enabledCollections: ['icon']
                    })
                ]
            }),
            Icons({
                autoInstall: true,
                compiler: 'vue3',
                customCollections: {
                    icon: FileSystemIconLoader('./src/assets/icons')
                }
            })
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        build: {
            outDir: 'dist',
            assetsDir: 'static'
        },
        css: {
            modules: {
                generateScopedName: '[local]___[hash:5]',
                localsConvention: 'camelCase'
            }
        },
        server: {
            hmr: true,
            port: 4000,
            open: true,
            host: '0.0.0.0',
            proxy: {
                [`/api/common`]: {
                    target: `http://127.0.0.1:5010`,
                    ws: true,
                    changeOrigin: true
                },
                [`/api/nodemailer`]: {
                    target: `http://127.0.0.1:5020`,
                    ws: true,
                    changeOrigin: true
                },
                [`/api/captchar`]: {
                    target: `http://127.0.0.1:5030`,
                    ws: true,
                    changeOrigin: true
                }
            }
        }
    }
})
