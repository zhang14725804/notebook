import axios from 'axios'
// import jsonp from 'common/js/jsonp'
// import { commonParams, options } from './config'
import { commonParams } from './config'
// 我这里是xhr 跨域请求
export function getRecommend () {
    const url = '/api/getRecommend'
    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })
    // params这个不能搭错了
    return axios.get(url, {params: data}).then((res) => {
        return Promise.resolve(res.data)
    })
}
export function getDiscList () {
    // 搞个假数据不就好了
    const url = '/discList.json'
    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}
// 我这里不是jsonp
export function getSongList(disstid) {
    const url = '/api/getSongList'
    const data = Object.assign({}, commonParams, {
        disstid,
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0,
        g_tk: 1053051863
    })
    // return jsonp(url, data, options)
    return axios.get(url, { params: data }).then((res) => {
        if (typeof res.data === 'string') {
            // 正则 拿到回调函数里面的值
            // 和歌词正则不一样
            // 去掉jsonCallback(  还有最后一个)不就好了
            res = JSON.parse(res.data.replace('jsonCallback(', '').slice(0, -1))
            return res
        }
    })
}