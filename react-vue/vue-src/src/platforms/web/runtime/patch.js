/* @flow */
//nodeOps 定义一些dom操作
import * as nodeOps from 'web/runtime/node-ops'
import { createPatchFunction } from 'core/vdom/patch'
//一些钩子函数自定义指令和refs
import baseModules from 'core/vdom/modules/index'
//platformModules 属性、类、事件处理函数
import platformModules from 'web/runtime/modules/index'

// the directive module should be applied last, after all
// built-in modules have been applied.
const modules = platformModules.concat(baseModules)

export const patch: Function = createPatchFunction({ nodeOps, modules })
