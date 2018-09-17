import View from './components/view'
import Link from './components/link'

//保留Vue
export let _Vue
//vue-router注册流程
export function install (Vue) {
  if (install.installed && _Vue === Vue) return
  install.installed = true

  _Vue = Vue

  const isDef = v => v !== undefined

  const registerInstance = (vm, callVal) => {
    let i = vm.$options._parentVnode
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal)
    }
  }
  //混入了钩子函数
  Vue.mixin({
    beforeCreate () {
      //获取初始化参数中的router  根组件
      if (isDef(this.$options.router)) {
        //_routerRoot
        this._routerRoot = this
        //保留router
        this._router = this.$options.router
        this._router.init(this)
        //_route编程响应式的
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        //非根组件
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
      registerInstance(this, this)
    },
    destroyed () {
      registerInstance(this)
    }
  })

  //定义方法
  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })
  //注册组件
  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)

  const strats = Vue.config.optionMergeStrategies
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created
}
