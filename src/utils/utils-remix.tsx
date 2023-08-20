import { h, createVNode, type VNode, type CSSProperties } from 'vue'
import { type IconProps, type IconWrapperProps } from 'naive-ui'

export const RemixUI = {
    AddBold: h(<Icon-AddBold />),
    AddRound: h(<Icon-AddRound />),
    ArrowDownBold: h(<Icon-ArrowDownBold />),
    ArrowDownLine: h(<Icon-ArrowDownLine />),
    ArrowLeftBold: h(<Icon-ArrowLeftBold />),
    ArrowLeftLine: h(<Icon-ArrowLeftLine />),
    ArrowRightBold: h(<Icon-ArrowRightBold />),
    ArrowRightLine: h(<Icon-ArrowRightLine />),
    ArrowUpBold: h(<Icon-ArrowUpBold />),
    ArrowUpLine: h(<Icon-ArrowUpLine />),
    CloseBold: h(<Icon-CloseBold />),
    CloseRound: h(<Icon-CloseRound />),
    CopyRound: h(<Icon-CopyRound />),
    BoxCopy: h(<Icon-BoxCopy />),
    DeleteBold: h(<Icon-DeleteBold />),
    DisableRound: h(<Icon-DisableRound />),
    EnableRound: h(<Icon-EnableRound />),
    InduceBold: h(<Icon-InduceBold />),
    IssueRound: h(<Icon-IssueRound />),
    RadixEdit: h(<Icon-RadixEdit />),
    EditLine: h(<Icon-EditLine />),
    RadixMore: h(<Icon-RadixMore />),
    RadixSpin: h(<Icon-RadixSpin />),
    RadixSpinWith: h(<Icon-RadixSpinWith />),
    SemiBold: h(<Icon-SemiBold />),
    SlackBold: h(<Icon-SlackBold />),
    WarningRound: h(<Icon-WarningRound />),
    HomeOutlined: h(<Icon-HomeOutlined />),
    Debugger: h(<Icon-Debugger />),
    SearchBlod: h(<Icon-SearchBlod />),
    Simple: h(<Icon-Simple />),
    ThemeLight: h(<Icon-ThemeLight />),
    ThemeDark: h(<Icon-ThemeDark />),
    Fullscreen: h(<Icon-Fullscreen />),
    Foutscreen: h(<Icon-Foutscreen />),
    Speaker: h(<Icon-Speaker />),
    Captcha: h(<Icon-Captcha />),
    MailGmail: h(<Icon-MailGmail />),
    Message: h(<Icon-Message />),
    Language: h(<Icon-Language />),
    Money: h(<Icon-Money />),
    Service: h(<Icon-Service />),
    Document: h(<Icon-Document />),
    Describe: h(<Icon-Describe />),
    DataBase: h(<Icon-DataBase />),
    Compute: h(<Icon-Compute />),
    Schedule: h(<Icon-Schedule />),
    Secret: h(<Icon-Secret />),
    LockRound: h(<Icon-LockRound />),
    Rotate: h(<Icon-Rotate />),
    RotateSmall: h(<Icon-RotateSmall />),
    Package: h(<Icon-Package />)
}

/**图标类型拆解**/
export type INameUI = keyof typeof RemixUI

/**图标拆解函数**/
export function compute(name: INameUI): VNode {
    return createVNode(RemixUI[name])
}

/**图标组合函数**/
export function sompute(name: INameUI, iconProps: IconProps & { style?: CSSProperties } = {}) {
    return createVNode(
        <n-icon color={iconProps.color} depth={iconProps.depth} size={iconProps.size} style={iconProps.style} component={compute(name)} />
    )
}

/**背景图标拆解函数**/
export function wrapper(
    name: INameUI,
    wrapperProps: IconWrapperProps & { style?: CSSProperties } = {},
    iconProps: IconProps & { style?: CSSProperties } = {}
) {
    return createVNode(
        <n-icon-wrapper
            size={wrapperProps.size ?? 24}
            border-radius={wrapperProps.borderRadius ?? 6}
            icon-color={wrapperProps.iconColor}
            color={wrapperProps.color}
            style={wrapperProps.style}
            v-slots={{ default: () => sompute(name, iconProps) }}
        ></n-icon-wrapper>
    )
}
