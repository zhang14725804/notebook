function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, r = e(require("./common/pdd_app")), a = e(require("./storage/ram_manager")), n = require("./common/index"), i = e(require("./common/request")), o = e(require("./configs/api")), s = e(require("./libs/co/we-index")), u = (e(require("./libs/es6-promise.min")), 
e(require("./libs/regenerator-runtime/runtime"))), c = e(require("./storage/user_storage")), d = e(require("./common/navigation")), f = e(require("./controller/config_controller")), l = require("./common/message");

(0, r.default)({
    startTime: 0,
    isShow: !1,
    onLaunch: function() {
        c.default.getAccessToken() && (a.default.pddUserType = "0"), a.default.sessionId = n.DataUtil.getRandomString(), 
        this.startTime = new Date().getTime(), (0, n.TrackingRecord)({
            op: "event",
            sub_op: "app_start"
        });
    },
    onShow: function(e) {
        a.default.groupSignInNoGid = !1;
        var r = void 0, c = void 0, p = !1;
        if (e && e.path && (r = e.query, c = e.path, "string" == typeof r && r.match(/\{([\s\S]+)\}/) ? r = (r = (r = (r = r.match(/\{([\s\S]+)\}/)[1]).split(",")).join("&")).replace(/ /g, "") : "object" === (void 0 === r ? "undefined" : t(r)) && Object.keys(r).length > 0 && (p = r.ignore_scene, 
        r.rp_share_test && (a.default.rpShareTest = r.rp_share_test.toString()), r.source_id && (a.default.sourceId = r.source_id.toString()))), 
        e && 1022 == e.scene ? a.default.isFromAppOnShow = !1 : a.default.isFromAppOnShow = !0, 
        a.default.sceneIdActivity = e && e.scene, a.default.carrySceneId = !p, a.default.referPageName = null, 
        a.default.referPageId = null, e && e.reLaunch && (a.default.carrySceneId = !0, a.default.carryReferShare = !0), 
        this.isShow && !a.default.isFromShare && (0, n.TrackingRecord)({
            op: "event",
            sub_op: "app_resume"
        }), a.default.isFromShare = !1, this.isShow = !0, e && e.shareTicket && 1044 == e.scene) {
            a.default.isWaitingOpenGid = !0;
            var g = function(e) {
                a.default.isWaitingOpenGid = !1, !!e && (a.default.requestGid = e.open_gid), a.default.CPPage && a.default.CPPage.__route__ && a.default.CPPage.imprTracking && a.default.CPPage.imprTracking();
            };
            wx.login({
                success: function(t) {
                    wx.getShareInfo && wx.getShareInfo({
                        shareTicket: e.shareTicket,
                        success: function(e) {
                            var r = {
                                code: t.code,
                                iv: e.iv,
                                encrypted_data: e.encryptedData
                            };
                            (0, s.default)(u.default.mark(function e() {
                                var t;
                                return u.default.wrap(function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                      case 0:
                                        return e.prev = 0, e.next = 3, i.default.apiRequest("POST", o.default.getOpenGid, r, !1);

                                      case 3:
                                        (t = e.sent) && t.open_gid && (a.default.requestGid = t.open_gid), l.Message.emit(l.KEYS.GROUP_SIGN_IN_FROM_SHARE_CARD, t.open_gid), 
                                        l.Message.emit(l.KEYS.RED_ENVELOPE_HELP_FROM_SHARE_CARD, t.open_gid), g(t), e.next = 14;
                                        break;

                                      case 10:
                                        e.prev = 10, e.t0 = e.catch(0), g(), console.error(e.t0);

                                      case 14:
                                      case "end":
                                        return e.stop();
                                    }
                                }, e, this, [ [ 0, 10 ] ]);
                            }));
                        },
                        fail: function() {
                            a.default.sceneIdActivity = 1011, g();
                        }
                    });
                },
                fail: function() {
                    g();
                }
            });
        } else a.default.groupSignInNoGid = !0;
        e && e.reLaunch && 1043 == e.scene && (!c || c.indexOf("index") > 0) && (0, s.default)(u.default.mark(function e() {
            var t;
            return u.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, f.default.getConfig("index_pay_forward");

                  case 2:
                    (t = e.sent) && d.default.forward("/package_a/relative_recommend/relative_recommend?subjects_id=55&is_push=1");

                  case 4:
                  case "end":
                    return e.stop();
                }
            }, e, this);
        })), this.startTime = new Date().getTime();
    },
    onHide: function() {
        if (!a.default.isFromShare) {
            var e = new Date().getTime() - this.startTime;
            (0, n.TrackingRecord)({
                op: "event",
                sub_op: "app_pause",
                xcx_duration: parseInt(e)
            });
        }
    }
});