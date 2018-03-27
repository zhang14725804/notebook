// 'use strict'

import axios from 'axios'
import qs from 'qs'
import store from 'store'
import config from "../../../config";
import GLOBAL from "./config"

import {
  Toast
} from 'mint-ui';

axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})
// 微信登录授权
axios.interceptors.response.use(response => {
  var that = this
  // 接口调用成功
  if (response && response.status == 200) {
    if (response.data.resHead) {
      if (response.data.resHead.code == 2003) {
        Toast({
          message: '未登录',
          position: 'bottom',
          duration: 1000
        });
        store.remove("user")
        store.remove("code")
        store.remove("notifyNum")
        if (GLOBAL.isWeixn()) {
          window.location.href = GLOBAL.Wechat.OAuth2
        }
      } else {
        return response
      }
    } else {
      return response
    }
  }
}, error => {
  return Promise.resolve(error.response)
})

export default {
  get(url, data) {
    var userInfo = {
      ticket: store.get('user') && store.get('user').ticket || '',
      userId: store.get('user') && store.get('user').userId || ''
    }
    // 发送请求之前带上session参数
    // data.session = JSON.stringify({"ticket": "cEKrV466tXEvjm+9RumHMlHfwiD9Eb9RcZJSRD4ac/w=","userId": 10001})
    data.session = JSON.stringify(userInfo);
    axios.defaults.baseURL = GLOBAL.BASE_URL
    return axios.get(url + '/' + GLOBAL.VERSION, qs.stringify(data))
      .then(response => {
        return response
      })
  },

  post(url, data) {
    var userInfo = {
      ticket: store.get('user') && store.get('user').ticket.replace(' ','') || '',
      userId: store.get('user') && store.get('user').userId || ''
    }
    console.log(userInfo);
    // 发送请求之前带上session参数
    // data.session = JSON.stringify({"ticket": "cEKrV466tXEvjm+9RumHMlHfwiD9Eb9RcZJSRD4ac/w=","userId": 10001})
    data.session = JSON.stringify(userInfo);
    axios.defaults.baseURL = GLOBAL.BASE_URL
    return axios.post(url + '/' + GLOBAL.VERSION, qs.stringify(data))
      .then(response => {
        return response
      })
  },
  Opost(url, data) {
    var userInfo = {
      ticket: store.get('user') && store.get('user').ticket || '',
      userId: store.get('user') && store.get('user').userId || ''
    }
    // 发送请求之前带上session参数
    // data.session = JSON.stringify({"ticket": "cEKrV466tXEvjm+9RumHMlHfwiD9Eb9RcZJSRD4ac/w=","userId": 10001})
    data.session = JSON.stringify(userInfo);
    axios.defaults.baseURL = GLOBAL.BASE_URL
    return axios.post(url, qs.stringify(data))
      .then(response => {
        return response
      })
  },
  OOpost(url, data) {
    axios.defaults.baseURL = GLOBAL.BASE_URL
    return axios.post(url,qs.stringify(data))
      .then(response => {
        return response
      })
  }
}
