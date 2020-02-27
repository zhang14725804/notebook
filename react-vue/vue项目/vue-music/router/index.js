import Vue from 'vue'
import Router from 'vue-router'
// import Rank from 'components/rank/rank'
// import Recommend from 'components/recommend/recommend'
// import Singer from 'components/singer/singer'
// import Search from 'components/search/search'
// import SingerDetail from 'components/singer-detail/singer-detail'
// import Disc from 'components/disc/disc'
// import TopList from 'components/top-list/top-list'
// import UserCenter from 'components/user-center/user-center'

// 按需加载的写法
const Rank = (resolve) => {
  import('components/rank/rank').then((modules) => {
    resolve(modules)
  })
}
const Recommend = (resolve) => {
  import('components/recommend/recommend').then((modules) => {
    resolve(modules)
  })
}
const Singer = (resolve) => {
  import('components/singer/singer').then((modules) => {
    resolve(modules)
  })
}
const Search = (resolve) => {
  import('components/search/search').then((modules) => {
    resolve(modules)
  })
}
const SingerDetail = (resolve) => {
  import('components/singer-detail/singer-detail').then((modules) => {
    resolve(modules)
  })
}
const Disc = (resolve) => {
  import('components/disc/disc').then((modules) => {
    resolve(modules)
  })
}
const TopList = (resolve) => {
  import('components/top-list/top-list').then((modules) => {
    resolve(modules)
  })
}
const UserCenter = (resolve) => {
  import('components/user-center/user-center').then((modules) => {
    resolve(modules)
  })
}
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      // 默认路由
      redirect: '/recommend'
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/user',
      component: UserCenter
    }
  ]
})
