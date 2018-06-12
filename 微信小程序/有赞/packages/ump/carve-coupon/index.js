!function(t) {
    function e(a) {
        if (s[a]) return s[a].exports;
        var i = global.installedModules[a] = s[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return t[a].call(i.exports, i, i.exports, e), i.l = !0, i.exports;
    }
    t = Object.assign(require("../../../commons.js").modules, t);
    var s = {};
    s = global.installedModules = global.installedModules || {}, e.m = t, e.c = s, e.d = function(t, s, a) {
        e.o(t, s) || Object.defineProperty(t, s, {
            configurable: !1,
            enumerable: !0,
            get: a
        });
    }, e.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, e.n = function(t) {
        var s = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return e.d(s, "a", s), s;
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 183);
}({
    183: function(t, e, s) {
        var a, i = (a = s(0)) && a.__esModule ? a : {
            default: a
        }, o = s(1), n = s(9), r = s(4), u = s(7).moment, c = getApp();
        (0, i.default)({
            data: {
                status: {
                    showPopup: !1,
                    hasOut: !1,
                    hasOwn: !1,
                    hasEnded: !1,
                    openHorde: !1,
                    showRules: !1,
                    isOpenedSuccess: !1,
                    isActivityError: !1,
                    finished: !1
                },
                errorText: "",
                showView: !1
            },
            onLoad: function() {
                var t = this;
                (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).activityId && (this.setData({
                    activityId: this.__query__.activityId,
                    copyright: c.globalData.copyright,
                    is_big_shop: c.globalData.is_big_shop
                }), c.getUserInfo(function(e) {
                    var s = e.userInfo;
                    c.updateYouzanUserInfo(s), t.setData({
                        "activity.curUser": {
                            nick_name: s.nickName,
                            avatar: s.avatarUrl
                        }
                    });
                }), this.fetchActivityInfo());
            },
            fetchAllJoinedUser: function(t) {
                var e = this;
                c.request({
                    path: "wscump/coupon/carve_coupon_joined_user_list.json",
                    query: Object.assign({}, this.__query__, t)
                }).then(function(t) {
                    e.popers = t, t.length && e.setPoperData(e.popers.shift());
                }).catch(function(t) {
                    console.log(t);
                });
            },
            fetchOpenHordeInfo: function() {
                var t = this;
                return c.request({
                    path: "wscump/coupon/carve_coupon_result.json",
                    query: Object.assign({}, this.__query__)
                }).then(function(e) {
                    var s = t.data.activity.users;
                    if (t.data.activity.hasAllIn || e.user_horde_infos && Array.isArray(e.user_horde_infos) && e.user_horde_infos.length === s.length) {
                        var a = 0, i = 0, o = 0, n = e.user_horde_infos, r = 100 * t.data.activity.total_money, u = 0;
                        n.forEach(function(t) {
                            u += t.money;
                        });
                        var c = (r - u) / (t.data.activity.join_person_num - n.length);
                        s = s.map(function(s, n) {
                            var r = (e.user_horde_infos.filter(function(t) {
                                return t.yz_uid === s.user_id;
                            })[0] || {}).money, u = void 0 === r ? c : r;
                            return s.money = (u / 100).toFixed(2), i < u && (a = n, i = u), s.user_id === t.data.activity.cur_user_id && (o = n), 
                            t.data.activity.open_horde_id === s.user_id && t.setData({
                                "activity.owner": s
                            }), s;
                        }), 2 === t.data.activity.grant_type && (s[a].hasMaxMoney = !0), t.setData({
                            "activity.users": s,
                            "status.finished": !0,
                            "status.hasEnded": !1,
                            curUser: s[o]
                        });
                    }
                });
            },
            setPoperData: function(t) {
                var e = this;
                if (!t) return this.setPoperData(this.popers.shift());
                var s = [], a = this.data.popers && this.data.popers[1], i = this.data.popers && this.data.popers[0];
                t.value /= 100, a ? (a.index = 1, t.index = 2, s.push(a), this.setData({
                    popers: s
                })) : t.index = 2, i && !a && (i.index = 1, s.push(i)), s.push(t), this.setData({
                    popers: s
                }), this.popTimer = setTimeout(function() {
                    if (0 === e.popers.length) return clearTimeout(e.popTimer);
                    e.setPoperData(e.popers.shift());
                }, 3e3);
            },
            fetchActivityInfo: function(t) {
                var e = this;
                c.request({
                    path: "wscump/coupon/carve_coupon_activity_info.json",
                    query: this.__query__
                }).then(function(s) {
                    wx.stopPullDownRefresh(), s.total_money /= 100, s.goods = s.goods.map(function(t) {
                        return t.image = t.picture.length > 0 ? t.picture[0].url : "https://img.yzcdn.cn/upload_files/no_pic.png?imageView2/2/w/280/h/280/q/75/format/webp?imageView2/2/w/380/h/380/q/75/format/webp", 
                        t;
                    });
                    var a = "", i = !1;
                    if (2 === s.horde_type) {
                        for (var o = s.join_person_num - (s.join_num || 0), n = 0; n < o; n++) s.users.push({});
                        s.join_num = s.join_person_num, s.hasAllIn = !0, i = s.is_joined && !s.is_opened;
                    }
                    s.restCoupon = s.join_person_num - (s.join_num || 0);
                    var r = s.is_opened && s.restCoupon <= 0;
                    s.start_at < new Date().getTime() && !e.fetchedUsers && (e.fetchAllJoinedUser({
                        pageNo: 1,
                        pageSize: 100
                    }), e.fetchedUsers = !0), s.remain_time <= 0 && s.restCoupon > 0 && (a = "很遗憾，红包瓜分时间已过期"), 
                    new Date(s.end_at) < new Date() && s.restCoupon > 0 && (a = "哎呀，来晚啦，活动已结束", i = !0), 
                    s.is_joined || (s.restCoupon <= 0 && (a = "很遗憾，红包已满员"), (!e.__query__.hordeId && s.is_invalid || new Date(s.end_at) < new Date()) && (a = "哎呀，来晚啦，活动已结束", 
                    i = !0), s.horde_remain_num <= 0 && !s.horde_id && s.restCoupon && (a = "哎呀，来晚啦，红包派发完啦", 
                    i = !0)), s.users.forEach(function(t) {
                        t.user_id === s.cur_user_id && (s.curUser = t), t.user_id === s.open_horde_id && (s.owner = t);
                    });
                    for (var u = 0; u < s.restCoupon; u++) s.users.push({
                        empty: !0
                    });
                    +s.remain_time > 0 && !r && !i && (clearTimeout(e.timer), e.doTimer(+s.remain_time)), 
                    e.setData({
                        activity: s,
                        errorText: a,
                        showView: !0,
                        "status.finished": !1,
                        "status.isNewPackage": !s.horde_id,
                        "status.isActivityError": a.length > 0,
                        "status.isOwer": s.is_owner,
                        "status.hasEnded": i,
                        "status.isOpenedSuccess": e.data.status.isOpenedSuccess || s.is_joined
                    }), s.is_joined && !r && s.restCoupon <= 0 && e.setData({
                        "status.finished": !1,
                        "status.needOpenHorde": !0,
                        "status.hideClearIcon": !0,
                        "status.showPopup": !0,
                        pageWindowLock: !0
                    }), r && s.is_joined && (e.fetchOpenHordeInfo(), e.setData({
                        "status.finished": !0
                    })), t && t(s);
                }).catch(function(t) {
                    e.showZanToast(t.msg || "获取信息失败"), setTimeout(function() {
                        c.isSwitchTab("/pages/home/dashboard/index").then(function(t) {
                            return t ? wx.switchTab({
                                url: "/pages/home/dashboard/index"
                            }) : wx.redirectTo({
                                url: "/pages/home/dashboard/index"
                            });
                        });
                    }, 1e3);
                });
            },
            createPackage: function(t) {
                var e = this, s = Object.assign({}, this.__query__);
                t.target.dataset.new && delete s.hordeId, c.request({
                    path: "wscump/coupon/carve_coupon.json",
                    data: Object.assign({}, s, {
                        kdtId: c.getKdtId()
                    }),
                    method: "POST"
                }).then(function(s) {
                    if (s.horde_id && !s.ids) return e.setData({
                        ownHorderId: s.horde_id,
                        pageWindowLock: !0
                    }), e.updateData({
                        status: {
                            hasOwn: !0,
                            showPopup: !0,
                            needOpenHorde: !1,
                            hideClearIcon: !0
                        }
                    });
                    if (s.total_money && !s.horde_id) return e.setData({
                        hasMoney: s.total_money / 100,
                        pageWindowLock: !0
                    }), e.updateData({
                        status: {
                            hasOut: !0,
                            showPopup: !0,
                            needOpenHorde: !1,
                            hideClearIcon: !0,
                            isNewPackage: e.data.status.isNewPackage
                        }
                    });
                    var a = e.data.activity.restCoupon--;
                    t.target.dataset.new ? e.updateData({
                        status: {
                            isOpenedSuccess: !0,
                            isOwer: !0,
                            isNewPackage: e.data.status.isNewPackage
                        }
                    }) : e.updateData({
                        activity: {
                            restCoupon: a
                        },
                        status: {
                            isOpenedSuccess: !0,
                            isOwer: !e.__query__.hordeId,
                            isNewPackage: e.data.status.isNewPackage
                        }
                    }), e.__query__.hordeId = s.horde_id, e.fetchActivityInfo(function() {
                        !e.data.status.showPopup && e.setData({
                            "status.showPopup": !0,
                            pageWindowLock: !0
                        });
                    }), clearTimeout(e.timer);
                }).catch(function(t) {
                    return 160540265 === t.code ? (e.setData({
                        errorText: "哎呀，来晚啦，红包派发完啦",
                        "activity.horde_remain_num": 0
                    }), e.updateData({
                        status: {
                            isActivityError: !0,
                            hasEnded: !0
                        }
                    })) : 160540263 === t.code || 160540261 === t.code ? (e.setData({
                        errorText: "哎呀，来晚啦，活动已结束"
                    }), e.updateData({
                        status: {
                            isActivityError: !0,
                            hasEnded: !0
                        }
                    })) : void e.showZanToast(t && t.msg);
                });
            },
            updateData: function(t) {
                this.setData({
                    status: Object.assign({}, {
                        showPopup: !1,
                        hasOut: !1,
                        hasOwn: !1,
                        hasEnded: !1,
                        openHorde: !1,
                        showRules: !1,
                        isOpenedSuccess: !1,
                        isActivityError: !1,
                        isNewPackage: !1,
                        finished: !1
                    }, t.status)
                }), t.activity && this.setData({
                    activity: Object.assign({}, this.data.activity, t.activity)
                });
            },
            closePopup: function() {
                this.setData({
                    "status.showPopup": !1,
                    pageWindowLock: !1
                });
            },
            closeRules: function() {
                this.setData({
                    "status.showRules": !1
                });
            },
            openRules: function() {
                this.setData({
                    "status.showRules": !0
                });
            },
            openHorde: function() {
                var t = this;
                this.setData({
                    opening: !0
                }), this.fetchOpenHordeInfo().then(function() {
                    t.setData({
                        opening: !1,
                        "status.needOpenHorde": !1
                    }), t.closePopup();
                }).catch(function() {
                    t.showZanToast("开包失败");
                });
            },
            doTimer: function(t) {
                var e = this;
                if (+t <= 0) return this.fetchActivityInfo(), clearTimeout(this.timer);
                this.setData({
                    timer: u(new Date("1997/01/01 0:0:0").getTime() + t, "HH:mm:ss")
                }), this.timer = setTimeout(function() {
                    e.doTimer(+t - 1e3);
                }, 1e3);
            },
            onShareAppMessage: function() {
                var t = this;
                return this.setData({
                    "status.showPopup": !!this.data.hasMoney,
                    pageWindowLock: !!this.data.hasMoney
                }), r.page.processShareData({
                    title: "[" + (this.data.activity.curUser && this.data.activity.curUser.nick_name || "") + "@我]邀你瓜分" + this.data.activity.total_money + "元红包",
                    path: n.add("packages/ump/carve-coupon/index", {
                        activityId: this.__query__.activityId,
                        hordeId: this.data.activity.restCoupon > 0 && (this.__query__.hordeId || this.data.activity.horde_id) || ""
                    }),
                    imageUrl: "https://b.yzcdn.cn/public_files/2018/04/23/8f2ecbef83443e8ae9802a0d801c1736.jpg",
                    success: function() {
                        t.showZanToast(t.data.status.isActivityError ? "分享成功" : "已成功发送邀请，分享到3个微信群，99%概率拆红包");
                    }
                });
            },
            onPullDownRefresh: function() {
                this.setData({
                    "status.showPopup": !1,
                    pageWindowLock: !1
                }), this.fetchActivityInfo();
            }
        }, o.Toast);
    }
});