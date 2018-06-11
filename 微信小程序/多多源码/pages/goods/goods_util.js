function a() {
    var a = getCurrentPages(), e = void 0;
    return a.length > 0 && (e = a[a.length - 1] || {}), e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../common/index"), t = {
    hasSkuSelector: {
        valName: "hasSkuSelector",
        fromData: !1
    },
    goodsBottomBarData: {
        valName: "goodsBottomBarData",
        fromData: !1
    },
    goods: {
        valName: "goodsInfo",
        fromData: !0
    },
    selectedGroup: {
        valName: "selectedGroup",
        fromData: !0
    },
    currentSelect: {
        valName: "currentSelect",
        fromData: !0
    },
    goodsNumber: {
        valName: "goodsNumber",
        fromData: !0
    },
    mallInfo: {
        valName: "mallInfo",
        fromData: !0
    },
    currentSkuImg: {
        valName: "currentSkuImg",
        fromData: !0
    },
    selectedLocalGroupOrderId: {
        valName: "selectedLocalGroupOrderId",
        fromData: !0
    }
}, r = {
    setBarDataInPage: function(e) {
        var r = a();
        if (r) {
            var o = {};
            for (var l in e) if (e.hasOwnProperty(l) && t.hasOwnProperty(l)) {
                var u = t[l];
                u.fromData ? o[u.valName] = e[l] : r[u.valName] = e[l];
            }
            this.setData(o);
        }
    },
    getBarDataNeededFromPage: function(e) {
        var r = a();
        if (r) {
            var o = {};
            for (var l in t) if (t.hasOwnProperty(l)) {
                var u = t[l];
                u.fromData ? o[l] = r.data[u.valName] : o[l] = r[u.valName];
            }
            return e ? o[e] : o;
        }
    },
    setData: function(e) {
        var t = a();
        t && t.setData(e);
    },
    goLotteryList: function() {
        var a = this.getBarDataNeededFromPage("goods");
        !a || 2 !== a.luckyStatus && 3 !== a.luckyStatus || !a.luckyId || e.Navigation.forward("/package_a/lottery_list/lottery_list?" + e.UrlUtil.buildQuery({
            lucky_id: a.luckyId
        }));
    },
    goDrawLuckyList: function() {
        e.Navigation.forward("/pages/subject/subject?" + e.UrlUtil.buildQuery({
            subject_id: 2742
        }));
    }
};

exports.default = r;