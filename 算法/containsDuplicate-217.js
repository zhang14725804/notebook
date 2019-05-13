/**
 * 给定一个整数数组，判断是否存在重复元素。
    如果任何值在数组中出现至少两次，函数返回 true。如果数组中每个元素都不相同，则返回 false。
 */

// 方法一：排序，然后比较相邻元素是否想同
// 方法二：数据存入set之后和之前的数组对比长度
var containsDuplicate = function (nums) {
    const n = nums.length
    if (n < 2) {
        return false
    }
    return !(n === (new Set(nums)).size)
};