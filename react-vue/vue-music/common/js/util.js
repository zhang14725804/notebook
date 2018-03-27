// 工具方法
// 取随机数，包括上线
function getRandomInt(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
// 打乱数组方法
export function shuffle(arr) {
    // 不能改变原数组
    let _arr = arr.slice()
    for (let i = 0; i < _arr.length; i++) {
        let j = getRandomInt(0, i)
        let t = _arr[i]
        _arr[i] = _arr[j]
        _arr[j] = t
    }
    return _arr
}
// 节流函数  函数柯里化（调用一个函数，返回另一个函数）
export function debounce (func, delay) {
    let timer
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}