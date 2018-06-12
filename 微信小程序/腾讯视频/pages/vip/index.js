function i() {
    return new o(function(i, t) {
        i({
            price_list: [ {
                amount: "3",
                c_order: 12,
                icon_desc: "",
                original_price: "90",
                price: "58",
                price_desc: "",
                product_desc: "3个月",
                product_id: "1101",
                single_price: "15",
                type: "month",
                wx_offerid: "1450008867",
                qq_offerid: "1450013534"
            }, {
                amount: "6",
                c_order: 15,
                icon_desc: "",
                original_price: "180",
                price: "108",
                price_desc: "",
                product_desc: "6个月",
                product_id: "1103",
                single_price: "15",
                type: "month",
                wx_offerid: "1450008867",
                qq_offerid: "1450013534"
            }, {
                amount: "12",
                c_order: 18,
                icon_desc: "超值",
                original_price: "360",
                price: "198",
                price_desc: "",
                product_desc: "年费",
                product_id: "1102",
                single_price: "14",
                type: "month",
                wx_offerid: "1450008867",
                qq_offerid: "1450013534"
            }, {
                amount: "1",
                c_order: 19,
                icon_desc: "",
                original_price: "30",
                price: "20",
                price_desc: "",
                product_desc: "1个月",
                product_id: "1000",
                single_price: "20",
                type: "month",
                wx_offerid: "1450008867",
                qq_offerid: "1450013534"
            } ],
            result: {
                code: 0,
                msg: "OK"
            }
        });
    });
}

function t() {
    return new o(function(i, t) {
        i({
            costtime: 2213,
            privs: [ {
                hottag: "hlw_app_priv_dapian",
                pic: "https://i.gtimg.cn/qqlive/images/20160612/i1465697932_1.jpg",
                title: "院线新片",
                titleid: "80404"
            }, {
                hottag: "hlw_app_priv_meiju",
                pic: "https://i.gtimg.cn/qqlive/images/20160612/i1465697943_1.jpg",
                title: "独家美剧",
                titleid: "80405"
            }, {
                hottag: "hlw_app_priv_jilupian",
                pic: "https://i.gtimg.cn/qqlive/images/20160612/i1465697949_1.jpg",
                title: "全球纪录片",
                titleid: "80406"
            }, {
                hottag: "hlw_app_priv_quanju",
                pic: "https://i.gtimg.cn/qqlive/images/20160612/i1465697956_1.jpg",
                title: "热剧看全集",
                titleid: "80407"
            }, {
                hottag: "hlw_app_priv_quan",
                pic: "https://i.gtimg.cn/qqlive/images/20160612/i1465698003_1.jpg",
                title: "赠观影券",
                titleid: "80408"
            }, {
                hottag: "hlw_app_priv_guanggao",
                pic: "https://i.gtimg.cn/qqlive/images/20160612/i1465697986_1.jpg",
                title: "免广告",
                titleid: "80409"
            }, {
                hottag: "hlw_app_priv_gaoqing",
                pic: "https://i.gtimg.cn/qqlive/images/20160612/i1465697997_1.jpg",
                title: "1080P画质",
                titleid: "80410"
            }, {
                hottag: "hlw_app_priv_shenfen",
                pic: "https://i.gtimg.cn/qqlive/images/20160612/i1465698010_1.jpg",
                title: "尊贵身份",
                titleid: "80411"
            }, {
                hottag: "hlw_app_priv_zengpian",
                pic: "https://i.gtimg.cn/qqlive/images/20160612/i1465697966_1.jpg",
                title: "赠送影片",
                titleid: "80412"
            }, {
                hottag: "hlw_app_priv_live",
                pic: "https://i.gtimg.cn/qqlive/images/20160612/i1465698017_1.jpg",
                title: "演唱会道具",
                titleid: "80413"
            }, {
                hottag: "hlw_app_priv_livediscount",
                pic: "https://i.gtimg.cn/qqlive/images/20160612/i1465724368_1.jpg",
                title: "直播折扣",
                titleid: "80416"
            }, {
                hottag: "hlw_app_priv_download",
                pic: "https://i.gtimg.cn/qqlive/images/20160612/i1465697976_1.jpg",
                title: "极速缓存",
                titleid: "80414"
            }, {
                hottag: "hlw_app_priv_downandplay",
                pic: "https://i.gtimg.cn/qqlive/images/20160612/i1465698024_1.jpg",
                title: "边下边播",
                titleid: "80415"
            }, {
                hottag: "hlw_app_priv_game",
                pic: "https://i.gtimg.cn/qqlive/images/20160612/i1465698031_1.jpg",
                title: "游戏礼包",
                titleid: "80466"
            } ],
            returncode: 0,
            returnmsg: "ok"
        });
    });
}

