// 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素
// 我的方法，利用对象的特性(笨)
var singleNumber = function (nums) {
    var obj = {}
    for (var i in nums) {
        if (obj[nums[i]]) {
            obj[nums[i]] += 1
        } else {
            obj[nums[i]] = 1
        }
    }
    for (var key in obj) {
        if (obj[key] % 2 === 1) {
            return key
        }
    }
};

// 利用二进制异或的性质来完成，将所有数字异或即得到唯一出现的数字（这个妙）
/**
 * 
 * 2^3 = 1
 * 3^5 = 6
 * 
 *  1.交换律：a ^ b ^ c  <=> a ^ c ^ b
    2.任何数于0异或为任何数 0 ^ n => n
    3.相同的数异或为0: n ^ n => 0
    时间复杂度必须是 O(n)，并且空间复杂度为 O(1)
 */
var singleNumber = function (nums) {
    let res = 0;
    for (let n of nums) {
        res ^= n;
    }
    return res;
};

