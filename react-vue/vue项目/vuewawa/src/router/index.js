import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

var Home = r => require.ensure([], () => r(require('@/pages/index/home')), 'home')
var Spread = r => require.ensure([], () => r(require('@/pages/index/spread')), 'spread')
var Privacy = r => require.ensure([], () => r(require('@/pages/index/privacy')), 'privacy')
var rankinglist = r => require.ensure([], () => r(require('@/pages/index/rankinglist')), 'rankinglist')
var turntable = r => require.ensure([], () => r(require('@/pages/index/turntable')), 'turntable')
var integralshop = r => require.ensure([], () => r(require('@/pages/index/integralshop')), 'integralshop')

var Invitation = r => require.ensure([], () => r(require('@/pages/index/invitation')), 'invitation')
var invitationnew = r => require.ensure([], () => r(require('@/pages/index/invitationnew')), 'invitationnew')

var Invitvideo = r => require.ensure([], () => r(require('@/pages/index/invitvideo')), 'invitvideo')

var Room = r => require.ensure([], () => r(require('@/pages/room/room')), 'room')
var IRoom = r => require.ensure([], () => r(require('@/pages/room/iroom')), 'iroom')
var ARoom = r => require.ensure([], () => r(require('@/pages/room/aroom')), 'aroom')
var WinUser = r => require.ensure([], () => r(require('@/pages/room/winuser')), 'winuser')
var Guest = r => require.ensure([], () => r(require('@/pages/room/guest')), 'guest')

var User = r => require.ensure([], () => r(require('@/pages/user/index')), 'user')
var Cash = r => require.ensure([], () => r(require('@/pages/user/cash')), 'cash')
var Award = r => require.ensure([], () => r(require('@/pages/user/award')), 'award')
var exp = r => require.ensure([], () => r(require('@/pages/user/exp')), 'exp')
var expDetails = r => require.ensure([], () => r(require('@/pages/user/expDetails')), 'expDetails')
var jifen = r => require.ensure([], () => r(require('@/pages/user/jifen')), 'jifen')
var jifenDetails = r => require.ensure([], () => r(require('@/pages/user/jifenDetails')), 'jifenDetails')

var Consumption = r => require.ensure([], () => r(require('@/pages/user/consumption')), 'consumption')
var Phistory = r => require.ensure([], () => r(require('@/pages/user/history')), 'history')
var Order = r => require.ensure([], () => r(require('@/pages/user/order')), 'order')
var Message = r => require.ensure([], () => r(require('@/pages/user/message')), 'message')
var Invitcode = r => require.ensure([], () => r(require('@/pages/user/invitcode')), 'invitcode')
var invitUser = r => require.ensure([], () => r(require('@/pages/user/invitUser')), 'invitUser')
var usercash = r => require.ensure([], () => r(require('@/pages/user/usercash')), 'usercash')


var AddressList = r => require.ensure([], () => r(require('@/pages/user/address/list')), 'list')
var AddressForm = r => require.ensure([], () => r(require('@/pages/user/address/form')), 'form')

Vue.use(Router)

export default new Router({
  mode: 'history',
  saveScrollPostion: true,
  history: true,
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  },
  routes: [{
      path: '/',
      name: 'index',
      component: App,
      redirect: {
        name: 'home'
      },
      children: [{
          path: '/home/:id',
          name: 'home',
          component: Home,
          meta: {
            title: '萌多多抓娃娃，在线正版包邮',
            keepAlive: true
          }
        }, {
          // 直播间路由
          path: '/room/:id?',
          name: 'room',
          component: Room
        },
        {
          // 直播间路由
          path: '/iroom/:id?',
          name: 'iroom',
          component: IRoom
        },
        {
          // 直播间路由
          path: '/aroom/:id?',
          name: 'aroom',
          component: ARoom
        }
      ]
    }, {
      path: '/user:code?',
      name: 'user',
      component: User,
      meta: {
        title: '个人中心',
        keepAlive: true
      }
    },
    {
      // 我的游戏币
      path: '/user/cash',
      name: 'cash',
      component: Cash
    },
    {
      // 消费记录
      path: '/user/consumption',
      name: 'consumption',
      component: Consumption
    },
    {
      // 经验积分
      path: '/user/exp',
      name: 'exp',
      component: exp
    },
    {
      // 经验积分详情
      path: '/user/expDetails',
      name: 'expDetails',
      component: expDetails
    },
    {
      // 经验积分
      path: '/user/jifen',
      name: 'jifen',
      component: jifen
    },
    {
      // 经验积分详情
      path: '/user/jifenDetails',
      name: 'jifenDetails',
      component: jifenDetails
    },
    {
      // 抓取记录
      path: '/user/history',
      name: 'history',
      component: Phistory
    },
    {
      // 我的订单
      path: '/user/order',
      name: 'order',
      component: Order
    }, {
      // 用户地址列表
      path: '/user/address/list',
      name: 'list',
      component: AddressList
    },
    {
      // 用户地址表单
      path: '/user/address/form/:id?',
      name: 'form',
      component: AddressForm
    },
    {
      // 我的消息
      path: '/user/message',
      name: 'message',
      component: Message
    },
    {
      // 邀请奖励
      path: '/user/award',
      name: 'award',
      component: Award
    },
    {
      // 邀请码兑换
      path: '/user/invitcode',
      name: 'invitcode',
      component: Invitcode
    },
    {
      // 已邀请好友
      path: '/user/invitUser',
      name: 'invitUser',
      component: invitUser
    },
    {
      //好友充值
      path: '/user/usercash',
      name: 'usercash',
      component: usercash
    },
    {
      // 不是微信端打开时的提示页面
      path: '/spread',
      name: 'spread',
      component: Spread
    },
    {
      // 邀请函
      path: '/invitation/:userid?',
      name: 'invitation',
      component: Invitation
    },
    {
      // 邀请函NEW
      path: '/invitationnew/:userid?',
      name: 'invitationnew',
      component: invitationnew
    },
    {
      // 邀请函
      path: '/invitvideo/:userid?',
      name: 'invitvideo',
      component: Invitvideo
    },
    {
      // 隐私
      path: '/privacy',
      name: 'privacy',
      component: Privacy
    },
    {
      //排行榜
      path: '/rankinglist/:userid?',
      name: 'rankinglist',
      component: rankinglist
    },
    {
      //排行榜 IOS
      path: '/rankinglist/:tlsSign?',
      name: 'rankinglist',
      component: rankinglist
    },
    {//积分商城
      path: '/integralshop/:userid?',
      name: 'integralshop',
      component: integralshop
    },
    {//大转盘

      path: '/turntable/:userid?',
      name: 'turntable',
      component: turntable
    },
    {
      // 最近抓中的大神
      path: '/room/winuser/:id?',
      name: 'winuser',
      component: WinUser
    },
    {
      // 访客页面
      path: '/guest/:gid?/:uid?',
      name: 'guest',
      component: Guest
    }
  ]
})
