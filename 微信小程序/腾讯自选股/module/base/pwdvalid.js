(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../../utils/ppdog"), c = a(b), d = require("../../utils/regenerator-runtime"), e = a(d);
    var f = {
        avoidIncrease: !0,
        repeatDetection: !0,
        smartRepeatDetection: !1
    };
    module.exports = {
        checkWeakPwd: function(a, b) {
            var c, d, e = $.extend(f, b || {}), g = {}, h = 6, i = null, j = 0, k = 0, l = 0, m = 1, n = !1, o = a.split("");
            if ("string" == typeof a && 6 !== a.length) return {
                reason: "密码长度不正确",
                pass: !1
            };
            for (d = 0; d < o.length; d++) c = o[d], null == g[c] ? g[c] = 1 : g[c] += 1, g[c] > j && (j = g[c], 
            i = c), d < o.length - 1 && -1 == +o[d] - o[d + 1] && ++k, d < o.length - 1 && 1 == +o[d] - o[d + 1] && ++l, 
            o[d] === o[d + 1] ? (++m, m >= o.length / 2 && (n = !0)) : m = 1;
            return !e.smartRepeatDetection && e.repeatDetection && j >= h ? {
                reason: "同一数字不能出现" + h + "次或以上，请重设密码",
                pass: !1
            } : e.smartRepeatDetection && n ? {
                reason: "同一数字不能连续出现" + h + "次或以上，请重设密码",
                pass: !1
            } : e.avoidIncrease && (k == o.length - 1 || l == o.length - 1) ? {
                reason: "数字不能连续递增或递减，请重新设置",
                pass: !1
            } : {
                pass: !0
            };
        }
    };
})();