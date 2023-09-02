import { type INameUI } from '@/utils/utils-remix'
import MjmlTransfor from 'mjml-browser'
import JsonTransfor from 'json2mjml'
export enum NentBlock {
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
    component: NentBlock
    icon: INameUI
}
export interface NestSource {}
export interface NestOption {
    uid: number
    tagName: NentBlock
    attributes: Record<string, any>
    children: Array<NestOption>
    content?: string
}

/**组件列表**/
export const nestBlocks: Array<NestBlocks> = [
    { uid: 1693405215421, name: '1 Column', component: NentBlock.MJ_COLUMN, icon: 'BasicColumn' },
    { uid: 1693405215422, name: '2 Columns', component: NentBlock.MJ_COLUMN, icon: 'BasicDouble' },
    { uid: 1693405215423, name: '3 Columns', component: NentBlock.MJ_COLUMN, icon: 'BasicThree' },
    { uid: 1693405215424, name: 'Text', component: NentBlock.MJ_TEXT, icon: 'BasicText' },
    { uid: 1693405215425, name: 'Button', component: NentBlock.MJ_BUTTON, icon: 'BasicButton' },
    { uid: 1693405215425, name: 'Image', component: NentBlock.MJ_IMAGE, icon: 'BasicImage' },
    { uid: 1693405215426, name: 'Divider', component: NentBlock.MJ_DIVIDER, icon: 'BasicDivider' },
    { uid: 1693405215428, name: 'Social', component: NentBlock.MJ_SOCIAL, icon: 'BasicSocial' },
    { uid: 1693405215429, name: 'Navbar', component: NentBlock.MJ_NAVBAR, icon: 'BasicNavbar' },
    { uid: 1693405215430, name: 'Hero', component: NentBlock.MJ_HERO, icon: 'BasicHero' },
    { uid: 1693405215431, name: 'Wrapper', component: NentBlock.MJ_WRAPPER, icon: 'BasicWrapper' }
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
export function createSectionComponent(attributes: Record<string, any>, children: Array<NestOption> = []) {
    return {
        uid: createMathNumber(),
        tagName: NentBlock.MJ_SECTION,
        attributes,
        children
    }
}

/**Column组件JSON**/
export function createColumnComponent(line: number = 1, attributes: Record<string, any>, children: Array<NestOption> = []) {
    return {
        uid: createMathNumber(),
        tagName: NentBlock.MJ_COLUMN,
        attributes,
        children
    }
}

/**Text组件JSON**/
export function createTextComponent(option: { attributes: Record<string, any>; content: string }, children: Array<NestOption> = []) {
    const { attributes = {}, content = '' } = option
    return {
        uid: createMathNumber(),
        tagName: NentBlock.MJ_TEXT,
        attributes,
        content,
        children
    }
}

/**Button组件JSON**/
export function createButtonComponent(attributes: Record<string, any>, children: Array<NestOption> = []) {
    return {
        uid: createMathNumber(),
        tagName: NentBlock.MJ_BUTTON,
        attributes,
        children
    }
}

/**Image组件JSON**/
export function createImageComponent(attributes: Record<string, any>, children: Array<NestOption> = []) {
    return {
        uid: createMathNumber(),
        tagName: NentBlock.MJ_IMAGE,
        attributes,
        children
    }
}

/**Divider组件JSON**/
export function createDividerComponent(attributes: Record<string, any>, children: Array<NestOption> = []) {
    return {
        uid: createMathNumber(),
        tagName: NentBlock.MJ_DIVIDER,
        attributes,
        children
    }
}

/**Social组件JSON**/
export function createSocialComponent(attributes: Record<string, any>, children: Array<NestOption> = []) {
    return {
        uid: createMathNumber(),
        tagName: NentBlock.MJ_SOCIAL,
        attributes,
        children
    }
}

/**Navbar组件JSON**/
export function createNavbarComponent(attributes: Record<string, any>, children: Array<NestOption> = []) {
    return {
        uid: createMathNumber(),
        tagName: NentBlock.MJ_NAVBAR,
        attributes,
        children
    }
}

/**Hero组件JSON**/
export function createHeroComponent(attributes: Record<string, any>, children: Array<NestOption> = []) {
    return {
        uid: createMathNumber(),
        tagName: NentBlock.MJ_HERO,
        attributes,
        children
    }
}

/**Wrapper组件JSON**/
export function createWrapperComponent(attributes: Record<string, any>, children: Array<NestOption> = []) {
    return {
        uid: createMathNumber(),
        tagName: NentBlock.MJ_WRAPPER,
        attributes,
        children
    }
}
