function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e() {
    n.default.show({
        content: "活动太火爆，请稍后再试",
        btns: [ {
            name: "确定",
            color: "#e93b3d"
        } ]
    });
}

var n = t(require("modal/modal")), a = t(require("../../../api/Ptag/Ptag_utils.js")), s = require("./userData.js"), o = (require("couponData.js"), 
require("../../../libs/promise.min")), u = getApp(), i = {
    showMask: !1,
    title: "优惠券使用规则",
    tip: [ "1. 京东发放的商品优惠券（如京券、东券等）仅能在京东提交订单时抵减应支付商品金额（不能抵减运费），不能进行兑现或其他用途；预售尾款现目前仅支持使用东券，含全品类东券、限品类东券、店铺东券；运费劵仅可用于抵减京东自营商品订单运费；", "2. 使用全品类东券、限品类东券、店铺东券提交的订单，若订单未拆分，则订单取消后，系统自动返还相应的东券；若订单被拆分，取消全部子单，东券返还；", "3. 使用全品类京券、限品类京券、店铺京券提交的订单，若订单未拆分，则订单取消后，系统自动返还相应的京券；若订单被拆分，取消全部子单，系统自动返还限品类京券与店铺类京券，全品类京券则由系统判断，返还等值京豆；", "4. 使用全品类京券、限品类京券的订单，若发生售后退货，系统将按商品售价所占订单金额比例拆分各支付金额，已使用优惠券可能化整为零，以京豆形式等同返还；限店铺京券若发生售后退货时，不予返还；", "5. 使用全品类东券的订单，若发生售后退货：", "5.1在订单不拆单的情况下， 当订单中全部商品均退货时，在所有商品退款完成后系统会自动返还相应的东劵；当订单中部分商品退货时，东券不予返还；", "5.2在订单拆单的情况下，某一子订单或全部子订单商品发生退货时，东券不予返还。", "6. 使用限品类东劵、限店铺东券的订单，若发生售后退货时，东券不予返还。", "7. 使用平台专享全品类京券提交的订单，若订单未拆分，则订单取消后，系统自动返还相应的平台专享全品类京券；若订单被拆分，取消全部子单，系统自动返还相应的平台专享全品类京券；", "8. 使用平台专享全品类京券的订单，若发生售后退货时，不予返还；", "9. 使用运费券后，若售前用户正常取消未拆分订单，取消成功后，原券返回用户账户；拆分订单情况下，子单全部取消，则返回运费券；若因京东原因造成父单下所有子单拒收，则返回运费券；需退货的，不返回运费劵。", "10. 全球购商品只支持使用全球购店铺东券，其它优惠券暂不支持", "11. 经销商不可以使用任何一类东券下单，否则京东有权取消订单；", "12. 京东发放所有优惠券严禁出售，如经发现并证实的，该券将予以作废处理；", "13. 本规则由京东依据国家相关法律法规及规章制度予以解释。" ],
    btns: [ {
        name: "确定",
        color: "#e93b3d",
        cb: function() {
            this.setData({
                maskToggle: !1
            });
        }
    } ]
}, c = {
    title: "赠送转让规则",
    tip: [ "1.1、谁可以赠送优惠券？", "目前此功能在公测阶段，仅有部分幸运用户可以参与，转赠人在赠送优惠券前需要通过绑定正式京东账号并开通实名认证，好友是否可以领取优惠券以好友领取时的系统提示为准。", "您可在【我的京东-账号管理】中绑定正式京东账号并进行实名认证。", "　", "1.2、我要怎么赠送优惠券？", "您可以在优惠券列表或详情页点击“赠送好友”按钮，发起赠送功能。当您确认这张优惠券要赠送给您的好友时，这张优惠券会被置于赠送中状态，赠送中状态的优惠券不可被使用，赠送中的优惠券在赠送转让列表中展示，在您的好友领取之前，您可以选择撤回赠送或赠送给其他好友。", "当您的优惠券被好友接受领取，这张优惠券会置于已赠送状态，已赠送的优惠券不可被您使用，且不可被您撤回，已赠送的优惠券在赠送转让列表中展示。", "当您选择将优惠券转赠，但是您的好友在24小时内未领取，优惠券会自动退回您的账户且您可继续使用。优惠券将在待使用列表中展示；如果24小时内优惠券过期且好友未领取，则此优惠券会自动退回您的账户，在已过期列表中展示，不可使用。", "　", "1.3、哪些券可以赠送？", "优惠券列表中有“可赠送”标签的优惠券才可赠送给朋友，具体内容以我的优惠券券面展示标记为准。", "　", "2、优惠券转让规则", "微信京东购物和手机QQ京东购物的优惠券转让功能即将上线，敬请期待" ],
    btns: [ {
        name: "确定",
        color: "#e93b3d"
    } ]
}, r = [ "朋友，我熬夜抢的京东优惠券，送给你啦！", "朋友，给你奉上我的京东好券，不要错过哦！" ];

