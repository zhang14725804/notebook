var t = {
    show: function(e) {
        var i = this, s = e.icon, o = void 0 === s ? t.icon.error : s, a = e.message, c = void 0 === a ? "" : a, r = e.duration, n = void 0 === r ? 2e3 : r, h = e.pageObj, u = void 0 === h ? "" : h, m = e.complete, p = void 0 === m ? "" : m;
        if (c) {
            if (u) this.pageObj = u; else {
                var g = getCurrentPages();
                this.pageObj = g[g.length - 1];
            }
            "function" == typeof p && (this.complete = p), this.pageObj.setData({
                toastData: {}
            }), clearTimeout(this.timer), this.pageObj.setData({
                toastData: {
                    icon: o,
                    message: c
                }
            }), setTimeout(function() {
                i.hide();
            }, n);
        }
    },
    hide: function() {
        clearTimeout(this.timer), this.pageObj.setData({
            toastData: {}
        }), this.complete && this.complete();
    }
};

t.icon = {
    success: "success-icon",
    error: "error-icon"
}, module.exports = t;