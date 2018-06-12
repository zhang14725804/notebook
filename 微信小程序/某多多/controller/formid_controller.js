function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../common/request")), r = e(require("../configs/api")), n = e(require("../storage/ram_manager")), a = e(require("../common/user")), o = e(require("../common/object_util")), u = e(require("../libs/co/we-index")), s = (e(require("../libs/es6-promise.min")), 
e(require("../libs/regenerator-runtime/runtime"))), c = {
    upload: u.default.wrap(s.default.mark(function e(n, u, c) {
        var i, d, f;
        return s.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, i = a.default.getUserLocalInfo() || {}, d = i.openId, n = o.default.assign(n, {
                    open_id: d
                }), e.next = 5, t.default.apiRequest("POST", r.default.uploadTemplate, n, !1, {
                    needGZToken: !0,
                    forceUseApiGZ: !0
                });

              case 5:
                (f = e.sent).success ? "function" == typeof u && u(f) : "function" == typeof c && c(f), 
                e.next = 13;
                break;

              case 9:
                e.prev = 9, e.t0 = e.catch(0), "function" == typeof c && c(e.t0), console.error(e.t0);

              case 13:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 9 ] ]);
    })),
    cancel: u.default.wrap(s.default.mark(function e(n, a, o) {
        var u;
        return s.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, t.default.apiRequest("POST", r.default.goodsNoticeCancel, n, !1, {
                    needGZToken: !0,
                    forceUseApiGZ: !0
                });

              case 3:
                (u = e.sent).success ? "function" == typeof a && a(u) : "function" == typeof o && o(u), 
                e.next = 11;
                break;

              case 7:
                e.prev = 7, e.t0 = e.catch(0), "function" == typeof o && o(e.t0), console.error(e.t0);

              case 11:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 7 ] ]);
    })),
    uploadFormIdToSH: function(e, t) {
        if (a.default.hasAccessToken()) this.uploadFormIdToSHWithUserId(e, t); else {
            var r = n.default.openId;
            r && this.uploadFormIdToSHWithOpenId(r, e, !0);
        }
    },
    uploadFormIdToSHWithUserId: u.default.wrap(s.default.mark(function e(n, a) {
        var o;
        return s.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, t.default.apiRequest("POST", r.default.setFormId, {
                    form_id: n,
                    market: a
                });

              case 3:
                return o = e.sent, e.abrupt("return", o);

              case 7:
                e.prev = 7, e.t0 = e.catch(0), console.error(e.t0);

              case 10:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 7 ] ]);
    })),
    uploadFormIdToSHWithOpenId: u.default.wrap(s.default.mark(function e(n, a, o) {
        var u;
        return s.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, t.default.apiRequest("POST", r.default.setRefuseFormId, {
                    form_id: a,
                    open_id_string: n,
                    market: o
                }, !0);

              case 3:
                return u = e.sent, e.abrupt("return", u);

              case 7:
                e.prev = 7, e.t0 = e.catch(0), console.error(e.t0);

              case 10:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 7 ] ]);
    })),
    scene: {
        common: "0",
        spikeRemind: "1"
    }
};

exports.default = c;