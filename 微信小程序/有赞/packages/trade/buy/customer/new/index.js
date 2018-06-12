!function(t) {
    function e(s) {
        if (o[s]) return o[s].exports;
        var n = global.installedModules[s] = o[s] = {
            i: s,
            l: !1,
            exports: {}
        };
        return t[s].call(n.exports, n, n.exports, e), n.l = !0, n.exports;
    }
    t = Object.assign(require("../../../../../commons.js").modules, t);
    var o = {};
    o = global.installedModules = global.installedModules || {}, e.m = t, e.c = o, e.d = function(t, o, s) {
        e.o(t, o) || Object.defineProperty(t, o, {
            configurable: !1,
            enumerable: !0,
            get: s
        });
    }, e.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, e.n = function(t) {
        var o = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return e.d(o, "a", o), o;
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 151);
}({
    151: function(t, e, o) {
        var s, n = (s = o(0)) && s.__esModule ? s : {
            default: s
        }, r = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t) for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e.default = t, e;
        }(o(1)), u = getApp(), a = {
            onLoad: function(t) {
                console.log(t), this.customer = JSON.parse(t.customer || "{}");
            },
            onReady: function() {
                this.setData({
                    customer: this.customer
                });
            },
            handleZanFieldChange: function(t) {
                var e = t.componentId, o = t.detail;
                this.customer = this.customer || {}, this.customer[e] = o.value;
            },
            saveForm: function() {
                var t = this;
                return this.customer.user_name ? this.customer.telephone ? void u.request({
                    path: this.customer.id ? "wscuser/user/modify_contact.json" : "wscuser/user/create_contact.json",
                    data: this.customer,
                    method: this.customer.id ? "PUT" : "POST"
                }).then(function() {
                    t.showZanToast((t.customer.id ? "更新" : "添加") + "联系人成功"), setTimeout(function() {
                        wx.navigateBack();
                    }, 1e3);
                }).catch(function(e) {
                    return t.showZanToast(e.message || e.msg || (t.customer.id ? "更新" : "添加") + "联系人失败");
                }) : this.showZanToast("必需填写联系人电话") : this.showZanToast("必需填写联系人姓名");
            },
            dropCustomerInfo: function() {
                var t = this;
                u.request({
                    method: "DELETE",
                    path: "wscuser/user/delete_contact.json",
                    query: {
                        id: this.customer.id
                    }
                }).then(function() {
                    t.showZanToast("删除联系人成功"), setTimeout(function() {
                        wx.navigateBack();
                    }, 1e3);
                }).catch(function(e) {
                    return t.showZanToast(e.message || e.msg || "删除联系人失败");
                });
            }
        };
        (0, n.default)(r.Field, r.Toast, a);
    }
});