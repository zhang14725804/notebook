function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../components/bubble/bubble")), r = e(require("../../common/gotop_util")), a = e(require("../../components/resource_place_config/resource_place_config")), n = e(require("../../components/new_arrival_templ/new_arrival")), i = (e(require("../../libs/es6-promise.min")), 
e(require("../../libs/co/we-index"))), o = e(require("../../libs/regenerator-runtime/runtime")), s = require("../../common/index"), c = {
    onShareAppMessage: function() {
        return this.$generateShareContent({
            title: "新品尝鲜"
        });
    },
    onLoad: function() {
        var e = this;
        (0, i.default)(o.default.mark(function t() {
            return o.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.prev = 0, e.newArrival = new n.default({
                        page: e,
                        ns: "newArrival"
                    }), e.$showLoading(), e.newArrival.getListId(), t.next = 6, [ e.newArrival.getLotterySubjectGoods(e), e.newArrival.getSubSubjectImg(e) ];

                  case 6:
                    e.newArrival.requestList(!0), e.resourcePlaceControl = new a.default({
                        page: e,
                        ns: "resourcePlaceConfig",
                        resourcePlaceKey: "floating_shangxin"
                    }), t.next = 13;
                    break;

                  case 10:
                    t.prev = 10, t.t0 = t.catch(0), console.log(t.t0);

                  case 13:
                  case "end":
                    return t.stop();
                }
            }, t, this, [ [ 0, 10 ] ]);
        }));
    },
    onUnload: function() {
        t.default.close(this);
    },
    onShow: function() {
        t.default.init(this, !1, "", 1);
    },
    onHide: function() {
        t.default.close(this);
    },
    reLoad: function() {
        this.newArrival.naCacheGoodsList = [], this.setData({
            page: 1,
            noOrderText: "",
            list: [],
            showError: !1,
            isLoadAll: !1
        }), this.newArrival.getLotterySubjectGoods(this), this.newArrival.requestList(!0);
    },
    onPageScroll: function(e) {
        if (e) {
            var t = parseInt(e.scrollTop);
            r.default.showGoTopBtn(t, this), this.updateScrollTop(t);
        }
    },
    onReachBottom: function() {
        this.newArrival.requestList();
    },
    getTrackingParams: function(e, t, r) {
        var a = {
            op: e,
            page_name: "shangxin",
            goods_id: r.goodsId,
            idx: t,
            page_element: "goods",
            list_id: r.listId
        };
        return r.transData && (r.transData.ad && (a.ad = JSON.stringify(r.transData.ad)), 
        r.transData.p_rec && (a.p_rec = JSON.stringify(r.transData.p_rec)), r.transData.p_search && (a.p_search = JSON.stringify(r.transData.p_search))), 
        a;
    },
    gotoGoodsDetail: function(e) {
        var t = e.currentTarget.dataset, r = t.goodsId, a = s.DataUtil.checkByKey(this.newArrival.data.naList, r, "goodsId");
        Object.keys(a).length <= 0 && (a = s.DataUtil.checkByKey(this.newArrival.data.lotteryGoodsList, r, "goodsId"));
        var n = t.itemIndex, i = void 0, o = this.getTrackingParams("click", n, a);
        "timeLimit" === t.refer ? (o.page_section = "time_limit", i = 99409) : (o.page_section = "goods_list", 
        i = 98978), o.page_el_sn = i, (0, s.TrackingRecord)(o), this.$forward("goods", Object.assign({
            goods_id: r,
            refer_page_el_sn: i
        }, a.transData)), this.$uploadFormId(e);
    },
    imprItems: function(e) {
        var t = this;
        e.forEach(function(e) {
            var r = t.newArrival.data.naList || [];
            if (e < r.length) {
                var a = r[e] || {}, n = t.getTrackingParams("impr", e, a);
                n.page_el_sn = 98978, (0, s.TrackingRecord)(n);
            }
        });
    }
};

(0, s.PddPage)(c, {
    pageName: "new_arrivals",
    pageSn: 10017
});