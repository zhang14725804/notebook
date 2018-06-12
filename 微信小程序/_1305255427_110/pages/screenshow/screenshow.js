var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../libs/lodash.core.min.js")), e = getApp();

Page({
    data: {
        isShowContent: !1,
        isHideContent: !0,
        selItemArr: [],
        lastSelIndex: -1
    },
    baseData: {
        pullStartY: 0,
        propertyNameId: -1,
        curDiypropertyItem: {}
    },
    onLoad: function() {
        var a = this, i = [];
        if (!e.detailDiyData.diyPropertyList.length) return !1;
        i = e.detailDiyData.diyPropertyList, t.default.forEach(i, function(t) {
            /^屏幕显示$/.test(t.name) && (a.baseData.curDiypropertyItem = t, a.baseData.propertyNameId = t.id);
        });
        var s = [].concat(a.baseData.curDiypropertyItem.values);
        t.default.forEach(s, function(t, e) {
            /屏幕无法显示/.test(t.value) ? s.splice(e, 1) : (t.isSelected = !1, t.isShowTips = !1, 
            t.index = e);
        }), a.setData({
            selItemArr: s
        }), e.detailDiyData.checkedDiyLength < e.detailDiyData.diyPagesStatus.length && (e.detailDiyData.isPausedDiyCheck = !0);
    },
    contentFadeIn: function() {
        var t = this;
        t.setData({
            isHideContent: !1
        }), setTimeout(function() {
            t.setData({
                isShowContent: !0
            });
        }, 0);
    },
    contentFadeOut: function() {
        var t = this;
        t.setData({
            isShowContent: !1
        }), setTimeout(function() {
            t.setData({
                isHideContent: !0
            });
        }, 600);
    },
    pullstart: function(t) {
        this.baseData.pullStartY = t.changedTouches[0].pageY;
    },
    pullEnd: function(t) {
        var e = this, a = e.baseData.pullStartY, i = t.changedTouches[0].pageY;
        a && i && (i - a > 30 ? e.contentFadeIn() : i - a < -30 && e.contentFadeOut());
    },
    selItem: function(t) {
        var e = this, a = +t.currentTarget.dataset.value, i = e.data.selItemArr, s = e.data.lastSelIndex;
        "number" == typeof a || (a = -1), s > -1 && (i[s].isSelected = !1), i[a].isSelected = !0, 
        e.setData({
            lastSelIndex: a,
            selItemArr: i
        }), e.finishSel(a);
    },
    finishSel: function(t) {
        var e = this;
        if ("number" == typeof t && t > -1) {
            var a = {}, i = e.data.selItemArr;
            a.id = i[t].id, a.value = i[t].value, e.changePropertyNameIdList(a);
        }
    },
    hideTips: function(e) {
        var a = this, i = +e.currentTarget.dataset.index;
        if (i > -1) {
            var s = a.data.selItemArr;
            t.default.forEach(s, function(t, e) {
                e === i && (t.isShowTips = !1);
            }), a.setData({
                selItemArr: s
            });
        }
    },
    showTips: function(e) {
        var a = this, i = +e.currentTarget.dataset.index;
        if (i > -1) {
            var s = a.data.selItemArr;
            t.default.forEach(s, function(t, e) {
                e === i && (t.isShowTips = !0);
            }), a.setData({
                selItemArr: s
            });
        }
    },
    stopBubble: function(t) {},
    changePropertyNameIdList: function(t) {
        var a = this, i = e.detailDiyData.propertyNameIdList, s = a.baseData.propertyNameId;
        if (s > -1) {
            var r = i[s];
            a.baseData.curDiypropertyItem.mixinStatus.isSelected = !0, r.data.selectedValue = t, 
            r.status.isSelected = !0, e.detailDiyData.navNextDiyProperty();
        }
    }
});