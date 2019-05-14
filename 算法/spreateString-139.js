/**
 * 给定一个非空字符串 s 和一个包含非空单词列表的字典 wordDict，判定 s 是否可以被空格拆分为一个或多个在字典中出现的单词。
    说明：
        拆分时可以重复使用字典中的单词。
        你可以假设字典中没有重复的单词。

    例1：
        输入: s = "leetcode", wordDict = ["leet", "code"]
        输出: true
        解释: 返回 true 因为 "leetcode" 可以被拆分成 "leet code"。
    例2：
        输入: s = "applepenapple", wordDict = ["apple", "pen"]
        输出: true
        解释: 返回 true 因为 "applepenapple" 可以被拆分成 "apple pen apple"。
        注意你可以重复使用字典中的单词。
    例3：
        输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
        输出: false
 */

/**
 * 动态规划的思路（可以先放一放，有点难）
 * 
 * 将问题拆分成更小的子问题。用dp[i]表示0到i的子字符串是否可以拆分成满足条件的单词，
 * 在计算dp[i]的时候，我们已经知道dp[0],dp[1],…,dp[i-1],如果以i为结尾的j~i子串是满足条件的，
 * 并且0~j的子串也是在字典中的，那么dp[i]就是true
 * 
 */

/**
 * 斐波那契额数列，由这个延伸出的思路，递归会产生很重叠子问题（overlap sub-problem（重叠子问题））
 * 对每个元素都有两种可能，选和不选
 */
/**
 *例1：： 从数组中选出几个元素，使他们的和最大，不能选相邻的两个数
*/
var array = [1, 2, 4, 1, 7, 8, 3]
// 递归的方式
function rec_opt(arr, i) {
    if (i === 0) {
        return arr[0]
    } else if (i === 1) {
        return Math.max(arr[0], arr[1])
    } else {
        var a = rec_opt(arr, i - 2) + arr[i]
        var b = rec_opt(arr, i - 1)
        return Math.max(a, b)
    }
}
console.log(rec_opt(array, 6))

// 动态规划的方式
function dc_opt(arr) {
    // 初始化opt
    var opt = []
    for (let i in arr) {
        opt.push(0)
    }
    opt[0] = arr[0]
    opt[1] = Math.max(arr[0], arr[1])
    for (var i = 2; i < arr.length; i++) {
        var a = opt[i - 2] + arr[i]
        var b = opt[i - 1]
        opt[i] = Math.max(a, b)
    }
    return opt[array.length - 1]
}
console.log(dc_opt(array))

/**
 *例2：： 从数组中选出几个元素，使他们的和等于9，是否有这样的元素
    arr =[3,34,4,12,5,2]
*/