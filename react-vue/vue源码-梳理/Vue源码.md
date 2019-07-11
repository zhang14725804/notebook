来源：https://jiongks.name/blog/vue-code-review/

### Vue程序结构
- 全局设计：包括全局接口、默认选项等
- vm 实例设计：包括接口设计 (vm 原型)、实例初始化过程设计 (vm 构造函数)

### 概述
整个实例初始化的过程中，重中之重就是把数据 (Model) 和视图 (View) 建立起关联关系。Vue.js 和诸多 MVVM 的思路是类似的，主要做了三件事：

- 通过 observer 对 data 进行了监听，并且提供订阅某个数据项的变化的能力
- 把 template 解析成一段 document fragment，然后解析其中的 directive，得到每一个 directive 所依赖的数据项及其更新方法。比如 v-text="message" 被解析之后 (这里仅作示意，实际程序逻辑会更严谨而复杂)：
   + 所依赖的数据项 this.$data.message，以及
   + 相应的视图更新方法 node.textContent = this.$data.message
- 通过 watcher 把上述两部分结合起来，即把 directive 中的数据依赖订阅在对应数据的 observer 上，这样当数据变化的时候，就会触发 observer，进而触发相关依赖对应的视图更新方法，最后达到模板原本的关联效果。
**所以整个 vm 的核心，就是如何实现 observer, directive (parser), watcher 这三样东西**

### 文件结构
Vue.js 源代码都存放在项目的 src 目录中，我们主要关注一下这个目录 (事实上 test/unit/specs 目录也值得一看，它是对应着每个源文件的测试用例)。

src 目录下有多个并列的文件夹，每个文件夹都是一部分独立而完整的程序设计。不过在我看来，这些目录之前也是有更立体的关系的

- 首先是 api/* 目录，这几乎是最“上层”的接口封装，实际的实现都埋在了其它文件夹里
- 然后是 instance/init.js，如果大家希望自顶向下了解所有 Vue.js 的工作原理的话，建议从这个文件开始看起   
   + instance/scope.js：数据初始化，相关的子程序 (目录) 有 observer/*、watcher.js、batcher.js，而 observer/dep.js 又是数据观察和视图依赖相关联的关键
   + instance/compile.js：视图初始化，相关的子程序 (目录) 有 compiler/*、directive.js、parsers/*
- 其它核心要素：directives/*、element-directives/*、filters/*、transition/*
- 当然还有 util/* 目录，工具方法集合，其实还有一个类似的 cache.js
- 最后是 config.js 默认配置项