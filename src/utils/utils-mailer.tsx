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
}
export interface NestSource {}
export interface NestOption {
    uid: number
    tagName: NestBlock
    attributes: Record<string, any>
    children: Array<NestOption>
    content?: string
}

export const OBSERVER_START_DRAG_EVENT = 'OBSERVER_START_DRAG_EVENT'
export const OBSERVER_END_DRAG_EVENT = 'OBSERVER_END_DRAG_EVENT'
export const observer = new Observer()

/**组件列表**/
export const nestBlocks: Array<NestBlocks> = [
    { uid: 1693405215421, name: '1 Column', component: NestBlock.MJ_COLUMN, icon: 'BasicColumn' },
    { uid: 1693405215422, name: '2 Columns', component: NestBlock.MJ_COLUMN, icon: 'BasicDouble' },
    { uid: 1693405215423, name: '3 Columns', component: NestBlock.MJ_COLUMN, icon: 'BasicThree' },
    { uid: 1693405215424, name: 'Text', component: NestBlock.MJ_TEXT, icon: 'BasicText' },
    { uid: 1693405215425, name: 'Button', component: NestBlock.MJ_BUTTON, icon: 'BasicButton' },
    { uid: 1693405215425, name: 'Image', component: NestBlock.MJ_IMAGE, icon: 'BasicImage' },
    { uid: 1693405215426, name: 'Divider', component: NestBlock.MJ_DIVIDER, icon: 'BasicDivider' },
    { uid: 1693405215428, name: 'Social', component: NestBlock.MJ_SOCIAL, icon: 'BasicSocial' },
    { uid: 1693405215429, name: 'Navbar', component: NestBlock.MJ_NAVBAR, icon: 'BasicNavbar' },
    { uid: 1693405215430, name: 'Hero', component: NestBlock.MJ_HERO, icon: 'BasicHero' },
    { uid: 1693405215431, name: 'Wrapper', component: NestBlock.MJ_WRAPPER, icon: 'BasicWrapper' }
]

/**根据毫秒生成16位整数**/
export function createMathNumber() {
    return Number(Date.now().toString() + (Math.ceil(Math.random() * (9 - 1)) + 1).toString())
}

/**MJML转(JSON、HTML)**/
export function createMjmlTransfor(value: string) {
    return MjmlTransfor(value)
}

/**JSON转MJML**/
export function createJsonTransfor(value: Record<string, any>) {
    return JsonTransfor(value)
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
    } else {
        const CSSPropertie = {
            paddingLeft: (value: number) => value + 'px',
            paddingRight: (value: number) => value + 'px',
            paddingBottom: (value: number) => value + 'px',
            paddingTop: (value: number) => value + 'px',
            fontSize: (value: number) => value + 'px',
            borderRadius: (value: number) => value + 'px',
            width: (value: number) => value + 'px'
        }
        return Object.keys(data).reduce((current, key) => {
            const valueTransfor = CSSPropertie[key as keyof typeof CSSPropertie]
            current[key] = valueTransfor ? valueTransfor(data[key]) : data[key]
            return current
        }, Object.assign({}))
    }
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

/**json样式驼峰字段转化**/
export function createJsonCameTransfor(data: Record<string, any>, reverse: boolean = false) {
    data.attributes = createCameTransfor(createStyleCameTransfor(data.attributes ?? {}, reverse), reverse)
    if (data.children && data.children.length > 0) {
        data.children = data.children.map((node: Record<string, any>) => createJsonCameTransfor(node, reverse))
    }
    return data
}

/**Section组件JSON**/
export function createSectionComponent(children: Array<NestOption> = []) {
    return {
        uid: createMathNumber(),
        tagName: NestBlock.MJ_SECTION,
        attributes: {
            paddingLeft: 0,
            paddingRight: 0,
            paddingBottom: 0,
            paddingTop: 0
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
            paddingLeft: 0,
            paddingRight: 0,
            paddingBottom: 0,
            paddingTop: 0
        },
        children
    }
}

/**Text组件JSON**/
export function createTextComponent(content: string, children: Array<NestOption> = []) {
    return {
        uid: createMathNumber(),
        tagName: NestBlock.MJ_TEXT,
        attributes: {
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 0,
            paddingTop: 0,
            lineHeight: 1.6,
            fontSize: 14
        },
        content,
        children
    }
}

/**Button组件JSON**/
export function createButtonComponent(content: string, children: Array<NestOption> = []) {
    return {
        uid: createMathNumber(),
        tagName: NestBlock.MJ_BUTTON,
        attributes: {
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 10,
            paddingTop: 10,
            innerPadding: '10px 20px',
            align: 'center',
            backgroundColor: '#414141',
            fontSize: 14,
            lineHeight: 1.3,
            color: '#ffffff',
            fontWeight: 'normal',
            borderRadius: 0
        },
        content,
        children
    }
}

/**Image组件JSON**/
export function createImageComponent(src = '', children: Array<NestOption> = []) {
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
        },
        children
    }
}

/**Divider组件JSON**/
export function createDividerComponent(attributes: Record<string, any>, children: Array<NestOption> = []) {
    return {
        uid: createMathNumber(),
        tagName: NestBlock.MJ_DIVIDER,
        attributes,
        children
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
