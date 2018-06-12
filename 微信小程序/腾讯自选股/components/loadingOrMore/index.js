(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = Object.assign || function(a) {
        for (var b, c = 1; c < arguments.length; c++) for (var d in b = arguments[c], b) Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
        return a;
    }, c = require("../../utils/ppdog"), d = a(c), e = require("../../utils/regenerator-runtime"), f = a(e);
    Component({
        properties: {},
        data: {
            showMore: !1,
            showLoading: !1,
            showNoMore: !1,
            moreNewsBtn: "",
            staticBtn: "",
            color: null,
            rotate: ""
        },
        created: function() {
            this.init();
        },
        methods: {
            init: function() {
                var a = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : {};
                this.setData({
                    showLoading: !1,
                    showMore: !1,
                    color: a.color || null,
                    staticBtn: a.btn || "点击查看更多"
                });
            },
            changeLoadingAnimation: function(a) {
                var c = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : {}, d = "", e = "", f = !1, g = !1, h = !1, i = this.data.staticBtn;
                "rotate" === a ? (d = "rotate", f = !0, h = !0) : "more" === a ? (e = i, f = !0) : "fail" === a ? (e = "加载失败，请稍后重试", 
                f = !0) : "hide" === a ? (f = !1, h = !1) : "noMore" === a ? (f = !1, g = !0, e = "无更多数据") : void 0;
                c = b(c, {
                    rotate: d,
                    moreNewsBtn: e,
                    showMore: f,
                    showNoMore: g,
                    showLoading: h
                }), this.setData(b({}, c));
            },
            bindLoadingMore: function() {
                var a = getApp(), b = a.Event;
                this.triggerEvent("getmore");
            }
        }
    });
})();