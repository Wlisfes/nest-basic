import { type INameUI } from '@/utils/utils-remix'
import { Observer } from '@/utils/utils-observer'
import MjmlTransfor from 'mjml-browser'
import JsonTransfor from 'json2mjml'

export enum NestBlock {
    MJ_SECTION = 'mj-section',
    MJ_COLUMN = 'mj-column',
    MJ_TEXT = 'mj-text',
    MJ_BUTTON = 'mj-button',
    MJ_IMAGE = 'mj-image',
    MJ_DIVIDER = 'mj-divider',
    MJ_SOCIAL = 'mj-social',
    MJ_NAVBAR = 'mj-navbar',
    MJ_HERO = 'mj-hero',
    MJ_WRAPPER = 'mj-wrapper'
}
export interface NestBlocks {
    uid: number
    name: string
    component: NestBlock
    icon: INameUI
    source: 'Layout' | 'Element'
}
export interface NestSource {}
export interface NestOption {
    uid: number
    tagName: NestBlock
    attributes: Record<string, any>
    children: Array<NestOption>
    content?: string
}
export interface NestState {
    current: NestOption | undefined
    execute: boolean
    loading: boolean
}

export const OBSERVER_START_DRAG_EVENT = 'OBSERVER_START_DRAG_EVENT'
export const OBSERVER_END_DRAG_EVENT = 'OBSERVER_END_DRAG_EVENT'
export const observer = new Observer()
export type EventListener = typeof OBSERVER_START_DRAG_EVENT | typeof OBSERVER_END_DRAG_EVENT

/**事件监听**/
export function elementListener(type: EventListener, handler: Function) {
    return observer.on(type, (data: any) => handler(data))
}

/**拖拽中**/
export function onMoveDraggableElement() {}

/**组件克隆**/
export function cloneElement(setState: Function, data: NestBlocks) {
    setState && setState()
    if (data.component === NestBlock.MJ_COLUMN) {
        const COUNT_COLUMN = { BasicColumn: 1, BasicDouble: 2, BasicThree: 3 }
        const children = Array.from({ length: COUNT_COLUMN[data.icon as keyof typeof COUNT_COLUMN] }).map(item => {
            // return createColumnComponent([createTextComponent('<p>Holle</b>')])
            return createColumnComponent()
        })
        return createSectionComponent(children)
    } else if (data.component === NestBlock.MJ_TEXT) {
        return createTextComponent()
    } else if (data.component === NestBlock.MJ_BUTTON) {
        return createButtonComponent('Get Your Order Here')
    } else if (data.component === NestBlock.MJ_IMAGE) {
        return createImageComponent(`https://www.online-image-editor.com//styles/2014/images/example_image.png`)
    } else if (data.component === NestBlock.MJ_DIVIDER) {
        return createDividerComponent()
    } else if (data.component === NestBlock.MJ_SOCIAL) {
        return createSocialComponent({})
    } else if (data.component === NestBlock.MJ_NAVBAR) {
        return createNavbarComponent({})
    } else if (data.component === NestBlock.MJ_HERO) {
        return createHeroComponent({})
    } else if (data.component === NestBlock.MJ_WRAPPER) {
        return createWrapperComponent({})
    }
}

