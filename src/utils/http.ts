// tslint:disable
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import getToken, { removeToken } from './storage';
import router from '@/router';

// axios 配置
const CancelToken = axios.CancelToken

axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'; // 配置请求头
axios.defaults.withCredentials = false; // axios 默认不发送cookie，需要全局设置true发送cookie

axios.defaults.baseURL = '/api'


axios.interceptors.request.use((config: any) => {
    if (config.method === 'post') {
        //   config.data = qs.stringify(config.data)
    }
    const headers = {
        'authorization': getToken()
    }
    Object.assign(config.headers, headers)

    // http请求config包含回调方法cancel，调用则取消http请求
    if (config && config.cancel) {
        config.cancelToken = new CancelToken((c: any) => { // 强行中断请求要用到的
            // Vue.prototype.$cancel = c
            config.cancel(c)
        })
    }

    return config
}, (error: any) => {
    // if(error.message.includes('timeout')){
    //   console.log("错误回调", error);
    //   return Promise.reject(error);
    // }
    return Promise.reject(error)
})

// 返回状态判断
axios.interceptors.response.use((res: AxiosResponse) => {
    let result: any = {
        success: false
    }
    if (res.status == 200) {
        result = res.data;
        if (result.code == 200) {
            result.success = true
        } else {
            // 202 208等问题出来
        }
    } else {
        // 单独处理
    }
    return result
}, (error: any) => {
    // 404等问题可以在这里处理
    return Promise.reject(error)
})

export default {
    post: (path: string, data: any, config: AxiosRequestConfig) => {
        return new Promise((resolve, reject) => {
            axios.post(path, data, config)
                .then(function(response :any) {
                    resolve(response)
                })
                .catch(function(error :any) {
                    reject(error)
                })
        })
    },
    get: (path: string, config: AxiosRequestConfig) => {
        return new Promise((resolve, reject) => {
            axios.get(path, config)
                .then(function(response :any) {
                    resolve(response)
                })
                .catch(function(error :any) {
                    reject(error)
                })
        })
    }
}
