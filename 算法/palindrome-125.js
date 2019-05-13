
/**
 *  给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
    说明：本题中，我们将空字符串定义为有效的回文串
 */

function isPalindrome(s){
    const str = s.replace(/\W/g,'').toLowerCase()
    const reverse = [...str].reverse().join('')
    return str === reverse
}