/**组件列表**/
export const nestBlocks: Array<NestBlocks> = [
    { uid: 1694254623436221, name: '1 Column', source: 'Layout', component: NestBlock.MJ_COLUMN, icon: 'BasicColumn' },
    { uid: 1694254623436222, name: '2 Columns', source: 'Layout', component: NestBlock.MJ_COLUMN, icon: 'BasicDouble' },
    { uid: 1694254623436223, name: '3 Columns', source: 'Layout', component: NestBlock.MJ_COLUMN, icon: 'BasicThree' },
    { uid: 1694254623436224, name: 'Text', source: 'Element', component: NestBlock.MJ_TEXT, icon: 'BasicText' },
    { uid: 1694254623436225, name: 'Button', source: 'Element', component: NestBlock.MJ_BUTTON, icon: 'BasicButton' },
    { uid: 1694254623436226, name: 'Image', source: 'Element', component: NestBlock.MJ_IMAGE, icon: 'BasicImage' },
    { uid: 1694254623436227, name: 'Divider', source: 'Element', component: NestBlock.MJ_DIVIDER, icon: 'BasicDivider' },
    { uid: 1694254623436228, name: 'Social', source: 'Element', component: NestBlock.MJ_SOCIAL, icon: 'BasicSocial' },
    { uid: 1694254623436229, name: 'Navbar', source: 'Element', component: NestBlock.MJ_NAVBAR, icon: 'BasicNavbar' },
    { uid: 1694254623436230, name: 'Hero', source: 'Layout', component: NestBlock.MJ_HERO, icon: 'BasicHero' },
    { uid: 1694254623436231, name: 'Wrapper', source: 'Layout', component: NestBlock.MJ_WRAPPER, icon: 'BasicWrapper' }
]

/**预览**/
export async function createCheckElement(value: string) {
    const min = window.open() as Window
    return (min.document.body.innerHTML = value)
}

/**过滤组件列表**/
export function createNestBlocks(source: 'Layout' | 'Element') {
    return nestBlocks.filter(item => item.source === source)
}

/**根据毫秒生成16位整数**/
export function createMathNumber() {
    return Number(Date.now().toString() + (Math.ceil(Math.random() * 888) + 111).toString())
}

/**MJML转(JSON、HTML)**/
export function createMjmlTransfor(value: string) {
    return MjmlTransfor(value)
}

/**JSON转MJML**/
export function createJsonTransfor(value: Record<string, any>) {
    return JsonTransfor(value)
}

/**邮件模板JSON转换、去除多余字段**/
export function createJsonRemoveTransfer(data: Record<string, any>) {
    return {
        attributes: data.attributes ?? {},
        tagName: data.tagName ?? '',
        content: data.content ?? '',
        children: (data.children ?? []).map((item: any) => createJsonRemoveTransfer(item))
    }
}

/**对象Key转化**/
export function createCameTransfor(data: Record<string, any>, reverse: boolean = false) {
    return Object.keys(data).reduce((current, key) => {
        if (reverse) {
            const name = key.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
            current[name] = data[key]
        } else {
            const name = key.replace(/[A-Z]/g, match => '-' + match.toLowerCase())
            current[name] = data[key]
        }
        return current
    }, Object.assign({}))
}

/**json样式值转化**/
export function createStyleCameTransfor(data: Record<string, any>, reverse: boolean = false) {
    if (reverse) {
        const CSSPropertie = {
            'padding-left': (value: string) => parseFloat(value),
            'padding-right': (value: string) => parseFloat(value),
            'padding-bottom': (value: string) => parseFloat(value),
            'padding-top': (value: string) => parseFloat(value),
            'font-size': (value: string) => parseFloat(value),
            'border-radius': (value: string) => parseFloat(value)
        }
        return Object.keys(data).reduce((current, key) => {
            const valueTransfor = CSSPropertie[key as keyof typeof CSSPropertie]
            current[key] = valueTransfor ? valueTransfor(data[key]) : data[key]
            return current
        }, Object.assign({}))
    } else {
        const CSSPropertie = {
            paddingLeft: (value: number) => value + 'px',
            paddingRight: (value: number) => value + 'px',
            paddingBottom: (value: number) => value + 'px',
            paddingTop: (value: number) => value + 'px',
            fontSize: (value: number) => value + 'px',
            borderRadius: (value: number) => value + 'px'
        }
        return Object.keys(data).reduce((current, key) => {
            const valueTransfor = CSSPropertie[key as keyof typeof CSSPropertie]
            current[key] = valueTransfor ? valueTransfor(data[key]) : data[key]
            return current
        }, Object.assign({}))
    }
}

