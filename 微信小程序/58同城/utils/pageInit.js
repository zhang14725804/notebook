var t = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    }
    return t;
};

module.exports = {
    createPage: function(a) {
        var e = this, r = require("../pages/common/ready")();
        a = "function" == typeof (a = a || {}) ? a() : a;
        var o = [ r ].concat(a);
        o.forEach(function(t, a) {
            a > 0 && (o[a].methodOptions = o[a].methodOptions || {}, Object.assign(o[a].methodOptions, o[a - 1].methodOptions));
        }), (a = Object.assign.apply(null, o)).data = Object.assign({}, r._pageData, a.data), 
        a.data.loading = !0;
        var n = !0, i = !1, c = void 0;
        try {
            for (var s, d = Object.keys(a)[Symbol.iterator](); !(n = (s = d.next()).done); n = !0) !function() {
                var r = s.value;
                if (/^\$?e_/.test(r) && "function" == typeof a[r]) {
                    var o = function(a) {
                        (a = a || {}).currentTarget = a.currentTarget || {}, a.currentTarget.dataset = a.currentTarget.dataset || a.dataset || {}, 
                        console.log("this.data.pageName", this.data.pageName);
                        var o = this.methodOptions && this.methodOptions[c] || {};
                        if (this.data.pageName && i) {
                            var s = o.type || "";
                            s && this.data.pageName && e.doLogClick(t({
                                pageParam: encodeURIComponent(e.urlConcat(e.currentUrlParams)),
                                cateCode: this.data.cateCode,
                                pageType: this.data.pageType || "",
                                pageName: this.data.pageName || "",
                                clickType: s,
                                clickName: c
                            }, a.currentTarget.dataset, {
                                record: void 0,
                                formId: encodeURIComponent(a.detail && a.detail.formId || ""),
                                cate: this.data.cate || ""
                            }));
                        }
                        try {
                            n.apply(this, arguments);
                        } catch (a) {
                            console.error("方法发生错误 页面:" + (this.data.pageName || "") + " 方法:" + r + " \n", a);
                        }
                    }, n = a[r], i = /^\$/.test(r), c = i ? r.substr(1) : r;
                    i && delete a[r], a[r] = a[c] = n.optimized ? o : e.throttle(500, o);
                }
            }();
        } catch (t) {
            i = !0, c = t;
        } finally {
            try {
                !n && d.return && d.return();
            } finally {
                if (i) throw c;
            }
        }
        Page(a);
    }
};