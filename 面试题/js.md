## js

1、promise原理

    async function async1(){
    console.log('async1 start');
        await async2();
        console.log('async1 end')
    }
    async function async2(){
        console.log('async2')
    }
    console.log('script start');
    setTimeout(function(){
        console.log('setTimeout')
    },0);
    async1();
    new Promise(function(resolve){
        console.log('promise1');
        resolve();
    }).then(function(){
        console.log('promise2')
    });
    console.log('script end')

2、 for和forEach的区别

[forEach和for](https://www.cnblogs.com/echolun/p/11544045.html)


    1.for循环可以使用break跳出循环，但forEach不能。
    2.for循环可以控制循环起点（i初始化的数字决定循环的起点），forEach只能默认从索引0开始。
    3.for循环过程中支持修改索引（修改 i），但forEach做不到（底层控制index自增，我们无法左右它）。




## 框架和库

axios和ajax区别

react-router和vue-router区别

    1.如果一个数据依赖于其他数据，那么把这个数据设计为computed的  
    2.如果你需要在某个数据变化时做一些事情，使用watch来观察这个数据变化

watch和computed区别

虚拟dom