/**json样式驼峰字段转化**/
export function createJsonCameTransfor(data: Record<string, any>, reverse: boolean = false) {
    data.attributes = createCameTransfor(createStyleCameTransfor(data.attributes ?? {}, reverse), reverse)
    if (data.children && data.children.length > 0) {
        data.children = data.children.map((node: Record<string, any>) => createJsonCameTransfor(node, reverse))
    }
    return data
}

/**默认JSON参数**/
export function createJsonRender(children: Array<NestOption> = []) {
    return {
        tagName: 'mjml',
        attributes: {},
        children: [
            {
                tagName: 'mj-head',
                attributes: {},
                children: [
                    {
                        tagName: 'mj-style',
                        attributes: { inline: 'inline' },
                        content: `.reset-p p { margin: '0px' }`
                    }
                ]
            },
            {
                tagName: 'mj-body',
                attributes: {},
                children
            }
        ]
    }
}

/**Section组件JSON**/
export function createSectionComponent(children: Array<NestOption> = []) {
    return {
        uid: createMathNumber(),
        tagName: NestBlock.MJ_SECTION,
        attributes: {
            paddingLeft: 0,
            paddingRight: 0,
            paddingBottom: 10,
            paddingTop: 10,
            backgroundColor: '#ffffff'
        },
        children
    }
}

/**Column组件JSON**/
export function createColumnComponent(children: Array<NestOption> = []) {
    return {
        uid: createMathNumber(),
        tagName: NestBlock.MJ_COLUMN,
        attributes: {
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 0,
            paddingTop: 0
        },
        children
    }
}

/**Text组件JSON**/
export function createTextComponent(content: string = '') {
    return {
        uid: createMathNumber(),
        tagName: NestBlock.MJ_TEXT,
        content,
        attributes: {
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 0,
            paddingTop: 0,
            lineHeight: 1.6,
            fontSize: 14
        }
    }
}

/**Button组件JSON**/
export function createButtonComponent(content: string = '') {
    return {
        uid: createMathNumber(),
        tagName: NestBlock.MJ_BUTTON,
        content,
        attributes: {
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 5,
            paddingTop: 5,
            innerPadding: '10px 20px',
            align: 'center',
            backgroundColor: '#414141',
            fontSize: 14,
            lineHeight: 1.3,
            color: '#ffffff',
            fontWeight: 'normal',
            borderRadius: 0
        }
    }
}

/**Image组件JSON**/
export function createImageComponent(src: string = '') {
    return {
        uid: createMathNumber(),
        tagName: NestBlock.MJ_IMAGE,
        attributes: {
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 10,
            paddingTop: 10,
            align: 'center',
            src: src,
            srcset: '',
            alt: '',
            width: 400,
            borderRadius: 0
        }
    }
}

/**Divider组件JSON**/
export function createDividerComponent() {
    return {
        uid: createMathNumber(),
        tagName: NestBlock.MJ_DIVIDER,
        attributes: {}
    }
}

/**Social组件JSON**/
export function createSocialComponent(attributes: Record<string, any>, children: Array<NestOption> = []) {
    return {
        uid: createMathNumber(),
        tagName: NestBlock.MJ_SOCIAL,
        attributes,
        children
    }
}

/**Navbar组件JSON**/
export function createNavbarComponent(attributes: Record<string, any>, children: Array<NestOption> = []) {
    return {
        uid: createMathNumber(),
        tagName: NestBlock.MJ_NAVBAR,
        attributes,
        children
    }
}

/**Hero组件JSON**/
export function createHeroComponent(attributes: Record<string, any>, children: Array<NestOption> = []) {
    return {
        uid: createMathNumber(),
        tagName: NestBlock.MJ_HERO,
        attributes,
        children
    }
}

/**Wrapper组件JSON**/
export function createWrapperComponent(attributes: Record<string, any>, children: Array<NestOption> = []) {
    return {
        uid: createMathNumber(),
        tagName: NestBlock.MJ_WRAPPER,
        attributes,
        children
    }
}
