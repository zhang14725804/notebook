import axios from 'axios'
import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
// 我这里不是jsonp
export function getTopList() {
    const url = '/api/getTopList'
    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        needNewCode: 1,
        g_tk: 1053051863
    })
    return axios.get(url, { params: data }).then((res) => {
        res = JSON.parse(res.data.replace('MusicJsonCallback(', '').slice(0, -1))
        return res
    })
}
export function getMusicList(topid) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
    const data = Object.assign({}, commonParams, {
        topid,
        page: 'detail',
        type: 'top',
        tpl: 3,
        platform: 'h5',
        needNewCode: 1
    })
    return jsonp(url, data, options)
}