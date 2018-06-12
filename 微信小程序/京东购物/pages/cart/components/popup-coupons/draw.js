function e() {
    var e = {
        source: f.WE_CHAT
    };
    return u.get({
        url: "https://wq.jd.com/pinbind/QueryPinStatus",
        data: e
    }).then(function(e) {
        var r = e.body;
        return 0 == r.errcode ? Promise.resolve(r) : Promise.reject(new Error("code:" + r.errcode + "，message:" + r.errmsg));
    }, function(e) {
        return Promise.reject(e);
    });
}

function r() {
    var e = getCurrentPages().slice(0).pop(), r = e.route || e.__route__ || "";
    return r ? "/" + r : r;
}

function n(e) {
    return e ? u.get({
        url: "https://wq.jd.com/pinbind/switchAccount",
        data: {
            expectPin: d.base64encode(encodeURIComponent(e)),
            fromtype: "x",
            sceneid: "521192167",
            atk: 9,
            rurl: r()
        }
    }).then(function(e) {
        var r = e.body;
        return 0 == r.retcode ? Promise.resolve(r) : Promise.reject(r);
    }, function(e) {
        return Promise.reject(e);
    }) : Promise.reject(new Error("没有找到有效的账号"));
}

function t(e, r, n) {
    return n ? new Promise(function(n, t) {
        s.getcoupon(e, r, function(e, r) {
            return e ? t(e) : n(r);
        }, {
            sceneid: 3
        });
    }) : Promise.resolve();
}

function o(e) {
    return new Promise(function(n, t) {
        switch (+e) {
          case 34:
            var o = r();
            u.get({
                url: "https://wq.jd.com/vipplus/LoginBrigdeAuthName",
                data: {
                    scene: "weixin",
                    bussinessType: 531,
                    rurl: o
                }
            }).then(function(r) {
                var o = r.body;
                return 0 == o.retcode ? (l.goto("/pages/h5/index", {
                    url: o.redirect
                }), n({
                    success: !1,
                    code: e
                })) : t(new Error(o.msg + "(" + o.retcode + ")"));
            }, function(e) {
                return t(e);
            });
            break;

          case 147:
            return m.show({
                icon: m.ICON.WARNING,
                content: "优惠券已抢光啦，下次早点来哟~"
            }), n({
                success: !1,
                code: e
            });

          case 14:
          case 15:
            return m.show({
                icon: m.ICON.SUCCESS,
                content: "您今天已经参加过此活动，别太贪心哟，明天再来~"
            }), n({
                success: !0,
                code: e
            });

          case 999:
            return m.show({
                icon: m.ICON.SUCCESS,
                content: "领券成功，可到个人中心-我的优惠券查看。"
            }), n({
                success: !0,
                code: e
            });

          default:
            return n({
                success: !1,
                code: e
            });
        }
    });
}

function c(c, s) {
    var u = this;
    return e().then(function(e) {
        return h.NEED_UPDATE_PROFILE == e.state || h.NO_ASSET_HAS_ACCOUNT == e.state ? (a.alert({
            icon: a.ICONS.INFO,
            title: "您正在领取京东优惠券，请先登录正式京东账号",
            buttons: [ {
                text: "去登录",
                handler: function() {
                    var e = {
                        sceneid: "531",
                        rurl: r()
                    };
                    u.$goto("/pages/my_pages/account/account", e), a.hide();
                }
            } ]
        }), Promise.resolve(!1)) : h.SWITHCHABLE == e.state && 1 == e.defaultFlag ? (a.confirm({
            scope: u,
            title: "您需要切换为正式京东账号才能领取优惠券",
            buttons: [ {
                text: "立即切换",
                handler: function() {
                    a.hide();
                    var r = e.pinList.find(function(e) {
                        return "0" == e.defaultFlag;
                    }), d = r ? r.pin : "";
                    n.call(u, d).then(function(e) {
                        t(c, s, !0).then(o).catch(function(e) {
                            i.error(e), m.show({
                                icon: m.ICON.WARNING,
                                content: "活动太火爆了，请稍后重试"
                            });
                        });
                    }).catch(function(e) {
                        i.error(e), m.show({
                            icon: m.ICON.WARNING,
                            content: "切换失败，请稍后重试(" + (e.retcode || "") + ")"
                        });
                    });
                }
            } ]
        }), Promise.resolve(!1)) : Promise.resolve(!0);
    }, function(e) {
        return Promise.reject(e);
    });
}

require("../../../component.js");

var s = require("../../../../models/coupon/coupon_model.js"), u = require("../../../../common/request/request"), i = new (require("../../../../common/logger.js"))("购物车-优惠券抽奖组件"), a = require("../../../components/message-box/index"), d = require("../../../../common/base64/base64"), m = require("../../../../common/toast/toast"), l = require("../../../../common/navigator"), f = {
    WE_CHAT: 2
}, h = {
    NEED_UPDATE_PROFILE: 1,
    NO_ASSET_HAS_ACCOUNT: 2,
    SWITHCHABLE: 3,
    UNBINED: 4
};

module.exports = {
    draw: function(e) {
        var r = e.key, n = e.roleId;
        return c(r, n).then(t.bind(this, r, n)).then(o);
    }
};