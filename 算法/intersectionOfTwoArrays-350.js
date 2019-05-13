/**
 * 给定两个数组，编写一个函数来计算它们的交集。
 * 
 * 输入: nums1 = [1,2,2,1], nums2 = [2,2]
    输出: [2,2]

    输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
    输出: [4,9]
 */
// 我的办法好像有点笨，三个for循环才行
function intersect(nums1, nums2) {
    var object = {}
    var result = []
    for (var num of nums1) {
        if (object[num]) {
            if (!object[num].count1) {
                object[num].count1 = 1
            } else {

                object[num].count1++
            }
        } else {
            object[num] = {}
            object[num].count1 = 1
        }
    }
    for (var num of nums2) {
        // debugger
        if (object[num]) {
            if (!object[num].count2) {
                object[num].count2 = 1
            } else {
                object[num].count2++
            }
        } else {
            object[num] = {}
            object[num].count2 = 1
        }
    }
    for (const o in object) {
        if (object[o].count1 && object[o].count2) {
            for (let i = 0; i < Math.min(object[o].count1, object[o].count2); i++) {
                result.push(o)
            }
        }
    }
    console.log(result)
    return result
}
var nums1 = [4, 9, 5], nums2 = [9, 4, 9, 8, 4]
intersect(nums1, nums2)