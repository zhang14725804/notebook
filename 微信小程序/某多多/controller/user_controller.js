function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../common/request")), r = e(require("../storage/user_storage")), a = e(require("../configs/api")), n = e(require("../libs/co/we-index")), u = e(require("../libs/es6-promise.min")), i = e(require("../libs/regenerator-runtime/runtime")), o = e(require("../storage/ram_manager")), c = e(require("../configs/app_config")), d = e(require("../libs/md5.min")), s = e(require("../common/storage_util")), p = e(require("../constants/grade")), f = e(require("../common/logger")), l = e(require("../common/page_util"));

exports.default = {
    isQuerying: !1,
    callbackArray: [],
    reqUserAB: function() {
        var e = this;
        if (!this.hasReqUserAB) {
            this.hasReqUserAB = !0;
            var n = t.default.apiRequest("GET", a.default.userAB);
            return n.then(function(t) {
                e.hasReqUserAB = !1;
                var a = t.egrp;
                p.default.Result[a] || (a = 2), r.default.setEgrp(a);
            }, function() {
                e.hasReqUserAB = !1;
            }), n;
        }
        return null;
    },
    reqUserProvince: n.default.wrap(i.default.mark(function e(n) {
        var u, o;
        return i.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (e.prev = 0, !n.hasReqUserPro) {
                    e.next = 3;
                    break;
                }
                return e.abrupt("return");

              case 3:
                return n.hasReqUserPro = !0, e.next = 6, t.default.apiRequest("GET", a.default.getProvinceId);

              case 6:
                return (u = e.sent).province_id && (n.hasReqUserPro = !1, o = u.province_id, r.default.setProvinceId(o)), 
                e.abrupt("return", u.province_id);

              case 11:
                e.prev = 11, e.t0 = e.catch(0), n.hasReqUserPro = !1, console.error(e.t0);

              case 15:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 11 ] ]);
    })),
    queryWxOpenId: function() {
        function e(e) {
            r.callbackArray.length > 0 && (r.callbackArray.forEach(function(t) {
                t && t(e);
            }), r.callbackArray = []);
        }
        var r = this;
        if (r.isQuerying) {
            var n = void 0, i = void 0;
            return r.callbackArray.push(function(e) {
                "string" == typeof e && e ? n && n(e) : i && i("");
            }), new u.default(function(e, t) {
                n = e, i = t;
            });
        }
        return new u.default(function(n, u) {
            o.default.openId || (o.default.openId = s.default.getStorageSync("USER_OPENID_KEY")), 
            o.default.openId ? n(o.default.openId) : (r.isQuerying = !0, wx.login({
                complete: function(i) {
                    if (i && i.code) {
                        var p = c.default.appSecret + i.code, f = {
                            code: i.code,
                            app_key: "weapp",
                            sign: (0, d.default)(p)
                        };
                        t.default.apiRequest("POST", a.default.queryOpenId, f, !0).then(function(t) {
                            if (r.isQuerying = !1, t && t.open_id) {
                                var a = t.open_id;
                                s.default.setStorageSync("USER_OPENID_KEY", a), o.default.openId = a, e(a), n(a);
                            } else e(""), u("");
                        }, function() {
                            r.isQuerying = !1, e(""), u("");
                        });
                    } else r.isQuerying = !1, e(""), u("");
                }
            }));
        });
    },
    wxForceUpdate: function() {
        var e = s.default.getStorageSync("initUpdatePath");
        if (e) return s.default.removeStorage("initUpdatePath"), f.default.send({
            tracking_type: "front_end_tracking",
            event_type: "xcx_update",
            event_name: "xcx_version_force_update_reLaunchPath"
        }), void (wx.reLaunch && wx.reLaunch({
            url: e
        }));
        if (wx.getUpdateManager) {
            var r = wx.getUpdateManager();
            r.onCheckForUpdate(function(e) {
                try {
                    f.default.send({
                        tracking_type: "front_end_tracking",
                        event_type: "xcx_update",
                        event_name: "xcx_version_force_update_onCheckForUpdate",
                        res_type: e.hasUpdate
                    });
                } catch (e) {
                    console.error(e);
                }
            }), r.onUpdateFailed(function() {
                try {
                    f.default.send({
                        tracking_type: "front_end_tracking",
                        event_type: "xcx_update",
                        event_name: "xcx_version_force_update_onUpdateFailed"
                    });
                } catch (e) {
                    console.error(e);
                }
            }), r.onUpdateReady(function() {
                (0, n.default)(i.default.mark(function e() {
                    var n, u, o;
                    return i.default.wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            return e.prev = 0, n = a.default.wxForceUpdate, e.next = 4, t.default.apiRequest("GET", n, {}, !0, {
                                forceUseApiGZ: !0
                            });

                          case 4:
                            u = e.sent, o = void 0, f.default.send({
                                tracking_type: "front_end_tracking",
                                event_type: "xcx_update",
                                event_name: "xcx_version_force_update_onUpdateReady"
                            }), u.success && u.data && (o = l.default.getCurPageFullPath(), s.default.setStorageSync("initUpdatePath", o), 
                            f.default.send({
                                tracking_type: "front_end_tracking",
                                event_type: "xcx_update",
                                event_name: "xcx_version_force_update_applyUpdate"
                            }), r.applyUpdate()), e.next = 13;
                            break;

                          case 10:
                            e.prev = 10, e.t0 = e.catch(0), console.log(e.t0);

                          case 13:
                          case "end":
                            return e.stop();
                        }
                    }, e, this, [ [ 0, 10 ] ]);
                }));
            });
        }
    }
};