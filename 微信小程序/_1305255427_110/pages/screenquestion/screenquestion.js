function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, o = t(require("../../libs/lodash.core.min.js")), i = (t(require("../../utils/wxDiscode.js")), 
getApp());

Page({
    data: {
        showArr: []
    },
    onLoad: function() {
        var t = this, a = {};
        if (!i.detailDiyData.diyPropertyList.length) return !1;
        var r = i.detailDiyData.diyPropertyList;
        if (o.default.forEach(r, function(t) {
            /^屏幕显示$/.test(t.name) && (a = t);
        }), "object" === (void 0 === a ? "undefined" : e(a))) {
            for (var n = [].concat(a.values), s = 0, u = n.length; s < u; s++) /屏幕无法显示|正常显示/.test(n[s].value) ? (n.splice(s, 1), 
            --u, --s) : n[s].isShow = !1;
            t.setData({
                showArr: n
            });
        }
        i.detailDiyData.checkedDiyLength < i.detailDiyData.diyPagesStatus.length && (i.detailDiyData.isPausedDiyCheck = !0);
    },
    changeShow: function(t) {
        var e = this, o = +t.currentTarget.dataset.index, i = e.data.showArr;
        i[o].isShow = !i[o].isShow, e.setData({
            showArr: i
        });
    },
    skipNextPage: function() {
        wx.redirectTo({
            url: "../screenshow/screenshow",
            fail: function(t) {}
        });
    }
});