### Ride Down Into JavaScript Dependency Hell

[深入了解JavaScript依赖地狱](https://blog.appsignal.com/2020/04/09/ride-down-the-javascript-dependency-hell.html)

### package.json中的依赖项类型

为了更好地了解依存关系如何随着时间累积，我们将研究项目可能具有的不同类型的依存关系。 在package.json中可能会遇到一些依赖项：

- dependencies-这些是您依赖并在项目代码中调用的基本依赖项
- devDependencies-这些是您的开发依赖关系，例如，用于格式化代码的更漂亮的库
- peerDependencies —如果在package.json中设置了对等依赖关系，则告诉安装包的人他们需要指定版本的依赖关系
- optionalDependencies-这些依赖项是可选的，如果无法安装它们，则不会中断安装过程
- bundledDependencies-将与您的软件包捆绑在一起的一系列软件包。 当某些第三方库不在NPM上，或者您希望将某些项目作为模块包含时，此功能很有用

### package-lock.json的目的

我们都知道该文件在拉取请求中总是会进行很多添加和删除操作，因此我们经常将其视为理所当然。 每当package.json文件或node_modules目录更改时，都会自动生成package-lock.json。 它保留由安装生成的确切依赖关系树，以便任何后续安装都可以生成相同的树。 这解决了我拥有另一个版本的依赖关系而您拥有另一个版本的问题。

package-lock.json是项目中大量依赖项的列表。 它列出了它们的版本，模块（URI）的位置，代表该模块及其所需软件包完整性的哈希值。 如果继续阅读，您可以找到React需要的每个包的每个条目，依此类推。 这就是实际依赖地狱所在的地方。 它定义了项目所需的一切。