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

## 框架和库

axios和ajax区别

react-router和vue-router区别

    1.如果一个数据依赖于其他数据，那么把这个数据设计为computed的  
    2.如果你需要在某个数据变化时做一些事情，使用watch来观察这个数据变化

watch和computed区别

虚拟dom

