function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = e(require("../common/request")), t = e(require("../common/visitor_logger")), a = e(require("../storage/ram_manager")), u = e(require("../configs/api")), n = e(require("../libs/co/we-index")), i = e(require("../libs/regenerator-runtime/runtime")), s = {
    getConfig: n.default.wrap(i.default.mark(function e(n) {
        var c, f, d, o, l;
        return i.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (e.prev = 0, !a.default.configStartup || void 0 === a.default.configStartup[n]) {
                    e.next = 6;
                    break;
                }
                return c = a.default.configStartup[n], e.abrupt("return", s.filterSceneIds(c));

              case 6:
                return f = u.default.getConfigStartupWithKey, d = t.default.getVisitorLocalInfo(), 
                o = d.xcxTraceId, e.next = 11, r.default.apiRequest("GET", f, {
                    key: n,
                    xcx_trace_id: o
                }, !0, {
                    forceUseApiGZ: !0
                });

              case 11:
                if (!((l = e.sent) && l.success && l.data)) {
                    e.next = 17;
                    break;
                }
                return a.default.configStartup[n] = l.data, e.abrupt("return", s.filterSceneIds(l.data));

              case 17:
                return e.abrupt("return", !1);

              case 18:
                e.next = 23;
                break;

              case 20:
                return e.prev = 20, e.t0 = e.catch(0), e.abrupt("return", !1);

              case 23:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 20 ] ]);
    })),
    filterSceneIds: function(e) {
        if (Array.isArray(e)) {
            for (var r = [], t = 0; t < e.length; t++) {
                var u = e[t];
                (!u.hidden_scene_ids || u.hidden_scene_ids.indexOf(a.default.sceneId + "") < 0) && r.push(u);
            }
            return r;
        }
        return e;
    }
};

exports.default = s;