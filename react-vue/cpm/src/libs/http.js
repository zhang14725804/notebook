import axios from 'axios'
import GLOBAL from './config'
import storage from 'good-storage'
import {authTimeout} from './common'
import Toast from 'components/toast/toast'
axios.defaults.baseURL = GLOBAL.BASE_URL
//请求携带cookie
axios.defaults.withCredentials=true
axios.defaults.crossDomain=true
// //请求数据格式
axios.defaults.headers['Content-Type']='application/json'
//请求超时时间
axios.defaults.timeout = 15000;

axios.interceptors.request.use(function(request){
    //Authorization在外部设置，第一次请求用户数据，Authorization无法获取
    request.headers.Authorization=storage.get('token')
    Toast.open({
        alertTip:"加载中...",
        closeAlert:function(){
            //console.log("请求完成...");
        }
    })
    return request
})
  
axios.interceptors.response.use(function(response){
    Toast.close()
    //这里获取response判断请求
    //console.log(response)
    return response
},function(error){
    //session失效(就这么干，调到首页)
    //localStorage本地存储有可能token过期，这个时候需要重新获取
    console.log(error)
    console.log(error.response)
    if(error.response.status===401){
        authTimeout()
    }else if(error.response.status===400){
        //这里要处理一下（提示系统错误）
        Toast.close()
    }
})

export default{
    get(url,data){
        if(data){
            url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
        }
        return axios.get(url,null).then(response => {
            return response
        })
    },
    delete(url,data){
        if(data&&data.length>0){
            url+=appendParams(data)
        }
        return axios.delete(url).then(response => {
            return response
        })
    },
    post(url,data){
        return axios.post(url,JSON.stringify(data)).then(response => {
            return response
        })
    },
    put(url,data){
        return axios.put(url,JSON.stringify(data)).then(response => {
            return response
        })
    }
}

function appendParams(data){
    let param=''
    for(let i=0;i<data.length;i++){
        param+=`/${data[i]}`
    }
    return param
}

export function param(data) {
    let url = ''
    for (var k in data) {
        let value = data[k] !== undefined ? data[k] : ''
        url += `&${k}=${encodeURIComponent(value)}`
    }
    return url ? url.substring(1) : ''
}