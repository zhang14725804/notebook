import axios from 'axios'
// import jsonp from 'common/js/jsonp'
// import { commonParams, options } from './config'
import { commonParams } from './config'
// 我这里是xhr 跨域请求
export function getHotKey() {
    const url = '/api/getHotKey'
    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        needNewCode: 1
    })
    // params这个不能搭错了
    return axios.get(url, { params: data }).then((res) => {
        return Promise.resolve(res.data)
    })
}
export function search(query, page, zhida, perpage) {
    const url = '/api/search'
    const data = Object.assign({}, commonParams, {
        w: query,
        p: page,
        zhidaqu: 1,
        catZhida: zhida ? 1 : 0,
        perpage,
        n: perpage,
        g_tk: 589342303,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        uin: 0,
        needNewCode: 1,
        remoteplace: 'txt.mqq.all',
        platform: 'h5'
    })
    // params这个不能搭错了
    return axios.get(url, { params: data }).then((res) => {
        // 返回值是回调函数
        res = JSON.parse(res.data.replace('callback(', '').slice(0, -1))
        return res
    })
}