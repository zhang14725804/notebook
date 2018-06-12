function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var a = require("../../common/index"), t = e(require("../../configs/app_config")), r = e(require("../../common/url_util")), i = e(require("../../common/object_util")), o = e(require("../../storage/user_storage")), s = e(require("../../common/visitor_logger")), n = e(require("../../common/logger_util")), l = e(require("../../storage/ram_manager")), u = e(require("../../libs/co/we-index")), d = e(require("../../libs/regenerator-runtime/runtime")), c = e(require("../../controller/public")), p = {
    pageName: "",
    data: {},
    onLoad: function(e) {
        var t = this;
        e.useApiMobileDomain || "618" == e.activity ? this.loadPage(e) : a.User.requireLogin(function() {
            t.loadPage(e);
        });
    },
    loadPage: function(e) {
        var a = this;
        a.data.shareTitleArr = null;
        var p = e.page_name;
        this.pageName = p;
        var m = s.default.getVisitorLocalInfo() || {}, f = void 0;
        f = (f = (e = i.default.assign({}, e, {
            app_name: t.default.appName,
            app_version: t.default.version,
            token: o.default.getAccessToken() || "",
            uid: o.default.getUserId() || "",
            trace_id: m.xcxTraceId || "",
            network: n.default.convertNetwork(l.default.networkType),
            sceneid: l.default.sceneId,
            _x_sid: l.default.serviceNoticeSid,
            _x_src: l.default.serviceNoticeSrc,
            _x_zyw: l.default.elSnArray.join("_"),
            pdd_trace_id: m.pddTraceId || ""
        })).useApiMobileDomain ? t.default.apiMobileDomain + p : t.default.apiGZDomain + (l.default.H5UsePreRelease ? "hawaii_pre_release/" : "hawaii/") + p) + "?" + r.default.buildQuery(e), 
        "618" == e.activity && (this.data.activity = "618", f = "1" == e.type && e.id ? t.default.apiMobileDomain + "promotion.html?platform=wxapp&activity=618&" + r.default.buildQuery(e) : "2" == e.type && e.subject_id && "1" == e.isbranch ? t.default.apiMobileDomain + "promotion_subject.html?platform=wxapp&activity=618&" + r.default.buildQuery(e) : t.default.apiMobileDomain + "promotion.html?platform=wxapp&type=1&id=58&activity=618&" + r.default.buildQuery(e), 
        (0, u.default)(d.default.mark(function e() {
            return d.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, c.default.getOMSConfig("activity618");

                  case 2:
                    a.data.shareTitleArr = e.sent, a.data.shareTitleArr && 0 != a.data.shareTitleArr.length || (a.data.shareTitleArr = [ "[6.18狂欢]爆款限量1元抢！" ]);

                  case 4:
                  case "end":
                    return e.stop();
                }
            }, e, this);
        })));
        var _ = decodeURIComponent(f);
        this.setData({
            src: _
        });
    },
    onShareAppMessage: function(e) {
        var t = this, r = "", i = "/pages/web/web?" + e.webViewUrl.split("?")[1], o = t.data.shareTitleArr;
        "618" == this.data.activity && (i = i + "&activity=" + this.data.activity), /promotion_subject\.html/.test(e.webViewUrl) && (i += "&isbranch=1"), 
        "reward_user_comments" == this.pageName && (r = "哇，在拼多多1分钱就能拼到这么多好货"), o && o.length > 0 && (r = o[Math.floor(Math.random() * o.length)]);
        var s = a.DataUtil.getRandomString();
        return (0, a.TrackingRecord)({
            op: "event",
            sub_op: "share",
            page_name: t.pageName,
            event: "share_result",
            share_id: s,
            share_channel: "message",
            share_form: "card",
            refer_share_btn: "top_forward",
            share_url: e.webViewUrl,
            x_scene: l.default.sceneId
        }), l.default.isFromShare = !0, {
            title: r,
            path: i,
            success: function() {
                (0, a.TrackingRecord)({
                    op: "event",
                    sub_op: "share_result",
                    page_name: t.pageName,
                    event: "share_result",
                    share_id: s,
                    share_channel: "message",
                    share_result: "success",
                    share_form: "card",
                    refer_share_btn: "top_forward",
                    x_scene: l.default.sceneId
                });
            },
            fail: function() {}
        };
    }
};

(0, a.PddPage)(p, {
    pageName: "web",
    notUseCommonPV: !0
});