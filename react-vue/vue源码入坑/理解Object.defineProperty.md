javascript对象是由多个key/value组成的无序的集合，对象中每个属性对应任意类型的值
定义对象可以只用构造函数或者字面量的形式
```

var obj = new Object;  //obj = {}
obj.name = "詹姆斯";  //添加描述
obj.say = function(){};  //添加行为

```

Object.defineProperty用来定义属性或者修改属性

```

// 语法
Object.defineProperty(obj, prop, descriptor)

//参数
obj：要在其上定义属性的对象。
prop：要定义或修改的属性的名称。
descriptor：将被定义或修改的属性描述符。

// 返回值
返回传入的对象

```

## 属性描述符

对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。数据描述符是一个具有值的属性，该值可能是可写的，也可能不是可写的。存取描述符是由getter-setter函数对描述的属性。描述符必须是这两种形式之一；不能同时是两者

###数据描述
```

var obj = {
    test:"hello"
}
//对象已有的属性添加特性描述
Object.defineProperty(obj,"test",{
    configurable:true | false,
    enumerable:true | false,
    value:任意类型的值,
    writable:true | false
});


value: 设置属性的值
writable: 值是否可以重写。true | false
enumerable: 目标属性是否可以被枚举。true | false
configurable: 目标属性是否可以被删除或是否可以再次修改特性 true | false

```

###存取器描述
```
// 基本语法
var obj = {};
Object.defineProperty(obj,"newKey",{
    get:function (){} | undefined,
    set:function (value){} | undefined
    configurable: true | false
    enumerable: true | false
});

// 栗子
var obj = {};
var initValue = 'hello';
Object.defineProperty(obj,"newKey",{
    get:function (){
        //当获取值的时候触发的函数
        return initValue;    
    },
    set:function (value){
        //当设置值的时候触发的函数,设置的新值通过参数value拿到
        initValue = value;
    }
});
//获取值
console.log( obj.newKey );  //hello

//设置值
obj.newKey = 'change value';

console.log( obj.newKey ); //change value

```

