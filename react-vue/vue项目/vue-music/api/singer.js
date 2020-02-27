import { commonParams, options } from './config'
import jsonp from 'common/js/jsonp'
import axios from 'axios'
export function getSingerList() {
    const url = '/singers.json'
    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}
export function getSingerDetail(singerId) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
    const data = Object.assign({}, commonParams, {
        begin: 0,
        hostUin: 0,
        loginUin: 0,
        platform: 'yqq',
        needNewCode: 0,
        num: 100,
        order: 'listen',
        songstatus: 1,
        g_tk: 5381,
        singermid: singerId
    })
    return jsonp(url, data, options)
}