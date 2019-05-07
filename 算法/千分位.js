
//数组方法
function toThousands1(num) {
    var result = [], counter = 0;
    num = (num || 0).toString().split('')
    for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result.unshift(num[i])
        if (!(counter % 3) && i != 0) {
            result.unshift(',')
        }
    }
    return result.join('')
}
//字符串方法
function toThousands2(num) {
    var result = '', counter = 0;
    num = (num || 0).toString();
    for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result = num.charAt(i) + result;
        if (!(counter % 3) && i != 0) {
            result = ',' + result;
        }
    }
    return result;
}
//循环匹配末尾的三个数
function toThousands(num) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}
//正则
function toThousandsre(num) {
    return num && num.toString().replace(/(?=(?!^)(\d{3})+$)/g, ',')
}
//有小数的情况（多数语言并不支持逆序环视）
let toThousandsre2 = (num) => {
    return num && num.toString()
        .replace(/^\d+/g, (m) => m.replace(/(?=(?!^)(\d{3})+$)/g, ','))
}