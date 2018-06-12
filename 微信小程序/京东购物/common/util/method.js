var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
}, t = function(o, t) {
    return console.error(o), t;
};

module.exports = {
    error: t,
    setState: function(t) {
        var n = this;
        return new Promise(function(e, r) {
            if ("object" !== (void 0 === t ? "undefined" : o(t))) r(new Error("setData 的数据不是对象")); else {
                var i = void 0;
                n.__version ? i = n.__version : (i = wx.getSystemInfoSync().SDKVersion, n.__version = i);
                var u = i.split(".");
                u[0] >= 1 && u[1] >= 5 && u[2] >= 0 ? n.setData(t, function() {
                    e("ok");
                }) : (n.setData(t), setTimeout(function() {
                    return e("ok");
                }, 100));
            }
        });
    },
    wxPromisify: function(n) {
        return "function" == typeof n && function(t) {
            return t = "object" === (void 0 === t ? "undefined" : o(t)) ? t : {}, new Promise(function(o, e) {
                n(Object.assign({}, t, {
                    success: function(t) {
                        o(t);
                    },
                    fail: function(o) {
                        e(o);
                    },
                    complete: function() {}
                }));
            });
        } || t("微信接口 Promise 化入参类型错误", function() {});
    },
    createStyle: function(o) {
        var t = "";
        for (var n in o) if (o.hasOwnProperty(n)) {
            var e = o[n];
            t += (n = n.replace(/([A-Z])/g, "-$1").toLowerCase()) + ": " + e + ";";
        }
        return t;
    }
};