/* @flow */

import { toArray } from '../util/index'
//Vue.use注册插件入口
export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    //保证插件只注册一次
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    //将Vue添加到参数中
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
