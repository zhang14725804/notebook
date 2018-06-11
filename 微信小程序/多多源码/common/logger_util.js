function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = e(require("./data_util")), r = e(require("../storage/user_storage")), t = e(require("../configs/app_config")), n = e(require("./object_util")), i = require("../constants/tracking/keys"), d = e(require("../constants/tracking/refer")), f = e(require("../constants/tracking/coupon_msg")), u = e(require("./system_info")), s = e(require("./page_util")), l = e(require("./visitor_logger")), g = e(require("../storage/ram_manager")), o = u.default.getSystemInfoSync(), c = {
    windowWidth: o.windowWidth,
    windowHeight: o.windowHeight,
    statusBarHeight: o.statusBarHeight || "",
    fontSizeSetting: o.fontSizeSetting || "",
    language: o.language,
    wxVersion: o.version,
    system: o.system,
    screen_width: o.screenWidth || o.windowWidth,
    screen_height: o.screenHeight || o.windowHeight,
    dpr: o.pixelRatio,
    app_version: t.default.version,
    app: "pdd",
    page: "",
    platform: "wxapp",
    manufacture: o.brand,
    model: o.model,
    sdk_version: o.SDKVersion
}, _ = {
    convertNetwork: function(e) {
        return "wifi" == e ? 1 : "2g" == e ? 2 : "3g" == e ? 3 : "4g" == e ? 4 : 0;
    },
    getData: function(e) {
        var a = s.default.getCurPage().__route__ || "";
        c.page_url = a;
        var t = a.split("/");
        t.length > 0 && (c.page = t[t.length - 1]);
        var i = r.default.getUserLocalInfo();
        return i && (c.gender = i.gender || "0", c.province = i.province || "0", c.city = i.city || "0"), 
        c.network = this.convertNetwork(g.default.networkType), e.user_id = r.default.getUserId() || "", 
        e.withoutCompleteOpts ? (delete e.withoutCompleteOpts, n.default.assign({}, c, e)) : n.default.assign({}, c, this.completeOpts(e));
    },
    completeOpts: function(e) {
        var u = s.default.getCurPageQueryObj();
        e.page && -1 === e.page.indexOf(c.page) && -1 === c.page.indexOf(e.page) && (e.page = c.page + "." + e.page), 
        e.log_id = e.log_id || a.default.getLogId(), e.token = e.token || r.default.getAccessToken() || "", 
        e.app_id = e.app_id || t.default.appId || "", e.time = e.time || e.log_id.substring(0, 13);
        var o = g.default.timeDiff;
        e.time = parseInt(e.time) + o + "", g.default.elSnArray.length > 0 && (e._x_zyw = g.default.elSnArray.join("_")), 
        g.default.serviceNoticeSid && (e._x_sid = g.default.serviceNoticeSid), g.default.serviceNoticeSrc && (e._x_src = g.default.serviceNoticeSrc), 
        e.xcx_x_scene = g.default.sceneId, e.page_name = e.page_name ? e.page_name : s.default.getCurPageName(), 
        e.page_id = g.default.CPPage.pageId || "", g.default.w_entrance && (e.w_entrance = 1);
        var _ = s.default.getKeyParams();
        for (var p in _) e[p] || (e[p] = _[p]);
        g.default.CPPage.$referPageName && (e.refer_page_name = g.default.CPPage.$referPageName, 
        e.refer_page_id = g.default.CPPage.$referPageId), !e.page_sn && g.default.CPPage.pageSn && (e.page_sn = g.default.CPPage.pageSn), 
        g.default.referPageSn && (e.refer_page_sn = g.default.referPageSn), g.default.pddUserType && (e.pdd_user_type = g.default.pddUserType), 
        g.default.rpTest && (e.gs_test = g.default.rpTest), 1019 === g.default.sceneId && (e.xcx_x_class = g.default.walletEntracne), 
        g.default.lotteyTest && (e.lottery_test = g.default.lotteyTest), g.default.rpShareTest && (e.refer_rp_share_test = g.default.rpShareTest), 
        [ "pv", "click" ].indexOf(e.op) >= 0 && i.TrackingChannels.forEach(function(a) {
            var r = "refer_channel_" + a, t = e[r] || u[a];
            t && "null" !== t && (e[r] = t);
        });
        var v = l.default.getVisitorLocalInfo();
        if (v && (e.xcx_trace_id = v.xcxTraceId, e.pdd_trace_id = v.pddTraceId), e.session_id = g.default.sessionId, 
        "pv" === e.op) {
            if (function() {
                var e = !1;
                for (var a in i.ReferShareKeys) {
                    var r = i.ReferShareKeys[a];
                    if ((u[r] || u[r.slice(6)]) && g.default.carryReferShare) {
                        e = !0;
                        break;
                    }
                }
                return e;
            }() && (i.ReferShareKeys.forEach(function(a) {
                var r = u[a] || u[a.slice(6)];
                e[a] = r;
            }), g.default.carryReferShare = !1), u[f.default.QueryKey] === f.default.QueryValue) {
                var h = f.default.EventValueByPageName[e.page_name];
                h && (e.event = h);
            }
            g.default.carrySceneId ? (e.scene_id = g.default.sceneId, g.default.carrySceneId = !1) : e.scene_id = null, 
            e.event = "page_show", "1" === u.is_back && (e.is_back = "1");
        }
        for (var y in d.default.PV) e["refer_" + y] = d.default.PV[y];
        var m = {}, P = s.default.getCurPageQueryObj() || {};
        if (s.default.getCurPage().$carryRefer) {
            var w = this.getPageRefer() || {};
            e = n.default.assign(e, w);
            for (var x in P) if (x && P.hasOwnProperty(x)) if (x.indexOf("_ex_") >= 0) {
                var S = x.replace("_ex_", "refer_");
                e[S] = P[x];
            } else 0 !== x.indexOf("refer_") && P[x] && "null" !== P[x] && (e["refer_" + x] = P[x], 
            x.indexOf("xcx_campaign_id") >= 0 && (m[x] = P[x]));
        }
        return n.default.assign(d.default.PV, m), e.refer_channel_msgid = e.refer_channel_msgid || u.msgid, 
        g.default.sourceId && (e.refer_source_id = g.default.sourceId), e;
    },
    getPageRefer: function() {
        var e = {}, a = s.default.getCurPageQueryObj();
        if (a) for (var r in a) a.hasOwnProperty(r) && 0 === r.indexOf("refer_") && null != a[r] && (e[r] = a[r]);
        return e;
    }
};

exports.default = _;