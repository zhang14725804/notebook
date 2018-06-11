function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    c.default.sceneId = e && e.scene, i.default.addMsgObserver(), u.default.doStartupJobs(), 
    x.default.wxForceUpdate(), wx.getNetworkType({
        success: function(e) {
            c.default.networkType = e.networkType;
        }
    }), wx.onNetworkStatusChange && wx.onNetworkStatusChange(function(e) {
        c.default.networkType = e.networkType;
    });
    var t = e && e.path;
    t && (c.default.currentLandPagePath = t), "1019" == c.default.sceneId && (0, f.default)(p.default.mark(function e() {
        var t, a;
        return p.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, g.default.getConfig("popup_w_entrance");

              case 2:
                if (t = e.sent, a = void 0, t && t.length > 0) {
                    e.next = 6;
                    break;
                }
                return e.abrupt("return");

              case 6:
                if (c.default.w_entrance = t, "w_index" != t[0].activity) {
                    e.next = 9;
                    break;
                }
                return e.abrupt("return");

              case 9:
                a = t[0].route, wx.reLaunch({
                    url: a
                });

              case 11:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), v(), u.default.fetchUserType(), _.default.connectToSocket(), m.default.updateSpikeRemindGoodsIds(), 
    m.default.updateLikeGoodsMallsIds(), h();
}

function a(e) {
    c.default.sceneId = e && e.scene, c.default.isFirstFavoritUpdate = !1;
    var t = e && e.path, a = e && e.query;
    t && (c.default.currentLandPagePath = e.path), c.default.referPageName = "", c.default.CPPage.$referPageName = "", 
    c.default.referPageSn = null, a && a._x_sid && (c.default.serviceNoticeSid = a._x_sid), 
    a && a._x_src && (c.default.serviceNoticeSrc = a._x_src), w.default.canOpenTargetPath(t) ? w.default.tryOpenInWebview(e) : w.default.resolveTargetPath(t, a), 
    i.default.triggerSendMutiLog();
}

function r() {
    i.default.triggerSendMutiLog(), c.default.referPageName = "", c.default.CPPage.$referPageName = "", 
    c.default.referPageSn = null;
}

function n() {}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = e(require("./util")), u = e(require("./user")), d = e(require("./request")), i = e(require("./logger")), c = e(require("../storage/ram_manager")), s = e(require("../configs/api")), l = e(require("./visitor_logger")), f = e(require("../libs/co/we-index")), p = e(require("../libs/regenerator-runtime/runtime")), g = e(require("../controller/config_controller")), x = e(require("../controller/user_controller")), _ = e(require("./request_socket")), m = e(require("../controller/public")), w = e(require("./version_util")), h = f.default.wrap(p.default.mark(function e() {
    return p.default.wrap(function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return e.prev = 0, e.next = 3, x.default.queryWxOpenId();

          case 3:
            e.next = 8;
            break;

          case 5:
            e.prev = 5, e.t0 = e.catch(0), console.error(e.t0);

          case 8:
          case "end":
            return e.stop();
        }
    }, e, this, [ [ 0, 5 ] ]);
})), v = f.default.wrap(p.default.mark(function e() {
    var t, a, r, n, o;
    return p.default.wrap(function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return e.prev = 0, t = l.default.getVisitorLocalInfo(), a = t.xcxTraceId, c.default.monitorUrl = "https://wxapp.yangkeduo.com/p.gif", 
            e.next = 6, d.default.apiRequest("GET", s.default.getConfigStartup, {
                xcx_trace_id: a
            }, !0, {
                forceUseApiGZ: !0
            });

          case 6:
            (r = e.sent) && r.success && r.data && (r.server_time && (n = 1e3 * r.server_time - Date.now(), 
            c.default.timeDiff = n), r.data && r.data.report_url && (c.default.logginURL = r.data.report_url), 
            r.data && r.data.analysis_url && (c.default.monitorUrl = r.data.analysis_url), r.data && r.data.pdd_trace_id && !t.pddTraceId && (t.pddTraceId = r.data.pdd_trace_id, 
            l.default.setVisitorInfo(t)), c.default.configStartup = r.data, o = r.data.analysis_block_level || 0, 
            c.default.blockLevel = parseInt(o), wx.setTabBarItem && Date.now() + c.default.timeDiff >= 15283872e5 && Date.now() + c.default.timeDiff <= 1529337599e3 ? (wx.setTabBarItem({
                index: 0,
                text: "首页",
                selectedIconPath: "/image/618_promotion/20180618_index.png"
            }), wx.setTabBarItem({
                index: 1,
                text: "新品",
                selectedIconPath: "/image/618_promotion/20180618_recommend.png"
            }), wx.setTabBarItem({
                index: 2,
                text: "搜索",
                selectedIconPath: "/image/618_promotion/20180618_classification.png"
            }), wx.setTabBarItem({
                index: 3,
                text: "聊天",
                selectedIconPath: "/image/618_promotion/20180618_custom_service_list.png"
            }), wx.setTabBarItem({
                index: 4,
                text: "个人中心",
                selectedIconPath: "/image/618_promotion/20180618_personal.png"
            })) : (0, f.default)(p.default.mark(function e() {
                var t;
                return p.default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.prev = 0, e.next = 3, g.default.getConfig("new_to_rec");

                      case 3:
                        (t = e.sent) ? wx.setTabBarItem && wx.setTabBarItem({
                            index: 1,
                            iconPath: "/image/recommend.png",
                            selectedIconPath: "/image/recommend_selected.png",
                            text: "推荐"
                        }) : wx.setTabBarItem && wx.setTabBarItem({
                            index: 1,
                            text: "新品",
                            iconPath: "/image/new_arrivals.png",
                            selectedIconPath: "/image/new_arrivals_selected.png"
                        }), e.next = 10;
                        break;

                      case 7:
                        e.prev = 7, e.t0 = e.catch(0), console.log(e.t0);

                      case 10:
                      case "end":
                        return e.stop();
                    }
                }, e, this, [ [ 0, 7 ] ]);
            }))), e.next = 13;
            break;

          case 10:
            e.prev = 10, e.t0 = e.catch(0), console.error(e.t0);

          case 13:
          case "end":
            return e.stop();
        }
    }, e, this, [ [ 0, 10 ] ]);
}));

exports.default = function(e) {
    e.onLaunch = e.onLaunch ? o.default.wrapFunc(e.onLaunch, t) : t, e.onShow = e.onShow ? o.default.wrapFunc(e.onShow, a) : a, 
    e.onError = e.onError ? o.default.wrapFunc(e.onError, n) : n, e.onHide = e.onHide ? o.default.wrapFunc(e.onHide, r) : r, 
    App(e);
};