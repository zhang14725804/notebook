import { commonParams } from './config'
import axios from 'axios'
export function getLyric(mid) {
    const url = '/api/getLyric'
    const data = Object.assign({}, commonParams, {
        pcachetime: +new Date(),
        songmid: mid,
        g_tk: 2141231192,
        hostUin: 0,
        platform: 'yqq',
        needNewCode: 0
    })
    // params这个不能搭错了
    return axios.get(url, { params: data }).then((res) => {
        if (typeof res.data === 'string') {
            // 正则 拿到回调函数里面的值
            let reg = /^\w+\(({[^()]+})\)$/
            var matches = res.data.match(reg)
            if (matches) {
                res = JSON.parse(matches[1])
            }
            return res
        }
    })
}