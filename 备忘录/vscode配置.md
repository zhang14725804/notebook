### 扩展
- ESLint, TSLint 不解释
- Prettier 前端代码格式话题的终结者
- Debugger for Chrome 在 VSCode 中使用 Chrome 调试 JS 代码
- Auto Close Tag 自动补全 HTML 标签，VSCode 在 1.16 之后已经内置了 .html 文件的补全，但是这个扩展可以完成 Vue，JS，TS，JSX，TSX 的补全。
- Auto Rename Tag 和上面的 Auto Close Tag 是好基友，这个是在修改标签的时候，自动修改与之匹配的另一半标签（事实上是同一个大佬写的插件）。
- Path Intellisense 智能感知正在填写的路径。
- npm Intellisense 与上一个类似，自动感知 npm 包的路径。
- Bracket Pair Colorizer 将括号对以相同颜色标识出来，并且高亮他们之间的行。
- Bookmarks 怀念 Visual Studio 的书签吗，这是 VSCode 的书签扩展。
- JavaScript (ES6) code snippets 内置大量的常用代码段模板，节约生命，不要再敲重复的代码了。

- Settings Sync 同步你的 VSCode 配置到 Github 的 gist 上，妈妈再也不用担心我换电脑了。
- Sass 为 Sass 提供的缩进，语法高亮，自动补全，代码段扩展。
- Document This 能根据函数自动生成规范的代码注释模板。
- TODO Highlight 高亮 TODO/FIXME，并能在控制台中列出所有这些注释，有效减少挖坑不填。
- Dash 在 VSCode 中把光标移到要查找的函数下，ctrl + h 直接弹出 Dash 并跳转到该函数对应的文档。
- colorize CSS 中的设置的颜色的底色会变为该颜色，直接预览。
- Image preview 能够在编辑器代码行数的旁边显示链接的图片的预览。
- filesize 在底部状态栏显示当前文件大小，点击后还可以看到 gzip 后的大小、详细创建、修改时间。
- Project Manager 给自己的项目取一个名字，随时快速的打开标记过的项目。
- vscode-faker 本地的 mock 数据，能生成一些假的 URL，名字，日期等。
- TypeScript Importer 自动搜索工作区文件中的TypeScript定义，并将所有已知符号作为完成项，以允许代码完成。
- Open in Browser 虽然 VSCode 也自带了 “在浏览器中打开“ 这个功能，但是不知道为什么我不能用，这个扩展也是同样的功能，但是更强大，能选择在任何浏览器中打开。
- IntelliSense for CSS class names in HTML CSS 类名补全，会自动扫描整个项目里面的 CSS 类名并在你输入类名时做智能提示，不过现在三大框架写多了很少手写 HTML 了。
- Code Spell Checker 能够检测单词拼写，并且还能给出一定的周边提示。
- Visual Studio Keymap 为 VSCode 配置与 Visual Studio 相同的快捷键，适合有使用 VS 习惯的开发者，同理也有 Sublime、Atom 的键位配置。
- EditorConfig for VS Code 统一不同编辑器之间的风格设置

- React-Native/React/Redux snippets for es6/es7 React 全家桶必备，几个字母快速敲出引入 React，生命周期，redux 的 reducer 等函数的模板。

### 快捷键

#### 编辑
cmd + d：选中光标当前所在的单词
cmd + /：注释 / 反注释
cmd + Enter：当前行上面新开一行
cmd + shift + Enter：当前行下面新开一行
alt + ↑/↓：上 / 下移行
cmd + shift + alt + arrow ：跨行列选择
cmd + shift + K：删除当前行，太长了，我直接定义成了 ctrl + D
ctrl + shift + ↑/↓：向上 / 下复制当前行
ctrl + ↑/↓：向上/下滚屏一行
cmd + PageUp/PageDown：向上/下滚屏一页
alt + cmd + s：保存全部文件，要按出这个键位的姿势简直反人类，我改成了 ctrl + shift + s
cmd + k, cmd + 1：一级折叠，折叠最外层的函数，在读源码的时候很有用
cmd + k, cmd + 2/3/4/5...: n 级折叠，折叠第 n 层的嵌套
cmd + k, cmd + 0：全部折叠
cmd + k, cmd + j：展开所有
alt + cmd + [：普通折叠光标所在的代码
alt + cmd + ]：普通展开光标所在的代码
cmd + k, cmd + [：递归折叠光标所在的代码（即里面的嵌套也会折叠）
cmd + k, cmd + ]：递归展开光标所在的代码（即里面的嵌套也会展开）
#### 侧边栏
ctrl + b：展开/隐藏侧边栏
cmd + 0：聚焦到侧边栏
cmd + shift + e：打开资源管理器
cmd + shift + d：打开 debug 栏
cmd + shift + f：打开搜索栏
#### 底部面板
ctrl + j：打开/关闭底部面板
ctrl + ` ：打开/关闭终端
shift + cmd + u：打开/关闭输出
shift + cmd + m：打开/关闭问题
#### 编辑器
shift + cmd + [/]：切换打开的编辑器（页面），太麻烦了，被我改成了 ctrl + [/]
ctrl + tab：显示当前编辑器组中所有编辑器并切换，长按可以不断切换，短按则会切换到上一个使用的编辑器。
ctrl + number：切换组内不同的编辑器
cmd + 1/2/3 ：切换并聚焦到不同的编辑器组
cmd + \：拆分编辑器
#### 搜索
cmd + f：搜索
cmd + e：搜索当前选中的内容，如果没有选中的内容就搜索当前光标所在单词，相当于 ctrl + d + ctrl + f
cmd + alt + f：替换

### Prettier 配置
module.exports = {
  // printWidth: 80,
  tabWidth: 4,
  // useTabs: false,
  semi: false,
  singleQuote: true
  // trailingComma: 'none',
  // bracketSpacing: true,
  // jsxBracketSameLine: false,
  // arrowParens: 'avoid',
  // rangeStart: 0,
  // rangeEnd: Infinity,
  // proseWrap: "preserve"
}