function e() {
    return new o(function(i, t) {
        i({
            items: [ {
                cid: "i200hs4ip5a6u7a",
                pic: "http://puui.qpic.cn/vcover_vt_pic/0/i200hs4ip5a6u7a1482403261/0",
                status: 6,
                title: "鬼吹灯之精绝古城"
            }, {
                cid: "g7jpq0qd0k8xdca",
                pic: "http://puui.qpic.cn/vcover_vt_pic/0/g7jpq0qd0k8xdca1480909784/0",
                status: 6,
                title: "青云志2"
            }, {
                cid: "7ahtjlgnr7vtk1w",
                pic: "http://puui.qpic.cn/vcover_vt_pic/0/7ahtjlgnr7vtk1w1483062025/0",
                status: 6,
                title: "飞鸿笑传"
            } ],
            returncode: 0,
            returnmsg: "ok"
        });
    });
}

function p(i, t) {
    return [ 75, 92, 116, 130, 161, 175, 220, 260, 350, 450, 770 ].indexOf(t) < 0 && (t = 350), 
    i.replace(/\/0$/, "/" + t);
}

var a = require("../../module/page"), n = require("../../module/login"), s = require("../../module/boss.js"), o = require("../../module/es6-promise"), c = (require("../../module/globalData"), 
require("../../module/aid").buildAid), r = require("../../midaspay/api/index");

