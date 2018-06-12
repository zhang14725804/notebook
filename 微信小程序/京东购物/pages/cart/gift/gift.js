function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e) {
    return t = (t / 100).toFixed(2), e ? t.split(".") : t;
}

var a = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    return e.default = t, e;
}(require("../../../api/Ptag/Ptag_constants")), i = t(require("../../../api/Ptag/Ptag_utils.js")), n = t(require("../../../api/Ptag/report_manager.js")), o = require("../../page.js"), d = require("../../../common/fe_helper.js"), s = require("../../../common/toast/toast.js"), r = require("../../../models/cart/model.js"), u = getApp().debug("购物车 - 赠品二级页"), c = (getApp(), 
{
    DISCOUNT: 1,
    GIFT: 2,
    "3C": 3
}), f = {
    UNCHECKED: 1,
    CHECKED: 2,
    DISABLED: 3,
    LIMITED: 4
};

new o({
    data: {
        viewDidLoad: !1,
        loading: !1,
        TYPE: c,
        STATUS: f,
        type: 0,
        d: {},
        num: 0,
        soldOut: {},
        checkInfo: {},
        limited: {}
    },
    onLoad: function(t) {
        this.onTapItem = d.throttle(this.onTapItem, 500), this.onConfirm = d.throttle(this.onConfirm, 500);
        var i = t.vid, o = t.cate, f = t.pid, h = t.sku, C = t.type, l = t.itemId, m = {};
        if (!i || !f) return s.show({
            icon: s.ICON.WARNING,
            content: "参数错误"
        }), setTimeout(function() {
            wx.navigateBack();
        }, 1500);
        if (C == c["3C"]) this.data.d = r.getGiftPool(h, l), this.data.d.listGiftPools.forEach(function(t) {
            m[t.PoolNo] = {}, t.skus.forEach(function(e) {
                e.image_ = d.getImg(e.image, 150), m[t.PoolNo][e.id] = e.selectState;
            });
        }); else {
            var p = [];
            this.data.d = r.getManGiftSkus(l), this.data.d.manGiftSkus.forEach(function(t) {
                t.image_ = t.image, t.price_ = t.promoPrice, t.giftNeedMoney_ = parseFloat(e(t.giftNeedMoney)), 
                m[t.id] = t.giftSelectState, p.push(t.id);
            }), C == c.DISCOUNT && p.length && this.updateStock(p);
        }
        switch (this.cate = o, this.pid = f, this.sku = h, this.itemId = l, u({
            vid: i,
            cate: o,
            pid: f,
            sku: h,
            type: C
        }, this.data.d), wx.setNavigationBarTitle({
            title: C == c.DISCOUNT ? "换购商品" : "领取赠品"
        }), this.setData({
            viewDidLoad: !0,
            type: C,
            d: this.data.d,
            checkInfo: m
        }), this.updateCheckedNum(), C) {
          case c.DISCOUNT:
            n.default.addPtagExposure(a.CART_DISCOUNT_PAGE);
            break;

          case c.GIFT:
            n.default.addPtagExposure(a.CART_GIFT_PAGE);
            break;

          case c["3C"]:
            n.default.addPtagExposure(a.CART_3C_PAGE);
        }
    },
    updateStock: function(t) {
        var e = this;
        r.getStock(t, function(t, a) {
            if (u("getStock", t, a), !t) {
                var i = {};
                for (var n in a) i[n] = 34 == a[n].a;
                e.setData({
                    soldOut: i
                });
            }
        });
    },
    updateCheckedNum: function() {
        var t = this.data.checkInfo, e = {}, a = 0;
        if (this.data.type == c["3C"]) for (var i in t) for (var n in t[i]) t[i][n] == f.CHECKED && a++; else {
            for (var o in t) t[o] == f.CHECKED && a++;
            var d = this.data.d.canSelectedGiftNum;
            if (a == d && d > 1) for (var s in t) t[s] != f.CHECKED && (e[s] = !0);
        }
        this.setData({
            num: a,
            limited: e
        });
    },
    setLoadingState: function(t) {
        this.setData({
            loading: t
        });
    },
    onCheck: function(t) {},
    onTapItem: function(t) {
        var e = t.currentTarget.dataset, a = e.pool, i = e.sku, n = e.status, o = t.target;
        if (!o.id || -1 == o.id.indexOf("check_box_")) return wx.navigateTo({
            url: "../../item/detail/detail?sku=" + i
        });
        if (n != f.DISABLED && !this.data.soldOut[i]) {
            var d = this.data.checkInfo;
            if (this.data.type == c["3C"]) {
                if (d[a][i] == f.UNCHECKED) {
                    for (var r in d[a]) d[a][r] == f.CHECKED && (d[a][r] = f.UNCHECKED);
                    d[a][i] = f.CHECKED;
                }
            } else {
                var u = this.data.d.canSelectedGiftNum;
                if (n == f.LIMITED) return s.show({
                    icon: s.ICON.WARNING,
                    content: "最多只能选择" + u + "件商品"
                });
                if (d[i] == f.CHECKED) d[i] = f.UNCHECKED; else if (1 == u) {
                    for (var h in d) d[h] == f.CHECKED && (d[h] = f.UNCHECKED);
                    d[i] = f.CHECKED;
                } else u > 1 && (d[i] = f.CHECKED);
            }
            this.setData({
                checkInfo: d
            }), this.updateCheckedNum();
        }
    },
    onConfirm: function(t) {
        var e = this, n = this.data.checkInfo, o = [], d = function(t) {
            return e.setLoadingState(0), s.show({
                icon: s.ICON.WARNING,
                content: t.toString()
            });
        }, h = function(t) {
            u("addCmdy / rmvCmdy", t), e.setLoadingState(!1);
            var n = {
                num: e.data.num,
                sku: o.join("_")
            };
            switch (e.data.type) {
              case c.DISCOUNT:
                i.default.addPtag(a.CART_DISCOUNT_PAGE_SUBMIT, n);
                break;

              case c.GIFT:
                i.default.addPtag(a.CART_GIFT_PAGE_SUBMIT, n);
                break;

              case c["3C"]:
                i.default.addPtag(a.CART_3C_PAGE_SUBMIT, n);
            }
            wx.navigateBack();
        };
        if (this.data.type == c["3C"]) {
            var C = [];
            for (var l in n) for (var m in n[l]) n[l][m] == f.CHECKED && C.push(m);
            return o = C, this.setLoadingState(!0), r.addCmdy(r.ACTIONS.GIFT_3C, {
                polyType: this.cate,
                itemId: this.itemId,
                promotionId: this.pid,
                mainSku: {
                    id: this.sku
                },
                listSelectGiftPoolGiftIds: C.join("_")
            }).then(h).catch(d);
        }
        if (this.data.num > 0) {
            this.setLoadingState(!0);
            var p = [];
            for (var E in n) n[E] == f.CHECKED && (p.push({
                polyType: this.cate,
                itemId: this.itemId,
                promotionId: this.pid,
                mainSku: {
                    id: E
                },
                __itemCate: "canselectgift"
            }), o.push(E));
            return p.length ? r.addCmdy(r.ACTIONS.GIFT_SUIT, p).then(h).catch(d) : h();
        }
        var I = [];
        this.data.d.manGiftSkus.forEach(function(t) {
            if (t.giftSelectState == f.CHECKED) {
                var a = r.findItemById(e.itemId);
                a.__type = 1, a.mainSku = {
                    id: t.id
                }, I.push(a);
            }
        }), I.length ? (this.setLoadingState(!0), r.rmvCmdy(I).then(h).catch(d)) : h();
    }
});