function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../storage/ram_manager")), r = e(require("../common/request")), a = e(require("../configs/api")), s = e(require("../libs/co/we-index")), u = (e(require("../libs/es6-promise.min")), 
e(require("../libs/regenerator-runtime/runtime"))), n = e(require("../common/data_util"));

exports.default = {
    updateLikeGoodsIds: s.default.wrap(u.default.mark(function e() {
        var s, n;
        return u.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, r.default.apiRequest("GET", a.default.likeGoodsIdsList);

              case 3:
                return s = e.sent, (n = s.goods_id_list || []).forEach(function(e) {
                    t.default.likeGoodsIds[e] = !0;
                }), t.default.favoriteUpdateTime = s.favorite_goods_update_time || 0, e.abrupt("return");

              case 10:
                e.prev = 10, e.t0 = e.catch(0), console.error(e.t0);

              case 13:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 10 ] ]);
    })),
    updateLikeMallsIds: s.default.wrap(u.default.mark(function e() {
        var s, n;
        return u.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, r.default.apiRequest("GET", a.default.likeMallsIdsList);

              case 3:
                return s = e.sent, (n = s.mall_id_list || []).forEach(function(e) {
                    t.default.likeMallsIds[e] = !0;
                }), t.default.favoriteMallUpdateTime = s.favorite_mall_update_time || 0, e.abrupt("return");

              case 10:
                e.prev = 10, e.t0 = e.catch(0), console.error(e.t0);

              case 13:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 10 ] ]);
    })),
    updateSpikeRemindGoodsIds: s.default.wrap(u.default.mark(function e() {
        var s;
        return u.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return t.default.isSpikeRemindGoodsIdsUpdate = !0, e.prev = 1, e.next = 4, r.default.apiRequest("POST", a.default.getTemplateRimendGoodsId, {
                    scene: 1
                }, !1, {
                    forceUseApiGZ: !0,
                    needGZToken: !0
                });

              case 4:
                return s = e.sent, t.default.spikeRemindGoodsIds = s.data || [], e.abrupt("return");

              case 9:
                e.prev = 9, e.t0 = e.catch(1), console.error(e.t0);

              case 12:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 1, 9 ] ]);
    })),
    updateLikeGoodsMallsIds: function() {
        this.updateLikeGoodsIds(), this.updateLikeMallsIds(), t.default.isFirstFavoritUpdate = !0;
    },
    getOMSConfig: s.default.wrap(u.default.mark(function e(t) {
        var s, i;
        return u.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (e.prev = 0, !t) {
                    e.next = 9;
                    break;
                }
                return s = n.default.formatByPos(a.default.getOMSConfig, t), e.next = 5, r.default.apiRequest("GET", s, null, !0, {
                    forceUseApiGZ: !0
                });

              case 5:
                return i = e.sent, e.abrupt("return", i);

              case 9:
                return e.abrupt("return", !1);

              case 10:
                e.next = 16;
                break;

              case 12:
                return e.prev = 12, e.t0 = e.catch(0), console.error(e.t0), e.abrupt("return", !1);

              case 16:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 12 ] ]);
    }))
};