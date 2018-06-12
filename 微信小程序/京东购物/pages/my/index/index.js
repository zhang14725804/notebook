function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../common/localStorage")), a = t(require("../../../api/Ptag/report_manager")), n = t(require("../../../api/Ptag/Ptag_utils.js")), i = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    return e.default = t, e;
}(require("../../../api/Ptag/Ptag_constants")), o = require("../../../libs/promise.min.js"), s = require("../../my/coupon/couponData.js"), r = require("../../../models/my/assetsData.js"), c = require("../../../models/my/accountData.js"), u = require("../../../common/login/login.js").getLoginPromise, d = require("../../../common/user_info.js"), g = require("../../../common/fe_helper.js"), l = require("../../page.js"), h = require("../../../common/modal/modal.js"), f = require("../../../common/toast/toast.js"), p = new (require("../../../common/logger.js"))("my/index"), m = require("../../../common/cookie-v2/cookie.js"), v = require("../../../common/fe_report/usability.js"), T = getApp(), w = 0;

new l({
    data: {
        couponNum: 0,
        showRunning: !1,
        userInfo: null,
        balance: "",
        balanceDetail: "",
        eCardNum: "",
        bindWindow: {
            show: !1,
            sceneid: "",
            bindactiveid: "",
            bindlevel: "",
            rurl: ""
        },
        isError: !1,
        bindFloor: {
            show: !1,
            sceneid: "",
            bindactiveid: "",
            bindlevel: "",
            rurl: ""
        },
        activityList: [],
        goodImgMaxHeight: "",
        isCouponRed: !1,
        isPlus: !1,
        userInfoNotError: !1,
        isRealName: !0,
        footDot: 0,
        fromPinGouApp: 0,
        bindGary: 0,
        popup: {
            show: 0
        },
        bindpopupOptions: {},
        showLogisBox: !1,
        dealLogList: [],
        freeTasks: [],
        freeTaskNum: 0,
        plusTips: []
    },
    lockOnShow: !0,
    onLoad: function(t) {
        p.log("my onLoad"), this.modalTap = g.throttle(this.modalTap, 500), this.navToCouponPage = g.throttle(this.navToCouponPage, 1e3), 
        this.navToBalancePage = g.throttle(this.navToBalancePage, 1e3), this.navToOrderListPage = g.throttle(this.navToOrderListPage, 1e3), 
        this.navToBindPage = g.throttle(this.navToBindPage, 1e3), this.navToAccountPage = g.throttle(this.navToAccountPage, 1e3), 
        this.changeToJd = g.throttle(this.changeToJd, 1e3), this.navToECardPage = g.throttle(this.navToECardPage, 1e3), 
        this.navToRunningPage = g.throttle(this.navToRunningPage, 1e3), this.navToH5 = g.throttle(this.navToH5, 1e3), 
        this.navToAssetPage = g.throttle(this.navToAssetPage, 1e3), this.navToChannel = g.throttle(this.navToChannel, 1e3);
        var e = "app_pingou" == t.source ? 1 : 0;
        this.setData({
            fromPinGouApp: e
        });
    },
    onUnload: function() {
        a.default.exitAppReport(), this.setData({
            popup: {
                show: 0
            }
        });
    },
    onHide: function() {
        this.setData({
            popup: {
                show: 0
            }
        });
    },
    onShow: function() {
        p.log("my onShow"), this.fetchAllInfo();
    },
    fetchAllInfo: function() {
        var t = this;
        u().then(function(e) {
            t.fetchUserInfo(), t.speedMark(11), t.loadAllCoupon(), t.speedMark(13), t.loadBalance(), 
            t.speedMark(15), t.showJDECard(), t.getUserShopBrowseRSize(), t.getMyActivityConfig(), 
            t.getBindGaryConfig(), t.getPlusTips(), setTimeout(function() {
                t.speedMark(17), t.getAllNum(), t.getFreeTaskData();
            }, 400);
        }).catch(function(t, e) {
            p.error(t, e);
        });
    },
    updateUserView: function() {
        var t = d.gUserData(), e = void 0;
        switch (t.jdLevel) {
          case 90:
            e = "v0";
            break;

          case 50:
          case 59:
            e = "v1";
            break;

          case 56:
            e = "v2";
            break;

          case 60:
          case 61:
            e = "v3";
            break;

          case 62:
            e = "v4";
            break;

          case 63:
          case 88:
          case 103:
          case 104:
          case 105:
            e = "v5";
            break;

          default:
            e = "";
        }
        var a = {
            pin: t.pin,
            nickName: t.nickName,
            avatarUrl: t.avatarUrl || "../../../assets/images/default_user.png",
            definePin: t.definePin,
            level: e,
            jvalue: t.jvalue,
            pinlist: t.pinlist,
            jdNum: t.jdNum >= 1e5 ? this.toTenThousands(t.jdNum.toString()) : this.toThousands(t.jdNum.toString())
        };
        this.data.userInfo = a;
    },
    changeToJd: function(t, e) {
        var a = this, n = e || t.target.dataset.targetpin;
        u().then(function(t) {
            return new o(function(t, e) {
                c.changeAccount(n, function(a, n) {
                    0 == a ? t(n) : e(a);
                });
            }).then(function(t) {
                f.show({
                    icon: f.ICON.SUCCESS,
                    content: "切换成功！",
                    duration: 500,
                    page: a
                }), setTimeout(function() {
                    a.fetchAllInfo();
                }, 500);
            });
        }).catch(function(t) {
            p.error(t), f.show({
                icon: f.ICON.WARNING,
                content: "切换账号失败，请稍后再试！",
                duration: 1e3,
                page: a
            });
        });
    },
    fetchUserInfo: function() {
        var t = this;
        u().then(function(e) {
            new o(function(e, a) {
                d.getUserInfo(function(n, i) {
                    t.speedMark(4), 0 == n ? (t.updateUserView(), e(i)) : a(n);
                });
            }).then(function(e) {
                var a = t.data.userInfo;
                1 == e.base.accountType || 2 == e.base.accountType || 2 == e.definePin ? a.isbind = !0 : (a.isbind = !1, 
                t.getIsPlus()), 0 != a.definePin && a.isbind && t.getMyBindConfig(), 0 == a.definePin && t.verifyAuthUser(), 
                t.setData({
                    userInfo: a,
                    userInfoNotError: !0
                }, function() {
                    t.speedMark(5);
                });
            }).catch(function(e) {
                if (p.error(e), t.setDefaultError(), "-20" == e || "-40" == e || "-30" == e || "-10" == e) {
                    f.show({
                        icon: f.ICON.WARNING,
                        content: "请检查你的网络是否正常！",
                        duration: 2e3,
                        page: t
                    }), t.setData({
                        "guessyoulike.list": !0,
                        isError: !0
                    });
                }
            });
        });
    },
    setDefaultError: function() {
        this.setData({
            "userInfo.avatarUrl": "../../../assets/images/default_user.png",
            userInfoNotError: !1
        });
    },
    getIsPlus: function() {
        var t = this;
        new o(function(t, e) {
            d.getPlusUserInfo(function(e, a) {
                0 == e && t(a.data);
            });
        }).then(function(e) {
            201 != e.mapingstatus && 101 != e.status && 201 != e.status || t.setData({
                isPlus: !0
            });
        }).catch(function(t) {
            p.error(t);
        });
    },
    refreshInfo: function() {
        this.setData({
            "guessyoulike.list": !1,
            isError: !1
        }), this.fetchAllInfo();
    },
    loadAllCoupon: function() {
        var t = this;
        s.loadCouponData(1).then(function(e) {
            var a = s.couponsFilter(e.useable);
            t.setData({
                couponNum: a.length.toString()
            }, function() {
                t.speedMark(12);
            });
        }).catch(function(t) {
            p.error(t);
        });
    },
    loadBalance: function() {
        var t = this;
        new o(function(t, e) {
            r.loadBalance(function(a, n) {
                a ? e(a) : t(n);
            });
        }).then(function(e) {
            t.setData({
                balance: t.getShowNum(e.data)
            }, function() {
                t.speedMark(14);
            });
        }).catch(function(t) {
            p.error(t);
        });
    },
    showJDECard: function() {
        var t = this;
        r.getJDGiftCards(0, 10, 1).then(function(e) {
            t.setData({
                eCardNum: e.sumCount.toString()
            }, function() {
                t.speedMark(16);
            });
        }).catch(function(t) {
            p.error(t);
        });
    },
    getUserShopBrowseRSize: function() {
        var t = this;
        r.getUserShopBrowseRSize().then(function(e) {
            t.data.footDot = e.data.visible, t.setData({
                footDot: t.data.footDot
            });
        }).catch(function(t) {
            p.error(t);
        });
    },
    verifyAuthUser: function() {
        var t = this;
        r.verifyAuthUser().then(function(e) {
            2 == e.status ? t.data.isRealName = !1 : t.data.isRealName = !0, t.setData({
                isRealName: t.data.isRealName
            });
        }).catch(function(t) {
            p.error(t);
        });
    },
    getAllNum: function() {
        var t = this;
        o.all([ r.getOrderNum(1), r.getGoodsFavNum(1), r.getShopFavNum(1), r.showDpFavNum(1), r.showRecentNum(1), r.showCommentNum(1), r.getRedIcon(3, 1) ]).then(function(e) {
            var a = e[0].waitPayCount || " ", n = Number(e[0].waitReceiveCount ? e[0].waitReceiveCount : 0) + Number(e[0].waitPickCount ? e[0].waitPickCount : 0) || " ", i = e[1].totalNum || " ", o = e[2].totalNum || " ", s = e[3].dpfavNum || " ", r = parseInt(e[4].itemcount ? e[4].itemcount : 0) + parseInt(e[4].searchcount ? e[4].searchcount : 0) || " ", c = e[5].totalItem || " ";
            t.data.isCouponRed = !!(e[6] && e[6].data && e[6].data[0]) && !!(e[6].data[0].num > 0 && 3 == e[6].data[0].msg_type), 
            n > 0 ? t.showLogisticsInfo() : t.setData({
                showLogisBox: !1
            }), t.setData({
                waitPayCount: a,
                receiveCount: n,
                goodsFav: i,
                shopFavNum: o,
                dpFavNum: s,
                recentNum: r,
                commentNum: c,
                isCouponRed: t.data.isCouponRed
            }, function() {
                t.speedMark(18).speedReport();
            });
        }).catch(function(t) {
            p.error(t);
        });
    },
    getMyBindConfig: function() {
        var t = this;
        r.getMyBindConfig().then(function(e) {
            var n = {}, i = m.getCookie("wq_uin");
            if (1 == e[0].isshow || 1 == e[1].isshow) {
                if (1 == e[0].isshow) {
                    var o = e[0], s = o.sceneid, r = o.bindactiveid, c = o.bindlevel, u = o.rurl;
                    t.data.bindWindow = {
                        show: !0,
                        sceneid: s,
                        bindactiveid: r,
                        bindlevel: c,
                        rurl: u
                    };
                    var d = e[0].img;
                    0 === d.indexOf("//") && (d = "http:" + d), n.bindWindow = t.data.bindWindow, n.xmodalImg = d, 
                    v.umpBiz({
                        bizid: 563,
                        operation: 23,
                        result: 1,
                        message: i
                    }), a.default.addPtagExposure("7414.11.5");
                }
                if (1 == e[1].isshow) {
                    var g = e[1], l = g.sceneid, h = g.bindactiveid, f = g.bindlevel, p = g.rurl;
                    t.data.bindFloor = {
                        show: !0,
                        sceneid: l,
                        bindactiveid: h,
                        bindlevel: f,
                        rurl: p
                    }, n.bindFloor = t.data.bindFloor, v.umpBiz({
                        bizid: 563,
                        operation: 23,
                        result: 3,
                        message: i
                    });
                }
                t.setData(n);
            }
        }).catch(function(t) {
            p.error(t);
        });
    },
    getMyActivityConfig: function() {
        var t = this;
        w = 1019 == T.scene ? 1 : 0, r.getMyActivityConfig().then(function(e) {
            t.data.activityList = e[0].actSet[0].defalutAct.reduce(function(t, e) {
                var a = new Date().getTime();
                if (a >= new Date(e.startTime) && a <= new Date(e.endTime)) {
                    var n = e.actName, i = e.actUrl, o = e.actImg, s = e.limit;
                    return e.actName.indexOf("充值") >= 0 && 1 == w ? t : t.concat([ {
                        actName: n,
                        actUrl: i,
                        actImg: g.getImg(o),
                        limit: s
                    } ]);
                }
                return t;
            }, []), t.setData({
                activityList: t.data.activityList
            });
        }).catch(function(t) {
            p.error(t);
        });
    },
    getBindGaryConfig: function() {
        var t = this, e = 0, a = {
            1: ">",
            2: "<",
            3: ">=",
            4: "<="
        }, n = m.getCookie("wq_uin"), i = void 0, o = void 0;
        r.getBindGaryConfig().then(function(s) {
            s.forEach(function(t) {
                var s = new Date().getTime();
                s >= new Date(t.startTime) && s <= new Date(t.endTime) && 13 == t.graySign && (i = t.whiteList, 
                o = a[t.widrule] && t.widTail && n.slice(-1) + a[t.widrule] + t.widTail, e = "" != i && new RegExp(i).test(n) || "" != t.widTail && parseInt(n.slice(-1)) <= parseInt(t.widTail) ? 1 : 0);
            }, []), t.setData({
                bindGary: e
            });
        }).catch(function(t) {
            p.error(t);
        });
    },
    navToTools: function(t) {
        var e = this.data.activityList[t.currentTarget.dataset.idx], a = e.actName, n = e.actUrl, o = e.limit;
        !this.data.userInfo || 0 != this.data.userInfo.definePin && this.data.userInfo.isbind && 1 == o ? h.show({
            title: "提示",
            content: "登录京东账号，立即体验" + a + "！",
            showCancel: !0,
            align: "left",
            cancelText: "下次再说",
            confirmText: "立即登录",
            confirmColor: "#E93B3D",
            success: function() {
                this.gotoBindPage(i.MY_REGIST_LOGIN_CLICK, 521391209, "/pages/my/index/index");
            },
            fail: function() {}
        }) : 0 == this.data.userInfo.definePin || this.data.userInfo.isbind || 1 != o ? 0 == n.indexOf("//") ? this.$goto("/pages/h5/index", {
            url: "https:" + n
        }) : this.$goto(n) : h.show({
            title: "提示",
            content: "使用该功能需切换至京东账号" + this.data.userInfo.pinlist + "，立即切换？",
            showCancel: !0,
            align: "left",
            cancelText: "下次再说",
            confirmText: "确认",
            confirmColor: "#E93B3D",
            success: function() {
                this.changeToJd(void 0, this.data.userInfo.pinlist);
            },
            fail: function() {}
        });
    },
    hideXModal: function() {
        this.setData({
            "bindWindow.show": !1
        });
    },
    navToH5: function(t) {
        var e = t.currentTarget.dataset.url;
        this.$goto("/pages/h5/index", {
            url: e
        });
    },
    navToFootPrint: function(t) {
        var e = t.currentTarget.dataset.url;
        this.data.footDot && r.removeFootDot(), this.$goto("/pages/h5/index", {
            url: e
        });
    },
    navToRealName: function() {
        var t = this;
        r.getVerifyAuthUrl().then(function(e) {
            t.$goto("/pages/h5/index", {
                url: "https:" + e.redirect + "&ptag=" + i.MY_REAL_NAME
            });
        }).catch(function(e) {
            var a = e.code;
            45 == a ? f.show({
                icon: f.ICON.SUCCESS,
                content: "您已完成实名认证！",
                duration: 1e3,
                page: t
            }) : f.show({
                icon: f.ICON.WARNING,
                content: "网络错误，请稍后重试~",
                duration: 1e3,
                page: t
            }), p.error(a);
        });
    },
    modalTap: function(t) {
        var e = +t.currentTarget.dataset.modal;
        "0" == e && n.default.addPtag(i.MY_AFTER_SELL_CLICK);
        var a = [ "请至“微信-发现-购物-个人中心”进行售后订单管理" ][e];
        wx.showModal({
            title: "",
            content: a,
            showCancel: !1,
            confirmText: "知道了",
            confirmColor: "#E93B3D"
        });
    },
    navToBalancePage: function() {
        this.$goto("/pages/my_pages/balance/balance", {
            balance: this.data.balanceDetail,
            ptag: i.MY_BALANCE_CLICK
        });
    },
    navToAccountPage: function() {
        this.$goto("/pages/h5/index", {
            url: "https://wqs.jd.com/my/accountv2.shtml?sceneid=11110&state=0&rurl=" + encodeURIComponent("/pages/my/index/index") + "&ptag=7414.1.5"
        });
    },
    navToCouponPage: function() {
        this.data.isCouponRed && r.removeRedIcon(3), this.$goto("/pages/my/coupon/coupon", {
            ptag: i.MY_COUPON_CLICK
        });
    },
    navToBeanPage: function() {
        this.$goto("/pages/bean/index/index", {
            ptag: i.MY_BEAN
        });
    },
    navToECardPage: function() {
        this.$goto("/pages/my_pages/ecard/index/index", {
            ptag: i.MY_ECARD
        });
    },
    navToAssetPage: function() {
        this.$goto("/pages/h5/index", {
            url: "https://wqs.jd.com/my/asset.html?iswxappEnv=1"
        });
    },
    navToOrderListPage: function(t) {
        this.$goto("/pages/order/list/list", {
            currentPage: t.currentTarget.dataset.page,
            ptag: i[t.currentTarget.dataset.ptag]
        });
    },
    isShowRunning: function() {
        e.default.get("run_loginInfo").then(function(t) {
            var e = !1;
            t && t.hasOwnProperty("isLogin") && (e = !0), this.setData({
                showRunning: e
            });
        }).catch(function(t) {
            p.error(t);
        });
    },
    navToRunningPage: function(t) {
        this.$goto("/pages/run/index/index");
    },
    navToBindPage: function(t) {
        var e = t.currentTarget.dataset, a = e.rurl, n = e.ptag, o = e.sceneid, s = e.bindactiveid, r = e.bindlevel, c = e.type, u = n ? i[n] : i.MY_REGIST_LOGIN_CLICK, d = m.getCookie("wq_uin");
        1 == c ? v.umpBiz({
            bizid: 563,
            operation: 23,
            result: 2,
            message: d
        }) : 2 == c ? v.umpBiz({
            bizid: 563,
            operation: 23,
            result: 4,
            message: d
        }) : v.umpBiz({
            bizid: 563,
            operation: 23,
            result: 5,
            message: d
        }), o && s && r ? (this.hideXModal(), this.gotoBindPage(u, o, a, c, s, r)) : this.gotoBindPage(u, o, c, a);
    },
    gotoBindPage: function(t, e, a, o, s, r) {
        if (0 == this.data.bindGary) this.$goto("/pages/my_pages/account/account", {
            sceneid: e,
            rurl: o,
            bindactiveid: s,
            bindlevel: r,
            ptag: t
        }); else {
            this.setData({
                popup: {
                    show: 1
                },
                bindpopupOptions: {
                    bindactiveid: s,
                    bindlevel: r,
                    rurl: "/pages/my/index/index",
                    sceneid: 1 == a ? 521293285 : 521293286
                }
            });
            var c = 1 == a ? i.MY_BIND_WINDOWGARY_CLICK : i.MY_BIND_FLOORGARY_CLICK;
            n.default.addPtag(c);
        }
    },
    setBindPopUpStatus: function() {
        this.setData({
            popup: {
                show: 0
            }
        });
    },
    setUserInfo: function() {
        this.fetchAllInfo();
    },
    toThousands: function(t) {
        return t.indexOf(".") < 0 ? (t || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,") : (t = parseFloat(t.replace(/(\.\d{2})\d+$/, "$1")).toFixed(2).toString().split("."), 
        t[0] = t[0].replace(new RegExp("(\\d)(?=(\\d{3})+$)", "ig"), "$1,"), 0 == t[0] ? "0" : t.join("."));
    },
    getShowNum: function(t) {
        for (var e = 0, a = 0; a < t.length; a++) if (Object.keys(t[a]).indexOf("balance_audit") > -1) {
            e = parseFloat(t[a].balance_audit).toFixed(4);
            break;
        }
        return this.data.balanceDetail = this.toThousands(e.toString()), e >= 1e5 ? this.toTenThousands(e.toString()) : this.toThousands(e.toString());
    },
    toTenThousands: function(t) {
        return (parseFloat(t) / 1e4).toString().split(".")[0] + "万" + (parseFloat(t) % 1e4 == 0 ? "" : "+");
    },
    setLogisticsGray: function() {
        var t = this;
        return new o(function(e, a) {
            var n = m.getCookie("wq_uin"), i = "", o = !1;
            r.getBindGaryConfig().then(function(s) {
                s.forEach(function(s) {
                    var r = new Date().getTime();
                    r >= new Date(s.startTime) && r <= new Date(s.endTime) && "15" == s.graySign && (i = s.whiteList, 
                    (o = !!("" !== i && new RegExp(i).test(n) || "" !== s.widTail && parseInt(n.slice(-1)) <= parseInt(s.widTail))) || (t.setData({
                        showLogisBox: !1
                    }), a("not a gray user")), e());
                });
            }).catch(function(t) {
                p.error(t);
            });
        });
    },
    getLogisticsInfo: function() {
        var t = this;
        r.getLogisticsInfo().then(function(e) {
            var n = e.dealLogList;
            if (n && 0 === n.length) return t.setData({
                showLogisBox: !1
            }), !1;
            for (var o = 0; o < n.length; o++) {
                var s = n[o];
                if (s.stateName) switch (s.state) {
                  case "4":
                  case "5":
                  case "6":
                  case "7":
                  case "32":
                    s.stateText = "待发货";
                    break;

                  case "15":
                    s.stateText = "配送中";
                    break;

                  case "18":
                    s.stateText = "已签收";
                    break;

                  case "21":
                    s.stateText = "审核中";
                    break;

                  case "22":
                  case "23":
                    s.stateText = "处理中";
                    break;

                  case "11":
                    s.stateText = "待自提";
                    break;

                  case "13":
                    s.stateText = "已签收";
                    break;

                  case "12":
                    s.stateText = "自提超时";
                    break;

                  case "8":
                    s.stateText = "待出库";
                    break;

                  case "9":
                  case "10":
                    s.stateText = "配送中";
                    break;

                  case "20":
                    s.stateText = "收款确认";
                    break;

                  default:
                    n.splice(o, 1), o--;
                } else n.splice(o, 1), o--;
            }
            t.setData({
                dealLogList: n,
                showLogisBox: !0
            });
            var r = i.MY_LOGISTICS_PROGRESS_EXPROSURE;
            a.default.addPtagExposure(r);
        });
    },
    getPlusTips: function() {
        var t = this;
        r.getPlusTips().then(function(e) {
            var a = [];
            e && e.length && (e.forEach(function(t) {
                var e = Date.now(), n = new Date(t.startTime).getTime(), i = new Date(t.endTime).getTime();
                e >= n && e <= i && a.push(t.hotName);
            }), t.setData({
                plusTips: a
            }));
        }).catch(function(t) {
            p.error(t);
        });
    },
    showLogisticsInfo: function() {
        var t = this;
        this.setLogisticsGray().then(function() {
            t.getLogisticsInfo();
        }).catch(function(t) {
            p.info(t);
        });
    },
    jumpLogisDetail: function(t) {
        var e = t.currentTarget.dataset, a = e.dealid, o = e.dealstate, s = e.venderid, r = e.ordertype, c = i.MY_LOGISTICS_PROGRESS_CLICK;
        n.default.addPtag(c), this.$goto("/pages/order/follow/follow", {
            dealId: a,
            dealState: o,
            venderId: s,
            orderType: r,
            source: "userCenter"
        });
    },
    getFreeTaskData: function() {
        var t = this;
        r.getFreeTaskData().then(function(e) {
            var n = (t.data.userInfo || {}).pin;
            n && (n = n.toLowerCase(), t.getFreeTaskNum(n));
            var o = [];
            if (e.forEach(function(t) {
                var e = Date.now(), a = new Date(t.onlineTime).getTime(), n = new Date(t.offlineTime).getTime();
                e >= a && e <= n && (t.bgImg = 0 === t.bgImg.indexOf("//") ? "https:" + t.bgImg : t.bgImg, 
                t.iconImg = 0 === t.iconImg.indexOf("//") ? "https:" + t.iconImg : t.iconImg, o.push(t));
            }), t.setData({
                freeTasks: o
            }), o.length) {
                var s = i.MY_FREE_TASK_EXPROSURE;
                a.default.addPtagExposure(s);
            }
        }).catch(function(t) {
            p.error(t);
        });
    },
    getFreeTaskNum: function(t) {
        var e = this;
        r.getFreeTaskNum(t).then(function(t) {
            var a = t.data;
            if (a) {
                var n = a.exemptionnum;
                n > 99 ? e.setData({
                    freeTaskNum: 99
                }) : e.setData({
                    freeTaskNum: n
                });
            }
        }).catch(function(t) {
            p.error(t);
        });
    },
    navToChannel: function(t) {
        var e = t.currentTarget.dataset.url, a = i.MY_FREE_TASK_CLICK;
        n.default.addPtag(a), 0 === e.indexOf("//") ? this.$goto("/pages/h5/index", {
            url: "https:" + e
        }) : this.$goto(e);
    },
    alertPlusTips: function(t) {
        var e = this.data.isPlus, a = e ? "PLUS会员" : "开通PLUS会员", n = e ? "亲爱的PLUS用户，您可前往“微信-发现-购物-个人中心-PLUS会员页”查看会员特权福利，参与专属活动" : "亲爱的京东用户，您可前往“微信-发现-购物-个人中心-PLUS会员页”开通会员，尽情享受特权福利";
        h.show({
            title: a,
            content: n,
            confirmText: "好的",
            confirmColor: "#E93B3D"
        });
    }
});