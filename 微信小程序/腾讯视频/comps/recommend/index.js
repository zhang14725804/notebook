var e = require("../../module/request/request"), o = require("../../pages/play/model/coverdatamap-model"), r = require("../../module/recreport");

module.exports = function() {
    return {
        data: {
            recommend: {},
            recommendShowLayer: !1
        },
        initRecommend: function(r) {
            var t = this, a = {};
            r.cid && (this.cid = a.cid = r.cid), r.vid && (this.vid = a.vid = r.vid), r.lid && (this.lid = a.lid = r.lid), 
            a.scence = 2, a.modId = 100007, e.vaccess("detail_reco_module", a).then(function(e) {
                if (console.log("recommend", e), 0 != e.errCode) throw new Error("fetch recommend error");
                var a = e.data;
                t._recommendReportObj = {
                    key: a.reportKey,
                    params: a.reportParams
                }, t.dataMapModel = o(a.dataKey, a.mainData, {
                    cid: r.cid,
                    vid: r.vid,
                    lid: r.lid,
                    dataType: "detail_personal"
                }), t.dataMapModel.onChange(function(e) {
                    console.log("datamodel recommend updated", e.coverList), t.data.recommend.list = e.coverList, 
                    t.data.recommend.title = a.title.title, t.setData({
                        recommend: t.data.recommend
                    });
                });
            }).catch(function(e) {
                console.log("recommend error", e.stack);
            });
        },
        recommendLayer: function() {
            var e = this;
            if (this.setData({
                recommendShowLayer: !this.data.recommendShowLayer,
                layerScrollTop: this.data.recommendShowLayer ? 1 : 0,
                layerShadow: !1
            }), this.data.recommend && this.data.recommend.list && this._recommendReportObj) {
                var o = this._recommendReportObj;
                this.data.recommend.list.slice(0, 3).forEach(function(t) {
                    r.reportParams.call(e, "show", "cid=" + t.cid + "&" + o.params, o.key);
                });
            }
        },
        recommendOnScrollBottom: function() {
            this.dataMapModel.nextPage();
        }
    };
};