// 给定一个整数，写一个函数来判断它是否是 3 的幂次方。
var isPowerOfThree = function (n) {
    if (n === 0) {
        return false
    }
    while (n % 3 === 0) {
        n = n / 3
    }
    return n === 1
};

// 暂时不用循环没有好的办法
var isPowerOfThree = function (n) {
    return (n > 0 && Math.pow(3, 19) % n === 0)
};