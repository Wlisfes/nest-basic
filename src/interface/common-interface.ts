export type CnState<T = Record<string, unknown>> = T & {
    disabled: boolean
    loading: boolean
}
