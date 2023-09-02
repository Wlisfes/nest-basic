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
export interface NestComponent {
    tagName: string
    attributes: Record<string, any>
    children: Array<NestComponent>
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
export function createMathRandom() {
    return Number(Date.now().toString() + (Math.ceil(Math.random() * (9 - 1)) + 1).toString())
}

/**Section组件JSON**/
export function createSectionComponent(attributes: Record<string, any>, children: Array<NestComponent> = []) {
    return {
        tagName: 'mj-section',
        attributes,
        children
    }
}

/**Column组件JSON**/
export function createColumnComponent(line: number = 1, attributes: Record<string, any>, children: Array<NestComponent> = []) {
    return {
        tagName: 'mj-column',
        attributes,
        children
    }
}

/**Text组件JSON**/
export function createTextComponent(attributes: Record<string, any>, children: Array<NestComponent> = []) {
    return {
        tagName: 'mj-text',
        attributes,
        children
    }
}

/**Button组件JSON**/
export function createButtonComponent(attributes: Record<string, any>, children: Array<NestComponent> = []) {
    return {
        tagName: 'mj-button',
        attributes,
        children
    }
}

/**Image组件JSON**/
export function createImageComponent(attributes: Record<string, any>, children: Array<NestComponent> = []) {
    return {
        tagName: 'mj-image',
        attributes,
        children
    }
}

/**Divider组件JSON**/
export function createDividerComponent(attributes: Record<string, any>, children: Array<NestComponent> = []) {
    return {
        tagName: 'mj-divider',
        attributes,
        children
    }
}

/**Social组件JSON**/
export function createSocialComponent(attributes: Record<string, any>, children: Array<NestComponent> = []) {
    return {
        tagName: 'mj-social',
        attributes,
        children
    }
}

/**Navbar组件JSON**/
export function createNavbarComponent(attributes: Record<string, any>, children: Array<NestComponent> = []) {
    return {
        tagName: 'mj-navbar',
        attributes,
        children
    }
}

/**Hero组件JSON**/
export function createHeroComponent(attributes: Record<string, any>, children: Array<NestComponent> = []) {
    return {
        tagName: 'mj-hero',
        attributes,
        children
    }
}

/**Wrapper组件JSON**/
export function createWrapperComponent(attributes: Record<string, any>, children: Array<NestComponent> = []) {
    return {
        tagName: 'mj-wrapper',
        attributes,
        children
    }
}
