!function(t) {
    function e(n) {
        if (r[n]) return r[n].exports;
        var o = global.installedModules[n] = r[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(o.exports, o, o.exports, e), o.l = !0, o.exports;
    }
    t = Object.assign(require("../../../../../commons.js").modules, t);
    var r = {};
    r = global.installedModules = global.installedModules || {}, e.m = t, e.c = r, e.d = function(t, r, n) {
        e.o(t, r) || Object.defineProperty(t, r, {
            configurable: !1,
            enumerable: !0,
            get: n
        });
    }, e.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, e.n = function(t) {
        var r = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return e.d(r, "a", r), r;
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 152);
}({
    152: function(t, e, r) {
        var n, o = (n = r(0)) && n.__esModule ? n : {
            default: n
        }, u = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t) for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e;
        }(r(1)), s = getApp(), a = function(t) {
            var e = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : []).filter(function(e) {
                return e.id === +t;
            });
            return e.length ? e[0] : {};
        };
        (0, o.default)(u.Toast, {
            onLoad: function() {
                this.customer = wx.getStorageSync("trade-buy-customer") || {};
            },
            onShow: function() {
                this.fetchCustomers();
            },
            fetchCustomers: function() {
                var t = this;
                s.request({
                    path: "wscuser/user/contact_list.json"
                }).then(function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], r = e.filter(function(e) {
                        return e.id === t.customer.id;
                    });
                    t.setData({
                        customers: e,
                        selectedCustomerId: r.length > 0 ? r[0].id : 0
                    });
                }).catch(function(e) {
                    return t.showZanToast(e.message || e.msg || "获取联系人列表失败");
                });
            },
            editBtnClick: function(t) {
                var e = t.currentTarget.dataset.id;
                wx.navigateTo({
                    url: "/packages/trade/buy/customer/new/index?customer=" + JSON.stringify(a(e, this.data.customers))
                });
            },
            selectCellClick: function(t) {
                var e = t.currentTarget.id;
                wx.setStorageSync("trade-buy-customer", a(e, this.data.customers)), wx.navigateBack();
            }
        });
    }
});