a("vip", {
    data: {
        pageName: "vip",
        avatar: "https://i.gtimg.cn/qqlive/images/20150303/default_160.png",
        nick: "你好",
        isVip: !1,
        loginType: "",
        uin: "",
        vipLevel: "",
        vipIcon: "",
        vipEndTime: "",
        priceList: null,
        privList: null,
        filmList: null,
        netErr: !1,
        popTips: "",
        aidParams: null,
        fromPlay: 0,
        openPayClickStop: 0
    },
    onShow: function() {
        var i = getCurrentPages(), t = i[i.length - 1];
        this.boss = s({
            page_url: t.$name
        });
    },
    onNavigate: function() {
        this.$put("vipPrice", i()), this.$put("vipPrivs", t()), this.$put("vipFilms", e());
    },
    onLoad: function(a) {
        var n = this;
        this.userInfoShow(), this.setData({
            aidParams: {
                value: decodeURIComponent(a.aid),
                cid: a.cid,
                vid: a.vid,
                pid: a.pid,
                scene: 18
            }
        }), a.cid || a.vid || a.pid ? this.setData({
            fromPlay: 1
        }) : (this.$take("vipFilms") || e()).then(function(i) {
            var t = i.items.slice(0, 3);
            t.forEach(function(i) {
                switch (i.pic = p(i.pic, 350), i.status) {
                  case 4:
                  case 7:
                    i.icon = "mark_vip_7", i.icon_desc = "付费";
                    break;

                  case 5:
                    i.icon = "mark_vip_5", i.icon_desc = "用券";
                    break;

                  case 6:
                    i.icon = "mark_vip_6", i.icon_desc = "VIP";
                }
            }), n.setData({
                filmList: t
            });
        }), (this.$take("vipPrice") || i()).then(function(i) {
            n.setData({
                priceList: i.price_list
            });
        }), (this.$take("vipPrivs") || t()).then(function(i) {
            var t = i.privs.length, e = [];
            t > 11 && t % 2 == 1 && (i = i.slice(0, t - 1)), t > 11 ? e.push(i.privs.slice(0, t / 2), i.privs.slice(t / 2)) : e.push(i.privs), 
            n.setData({
                privList: e
            });
        });
    },
    userInfoShow: function() {
        var i = this;
        n.getLoginInfo(function(t, e) {
            var p = e.avatarUrl, a = e.nickName, n = e.type, s = e.uin;
            i.setData({
                nick: a,
                avatar: p,
                loginType: n,
                uin: "qq" == n ? s : ""
            });
        });
        var t = this;
        n.getVipInfo(function(i, e) {
            if (e) {
                var p = e.iStatus, a = "";
                p ? e.iIsAnnual ? a = "_year" : e.ldAnualEndTime && (a = "_year_past") : a = e.ldAnualEndTime ? "_year_lost" : e.ldEndTime ? "_lost" : "_none", 
                t.setData({
                    isVip: p,
                    vipIcon: a,
                    vipLevel: e.iVipLevel
                });
                var n = new Date(1e3 * e.ldEndTime);
                e.ldEndTime && t.setData({
                    vipEndTime: n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate()
                });
            }
        });
    },
    onTapPlaylist: function(i) {
        var t = i.currentTarget.dataset.cid || "";
        this.$core.boss.click("vip:filmList." + t);
        var e = "cid=" + t;
        this.$route("play?" + e);
    },
    onTapPlaylistMore: function() {
        this.$core.boss.click("vip:filmListMore"), this.$route("list?channelId=100173&iattribute=1&sort=4");
    },
    openPay: function(i) {
        if (!this.data.openPayClickStop) {
            this.setData({
                openPayClickStop: 1
            });
            var t = i.currentTarget.dataset;
            this.$core.boss.click("vip:openPay." + t.amount + t.type);
            var e = r.subscribe.init({
                env: 0,
                autoDestroy: !0
            }), p = this, a = this.data.loginType;
            n.getPayUser().then(function(i) {
                console.log("pay user info", i);
                var n = {
                    openid: i.openid,
                    openkey: i.accessToken,
                    offer_id: t[a + "offerid"],
                    product_id: t.productid,
                    producttype: "",
                    session_id: "hy_gameid",
                    session_type: "wc_actoken",
                    pf: "html-wechat_wx-2001-wx-2011-hlw",
                    aid: c(p.data.aidParams),
                    direct_channel: "wechat",
                    service_name: "腾讯视频VIP",
                    service_code: "TXSPWX",
                    login_wx_appid: "wxa75efa648b60994b"
                };
                "qq" == a && (n.service_code = "TXSP", n.provide_uin = p.data.uin), console.log("####pay params", n), 
                e.launchPay(n, function(i) {
                    console.log("pay result", i), !i || 0 != i.resultCode && -1 != i.resultCode ? (p.setData({
                        openPayClickStop: 0
                    }), i && 1018 == i.resultCode ? p.showTips("系统繁忙，请重新打开小程序再次尝试") : i && -2 == i.resultCode ? console.log("用户取消支付") : p.showTips("网络繁忙，请稍后重试")) : (p.setData({
                        openPayClickStop: 0
                    }), 0 == i.resultCode && (p.data.fromPlay ? p.$back() : (p.userInfoShow(), setTimeout(function() {
                        p.userInfoShow();
                    }, 2e3))));
                });
            }).catch(function(i) {
                p.showTips("支付异常，请稍后重试");
            });
        }
    },
    showTips: function(i) {
        this.setData({
            popTips: i
        });
    },
    closeTips: function() {
        this.showTips("");
    }
});