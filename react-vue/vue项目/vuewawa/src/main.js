// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import store from 'store'
import FastClick from 'fastclick'
import storeVuex from './store/store'
import axios from './assets/common/axios'
import user from './assets/common/user'
import VueQRCodeComponent from 'vue-qrcode-component'
import share from './assets/common/share'
import CONFIG from './assets/common/config'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'


Vue.use(MintUI)
Vue.component('qr-code', VueQRCodeComponent)

import './assets/sass/style.scss'

// 全局属性
Vue.prototype.GLOBAL = CONFIG
Vue.prototype.$ajax = axios
Vue.prototype.$share = share
Vue.prototype.VueQRCodeComponent = VueQRCodeComponent
Vue.prototype.$storeVuex = storeVuex
Vue.config.productionTip = false

router.beforeResolve((to, from, next) => {
  if (to.path.indexOf('user') !== -1 ||
    to.name == 'room' ||
    to.name == 'iroom' ||
    to.name == 'aroom') {
    if (!CONFIG.isWeixn()) {
      next({
        name: 'spread',
        query: {
          redirect: to.fullPath
        }
      })
      return
    } else {
      var userInfo = store.get('user') || null,
        code = store.get('code') || null
        
      if (!userInfo && !code) {
        window.location.href = CONFIG.Wechat.OAuth2
        return
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

axios.post('live/room/getHomeRoomList', {
  reqPlatform: CONFIG.IOS() ? 3 : ''
}).then(res => {
  if (res && res.data) {
    store.set('roomlist', res.data.resBody.liveRoomList)
  }
})



if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

new Vue({
  el: '#app',
  router,
  storeVuex,
  template: '<App/>',
  components: {
    App
  }
})

setTimeout(function() {
  share.code('code')
}, 800)

// 友盟统计
var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cspan id='cnzz_stat_icon_1271548596'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s22.cnzz.com/z_stat.php%3Fid%3D1271548596' type='text/javascript'%3E%3C/script%3E"));
