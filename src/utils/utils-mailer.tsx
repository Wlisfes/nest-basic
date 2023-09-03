import { type INameUI } from '@/utils/utils-remix'
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

/**JSON转MJML**/
export function createJsonTransfor(value: Record<string, any>) {
    return JsonTransfor(value)
}

/**MJML转(JSON、HTML)**/
export function createMjmlTransfor(value: string) {
    return MjmlTransfor(value)
}

/**根据毫秒生成16位整数**/
export function createMathNumber() {
    return Number(Date.now().toString() + (Math.ceil(Math.random() * (9 - 1)) + 1).toString())
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
            padding: '20px'
        },
        children
    }
}

/**Text组件JSON**/
export function createTextComponent(option: { attributes: Record<string, any>; content: string }, children: Array<NestOption> = []) {
    const { attributes = {}, content = '' } = option
    return {
        uid: createMathNumber(),
        tagName: NestBlock.MJ_TEXT,
        attributes,
        content,
        children
    }
}

/**Button组件JSON**/
export function createButtonComponent(attributes: Record<string, any>, children: Array<NestOption> = []) {
    return {
        uid: createMathNumber(),
        tagName: NestBlock.MJ_BUTTON,
        attributes,
        children
    }
}

/**Image组件JSON**/
export function createImageComponent(attributes: Record<string, any>, children: Array<NestOption> = []) {
    return {
        uid: createMathNumber(),
        tagName: NestBlock.MJ_IMAGE,
        attributes,
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
