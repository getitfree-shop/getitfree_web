import { cookie, getURLParams } from './util'
const isProduction = process.env.isProduction
const isDevelopment = !isProduction
const cookies = cookie.getAll()
const urlParams = getURLParams()
const commonParams = () => ({
    _rnd: Date.now().toString()
})

enum Method {
    GET = "GET",
    POST = "POST",
    HEAD = "HEAD",
}

class Http {
    autoLoading: boolean = true
    BASE_URL: string = ""
    BASE_API_URL: string = ""
    isProduction: boolean = isProduction
    isDevelopment: boolean = isDevelopment
    cookies = cookies
    urlParams = urlParams
    private requestQueue: Set<Promise<Ajax.ResponseData>> = new Set()

    constructor() {
        if (isProduction) {
            this.BASE_URL = "www.madcrickets.com"
        } else if (isDevelopment) {
            this.BASE_URL = "localhost:7000"
        }
        this.BASE_API_URL = `${window.location.protocol}//${this.BASE_URL}`
    }

    setAutoLoading(autoLoading: boolean = true) {
        this.autoLoading = autoLoading
    }

    // 把请求放进队列
    addRequestQueue(httpPromise: Promise<Ajax.ResponseData>) {
        this.requestQueue.add(httpPromise)
        this.handleHttpPromise()
        // 请求结束后 从队列中移除
        httpPromise.finally(() => {
            this.removeRequestQueue(httpPromise)
        })
    }

    // 把请求从队列移除
    removeRequestQueue(httpPromise: Promise<Ajax.ResponseData>) {
        this.requestQueue.delete(httpPromise)
        this.handleHttpPromise()
    }

    // 更新状态，如果有请求正在进行中，就显示loading
    handleHttpPromise() {
        // this.requestQueue.size > 0 ? loading.showLoading() : loading.hideLoading()
    }

    createXMLHttpRequest(url: string, method: Method, data: any): XMLHttpRequest {
        let xmlHttpRequest = new XMLHttpRequest()
        url = method === Method.GET ? formatUrl(url, data) : url
        xmlHttpRequest.open(method, url, true)
        xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8")
        return xmlHttpRequest
    }

    commonHandler = (ignoreError: boolean) => {
        return (responseData: Ajax.ResponseData) => {
            let isError = responseData.status !== "100"
            !ignoreError && isError && alert(responseData.message || getNetworkErrorMessage())
            return isError ? Promise.reject(responseData) : Promise.resolve(responseData)
        }
    }


    $http(url: string, method: Method, data: any): Promise<Ajax.ResponseData> {
        url = `${this.BASE_API_URL}${url}`
        data = {
            ...data,
            ...commonParams()
        }
        const xmlHttpRequest = this.createXMLHttpRequest(url, method, data)
        const requestPromise: Promise<Ajax.ResponseData> = new Promise(resolve => {
            xmlHttpRequest.onreadystatechange = () => {
                let responseData: Ajax.ResponseData
                let errorData: Ajax.ResponseData = {
                    message: getNetworkErrorMessage(),
                    status: "",
                    data: {}
                }
                if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
                    responseData = JSON.parse(xmlHttpRequest.responseText)
                    resolve(responseData)
                } else if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status !== 200) {
                    errorData.status = xmlHttpRequest.status.toString()
                    console.log(`request failed: url:${url} status: ${errorData.status}`)
                    resolve(errorData)
                }
            }
        })

        method === Method.GET ? xmlHttpRequest.send(null) : xmlHttpRequest.send(formatJsonToUrlData(data))
        return requestPromise
    }

    $get(url: string, data: any = {}, option: Ajax.HttpOption = {}): Promise<Ajax.ResponseData> {
        let http = this.$http(url, Method.GET, data)
        if (!option.hideLoading && this.autoLoading) {
            this.addRequestQueue(http)
        }
        return http.then(this.commonHandler(!!option.ignoreError))
    }

    $post(url: string, data: any = {}, option: Ajax.HttpOption = {}): Promise<Ajax.ResponseData> {
        let http = this.$http(url, Method.POST, data)
        if (!option.hideLoading && this.autoLoading) {
            this.addRequestQueue(http)
        }
        return http.then(this.commonHandler(!!option.ignoreError))
    }
}

const http = new Http()

if (!isProduction) {
    window._http = http
}

export default http

function formatJsonToUrlData(data: any): string {
    let dataArr = [] as string[]
    for (let key in data) {
        dataArr.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    }
    return dataArr.join("&")
}

function formatUrl(URL: string, data: any = {}) {
    const hasQueryStart = URL.indexOf("?") > -1
    return (`${URL}${hasQueryStart ? "&" : "?"}${formatJsonToUrlData(data)}`)
}

function getNetworkErrorMessage() {
    return window._ ? window._("networkError") : "Network Error"
}