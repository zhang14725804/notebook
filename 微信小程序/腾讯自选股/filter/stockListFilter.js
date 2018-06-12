(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(a) {
        return !1 === a.delay && "hk" === a.market ? "r_" + a.symbol : a.symbol;
    }
    function c(a) {
        var c = [], d = 0;
        return a.stocklist.forEach(function(a) {
            "hk" == a.market ? "ZS" !== a.type && 20 > d ? (a.delay = !1, d++) : "ZS" === a.type ? a.delay = !1 : (a.delay = !0, 
            d++) : a.delay = !1, a.qtsymbol = b(a);
            var e = {};
            Object.keys(a).forEach(function(b) {
                var c = h(b);
                e[c] = a[b];
            }), c.push(e);
        }), {
            name: a.groupinfo.name,
            gid: a.groupinfo.id,
            hkys: d,
            listData: c
        };
    }
    var d = require("../utils/ppdog"), e = a(d), f = require("../utils/regenerator-runtime"), g = a(f), h = function(a) {
        return a.replace(/\b\w+\b/g, function(a) {
            return a.substring(0, 1).toUpperCase() + a.substring(1);
        });
    };
    module.exports = function(a) {
        var b = {};
        return a.grouplist.forEach(function(a) {
            var e = c(a);
            b[e.gid] = e;
        }), {
            onGid: a.grouplist[0].groupinfo.id,
            stockListMap: b,
            groups: a.groups
        };
    };
})();