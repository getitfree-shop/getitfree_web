declare const app: Function
declare const process: any
declare const require: any
declare namespace Ajax {
    export interface ResponseData {
        /** 文案 */
        message: string
        /** 状态码 */
        status: string
        /** 数据 */
        data: any
    }

    export interface HttpOption {
        /** hideLoading 是否显示Loading */
        hideLoading?: boolean
        /** ignoreError 是否忽略报错弹窗 */
        ignoreError?: boolean
    }
}

interface Window {
    _http: any
    _(str: string): string
}
