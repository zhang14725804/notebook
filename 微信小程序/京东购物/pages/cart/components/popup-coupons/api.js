function n(n) {
    var t = {
        date: "YYYY.MM.DD",
        datetime: "YYYY.MM.DD kk:mm:ss"
    };
    if (1 == n.limitType) return "领取后" + n.addDays + "天内有效";
    var o = 2 == n.hourCoupon ? t.datetime : t.date;
    return c(new Date(+n.beginTime)).format(o) + " - " + c(new Date(+n.endTime)).format(o);
}

function t(n) {
    var t = 0;
    if (1 == n.couponType && 3 == n.couponStyle && 0 !== n.discountDesc.length) {
        var o = JSON.parse(n.discountDesc);
        t = Math.min.apply(Math, o.info.map(function(n) {
            return +n.discount;
        }));
    } else t = 1 - n.discount / n.quota;
    return t;
}

function o(n, t) {
    var o = {
        discount: "",
        quota: [],
        desc: "",
        isMutilDiscount: !1
    }, u = 0 == t.couponType;
    if (n) {
        var e = {
            info: []
        }, i = [], c = [];
        if (!(e = JSON.parse(t.discountDesc)).info.length) return;
        o.isMutilDiscount = e.info.length > 1, e.info.sort(function(n, t) {
            return +n.discount - +t.discount;
        }).forEach(function(n) {
            i.push(n), c.push({
                qtext: "满" + n.quota + "元",
                dtext: "" + 10 * n.discount
            });
        }), o.discount = i.map(function(n) {
            return "满" + n.quota / 100 + "元可用";
        }), o.desc = c, o.quota.push("最高可减" + 100 * e.high / 100 + "元");
    } else o.discount = t.discount / 100, o.desc = t.discountDesc, !u && o.quota.push("满" + t.quota / 100 + "元可用");
    return o;
}

function u(n) {
    return r.ALL == n.couponKind ? "适用于京东全品类商品（特殊商品除外）" : n.name;
}

function t(n) {
    var t = 0;
    if (1 == n.couponType && 3 == n.couponStyle && 0 !== n.discountDesc.length) {
        var o = JSON.parse(n.discountDesc);
        t = Math.min.apply(Math, o.info.map(function(n) {
            return +n.discount;
        }));
    } else t = 1 - n.discount / n.quota;
    return t;
}

function e(n) {
    return n.sort(function(n, o) {
        var u = 0, e = 0;
        return u = t(n), e = t(o), u - e;
    });
}

require("../../../component.js");

var i = require("../../../../models/cart/model.js"), c = (new (require("../../../../common/logger.js"))("购物车-优惠券组件API"), 
require("../../../../libs/moment.min")), s = {
    GETTABLE: 1,
    USEABLE: 2
}, r = {
    ALL: "0",
    LIMIT: "1",
    VENDER: "2",
    VENDER_LIMIT: "3"
}, a = "https://img10.360buyimg.com/n4/";

module.exports = {
    format: function(t) {
        var c = [], d = [];
        Date.now();
        return t.forEach(function(t) {
            var e = 1 == t.couponType && 3 == t.couponStyle && 0 !== t.discountDesc.length, p = o(e, t), m = {
                name: u(t),
                encryptedKey: t.encryptedKey,
                roleId: t.roleId,
                couponType: t.couponType,
                skuImgs: [],
                date: "",
                discount: t.discount,
                quota: t.quota,
                discountText: p.discount,
                quotaText: p.quota,
                isMutilDiscount: p.isMutilDiscount,
                mutilDiscountText: p.desc,
                couponKind: t.couponKind,
                useable: t.couponDo == s.USEABLE,
                status: t.couponDo,
                endTime: t.endTime,
                beginTime: t.beginTime,
                isDiscount: e
            };
            r.ALL === t.couponKind ? t.skuidlist = [] : t.skuidlist.forEach(function(n) {
                var t = i.findProductBySkuId(n), o = "";
                t && (o = -1 !== (o = t.mainSku.image).indexOf("360buyimg.com") ? o : a + o.replace(/.*(jfs*)/, "$1"), 
                m.skuImgs.push(o));
            }), m.date = n(t), s.GETTABLE == t.couponDo && c.push(m), s.USEABLE == t.couponDo && d.push(m);
        }), {
            gettable: e(c),
            useable: e(d)
        };
    }
};