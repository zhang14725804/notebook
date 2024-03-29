编程语言的一般规律：**用一定的词法和语法，表达一定语义，从而操作运行时**。



## JavaScript部分

### 类型

    Undefined；
    Null；
    Boolean；
    String；
    Number；
    Object。
    Symbol；

### undefined和null

undefined是一个变量，而并非是一个关键字。undefined有可能被篡改。

Null 类型也只有一个值，就是 null，它的语义表示空值，与 undefined 不同，null 是 JavaScript 关键字，所以在任何代码中，你都可以放心用 null 关键字来获取 null 值。

为什么在JavaScript中，0.1+0.2不能=0.3

    这里输出的结果是false，说明两边不相等的，这是浮点运算的特点，也是很多同学疑惑的来源，浮点数运算的精度问题导致等式左右的结果并不是严格相等，而是相差了个微小的值。
    console.log( Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON);


### 面向对象

- 对象的特征

    对象具有唯一标识性：即使完全相同的两个对象，也并非同一个对象。
    对象有状态：对象具有状态，同一对象可能处于不同状态之下。
    对象具有行为：即对象的状态，可能因为它的行为产生变迁。

对象具有唯一标识性：一般而言，各种语言的对象唯一标识性都是用内存地址来体现的， 对象具有唯一标识的内存地址，所以具有唯一的标识。

对象的第二个和第三个特征“状态和行为”，不同语言会使用不同的术语来抽象描述它们，比如C++中称它们为“成员变量”和“成员函数”，Java中则称它们为“属性”和“方法”。

在 JavaScript中，将状态和行为统一抽象为“属性”，考虑到 JavaScript 中将函数设计成一种特殊对象，所以 JavaScript中的行为和状态都能用属性来抽象。

JavaScript中对象独有的特色是：对象具有高度的动态性，具有高度动态性的属性集合，这是因为JavaScript赋予了使用者在运行时为对象添改状态和行为的能力。

- 原型

“基于类”的编程提倡使用一个关注分类和类之间关系开发模型。在这类语言中，总是先有类，再从类去实例化一个对象。类与类之间又可能会形成继承、组合等关系。类又往往与语言的类型系统整合，形成一定编译时的能力。

与此相对，“基于原型”的编程看起来更为提倡程序员去关注一系列对象实例的行为，而后才去关心如何将这些对象，划分到最近的使用方式相似的原型对象，而不是将它们分成类。

原型系统的“复制操作”有两种实现思路：

    一个是并不真的去复制一个原型对象，而是使得新对象持有一个原型的引用；
    另一个是切实地复制对象，从此两个对象再无关联。

原型系统可以用两条概括：

    （1）如果所有对象都有私有字段[[prototype]]，就是对象的原型；
    （2）读一个属性，如果对象本身没有，则会继续访问对象的原型，直到原型为空或者找到为止。


- 对象分类

    宿主对象
    内置对象（固有对象、原生对象、普通对象）



