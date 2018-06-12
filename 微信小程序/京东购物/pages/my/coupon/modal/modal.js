function t(t) {
    return "string" == typeof t ? t.indexOf("<br>") > 0 ? (t = t.split("<br>")).forEach(function(t) {
        t.trim();
    }) : t = [ t.trim() ] : "[object Array]" != Object.prototype.toString.call(t) && (t = [ t ]), 
    t;
}

var e = (Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
    }
    return t;
})({}, {
    ICON_WAIT: "icon_wait",
    ICON_FAIL: "icon_fail",
    ICON_SUCCESS: "icon_success",
    ICON_WARN: "icon_warn"
}, {
    show: function() {
        var e = this, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = {
            showMask: !0,
            showClose: !1,
            btns: [ {
                name: "确定",
                color: "#e93b3d"
            }, {
                name: "取消"
            } ]
        };
        n.tip && (n.tip = t(n.tip)), n.content && (n.content = t(n.content));
        var a = Object.assign({}, o, n), i = getCurrentPages();
        this.page = i[i.length - 1], this.page.tapModalBtn = function(t) {
            var n = t.currentTarget.dataset.index, o = !0;
            a.btns[n].cb && "function" == typeof a.btns[n].cb && (o = a.btns[n].cb.call(e.page)), 
            void 0 === o && (o = !0), o && e.hide();
        }, this.page.tapModalAlert = function() {
            return !1;
        }, this.page.closeModalAlert = function() {
            "function" == typeof n.closeModalAlert && n.closeModalAlert(), e.hide();
        }, this.page.setData({
            modal: a,
            modalToggle: !0
        });
    },
    hide: function() {
        this.page.setData({
            modal: {},
            modalToggle: !1
        });
    }
});

module.exports = e;