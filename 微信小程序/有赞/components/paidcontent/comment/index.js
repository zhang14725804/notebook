!function(e) {
    function t(o) {
        if (n[o]) return n[o].exports;
        var r = global.installedModules[o] = n[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(r.exports, r, r.exports, t), r.l = !0, r.exports;
    }
    var n = {};
    n = global.installedModules = global.installedModules || {}, t.m = e, t.c = n, t.d = function(e, n, o) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: o
        });
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(n, "a", n), n;
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 89);
}({
    89: function(e, t, n) {
        Component({
            properties: {
                commentData: Object,
                showLikeBtn: {
                    type: Boolean,
                    value: !0
                }
            },
            data: {},
            methods: {
                onClickLike: function(e) {
                    var t = e.currentTarget.dataset.comment;
                    this.triggerEvent("onClickLike", t), console.log("点击喜欢");
                },
                onDelComment: function() {
                    var e = this;
                    wx.showModal({
                        content: "确定删除吗？",
                        success: function(t) {
                            t.confirm && (e.triggerEvent("onDelComment", e.properties.commentData), console.log("点击删除"));
                        }
                    });
                }
            }
        });
    }
});