module.exports = {
    COUPON_ROLE: i,
    TRANFER_ROLE: c,
    SHARE_TEXT: r,
    queryBindStatus: function() {
        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", a = this.data.bindStatus;
        return new o(function(o, u) {
            a ? o(a) : s.queryBindStatus(e).then(function(e) {
                t.setData({
                    bindStatus: e
                }), o(e);
            }).catch(function(t) {
                console.log("-------------------------------------------------------------------------"), 
                console.log("请求用户账户信息出错"), console.log(t), n.default.show({
                    content: t || "请求用户账户信息出错，请重试",
                    btns: [ {
                        name: "重试",
                        color: "#e93b3d",
                        cb: function() {
                            this.queryBindStatus(e);
                        }
                    }, {
                        name: "取消"
                    } ]
                });
            });
        });
    },
    verifyAuthUser: function() {
        var t = this, e = this.data.realNameInfo;
        return new o(function(a, o) {
            e ? a(e) : s.verifyAuthUser().then(function(e) {
                t.setData({
                    realNameInfo: e
                }), a(e);
            }).catch(function(t) {
                n.default.show({
                    content: t || "实名认证查询出错，请重试",
                    btns: [ {
                        name: "重试",
                        color: "#e93b3d",
                        cb: function() {
                            this.verifyAuthUser();
                        }
                    }, {
                        name: "取消"
                    } ]
                });
            });
        });
    },
    judgeShareBtnStatus: function(t, e) {
        var n = {};
        1 == t.state || 2 == t.state ? (n.state = t.state, n.status = 2) : 3 == t.state ? (n.state = t.state, 
        n.status = 2) : 0 == t.state && 1 == e.status ? (n.state = 0, n.status = 1) : (n.state = 4, 
        n.status = 2), this.setData({
            shareBtnInfo: n
        });
    },
    getRandomItem: function(t) {
        return t && t.length ? t[Math.ceil(Math.random() * t.length) - 1] : null;
    },
    judgeToSend: function(t, o) {
        var i = this;
        this.queryBindStatus(o).then(function(t) {
            0 == t.state ? i.verifyAuthUser().then(function(t) {
                0 == t.retcode && 1 == t.status ? e() : s.loginBrigdeAuthName().then(function(t) {
                    45 == t.retcode ? e() : (u.isCouponListNeedRefresh = !0, a.default.addPtag("7211.6.31"), 
                    n.default.show({
                        content: "您好，实名认证后即可赠送优惠券",
                        btns: [ {
                            name: "去实名",
                            color: "#e93b3d",
                            cb: function() {
                                a.default.addPtag("7211.6.32"), this.$goto("/pages/h5/index", {
                                    url: t.redirect
                                });
                            }
                        }, {
                            name: "取消"
                        } ]
                    }));
                }).catch(function(t) {
                    n.default.show({
                        icon: n.default.ICON_FAIL,
                        content: t
                    });
                });
            }) : 3 == t.state ? e() : (a.default.addPtag("7211.6.27"), n.default.show({
                content: "您好，补全账号信息并完成实名认证后，即可赠送优惠券",
                btns: [ {
                    name: "去补全账号信息",
                    color: "#e93b3d",
                    cb: function() {
                        a.default.addPtag("7211.6.28"), u.isCouponListNeedRefresh = !0, this.$goto("/pages/my_pages/account/account", {
                            sceneid: o || 521392392,
                            rurl: "/pages/my/coupon/coupon"
                        });
                    }
                }, {
                    name: "取消"
                } ]
            }));
        });
    }
};