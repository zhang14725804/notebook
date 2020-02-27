// 'use strict'

import naxios from './axios'
import store from 'store'
import GLOBAL from "./config"

import {
  Toast
} from 'mint-ui'

export default {
  login(code, cb) {
    return naxios.post('user/account/login', {
        loginType: 2,
        platform: 'H5',
        wechatCode: code || store.get('code'),
        channelId: store.get('channelId') || ''
      })
      .then(function(response) {
        if (response && response.data) {
          // 登录成功
          if (response.data.resHead.code == 1) {
            store.remove("code")
            store.set('user', response.data.resBody)
            store.set('notifyNum', response.data.resBody.userInfo.notifyNum)
            window.sessionStorage.setItem("user", JSON.stringify(response.data.resBody))
            cb && cb(response)
          } else {
            Toast({
              message: response.data.resHead.msg,
              position: 'bottom',
              duration: 2000
            })
            store.remove("user")
            store.remove("code")
            store.remove("notifyNum")
            return
          }
        }
      })
      .catch(function(error) {
        // console.log(error)
      })
  },
  InviteLogin (code,cb) {
    //https://wwapi.91tmedia.com/wawa_api/fission/createQRcode
    return naxios.post('fission/createQRcode', {
      loginType: 2,
      platform: 'H5',
      wechatCode: code || store.get('code'),
      channelId: 16
    })
    .then(function(response) {
      // Toast({
      //     message: response,
      //     duration: 5000
      // })
      if (response && response.data) {
        cb && cb(response)
      }
    })
    .catch(function(error) {
      // console.log(error)
    })
  }
}
