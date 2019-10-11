export function getURLParams ():any {
    let string = window.location.search
    let obj = {}
    string.slice(1).split("&").map(item => {
        if (item !== "") {
            let arr = item.split("=")
            obj[arr[0]] = decodeURIComponent(decodeURIComponent(arr[1]))
        }
    })
    return obj
}

export const cookie = {
    // 不设置expires等于关闭浏览器失效
    set (name: string, value: string, expired: number|string = 99999) {
        if (typeof expired === 'number') {
            let date = new Date()
            let time = date.getTime() + (expired * 1000)
            date.setTime(time)
            expired = date.toUTCString()
        }
        document.cookie = `${name}=${value}; expires=${expired}`
    },
    get (name: string) {
        return (this.getAll())[name] || null
    },
    getAll () {
        let cookiesArr = document.cookie.split(";")
        let cookies = {}
        cookiesArr.map(item => {
            if (item) {
                let tmp = item.split("=")
                cookies[tmp[0].trim()] = decodeURIComponent(decodeURIComponent(tmp[1]))
            }
        })
        return cookies
    },
    remove (name: string) {
        this.set(name, "", "Thu, 01 Jan 1970 00:00:00 GMT")
    }
}