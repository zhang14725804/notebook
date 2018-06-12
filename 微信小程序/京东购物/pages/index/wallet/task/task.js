function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
}, n = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
    };
}(), i = require("../../components_618/constant"), o = require("../../../../bases/component.js"), r = require("../common-behavior.js"), a = require("../../model.js"), s = require("../../utils.js"), u = require("../../../../common/fe_helper.js"), l = new (require("../../../../common/logger.js"))("HMMMMMMMMM 京东优选 - 每日任务"), c = require("../../../../common/cookie-v2/cookie"), f = require("../../../../libs/promise.min.js"), g = require("../../../../libs/proxy.min.js"), h = require("../../../../api/Ptag/report_manager.js"), d = require("../../../../common/utils.js").querystr, m = "AFFECT_ALL_ENTRIES", v = function() {
    function i(e, n) {
        t(this, i), this.raw = e, this.ctx = n, this.proxy = new g(e, {
            set: function(t, e, n) {
                if (e === m) for (var i in t) t[i] = n; else if (e.includes(".")) try {
                    this.goInside(t, e.split("."), n);
                } catch (t) {
                    return console.error("Proxy Error", t), !0;
                } else t[e] = n;
                return this.setData(), !0;
            }.bind(this)
        });
    }
    return n(i, [ {
        key: "commit",
        value: function(t, e) {
            this.proxy[t] = e;
        }
    }, {
        key: "goInside",
        value: function(t, e, n) {
            var i = e[0];
            if (!t.hasOwnProperty(i)) throw new Error("goInside Error");
            1 == e.length ? t[i] = n : this.goInside(t[i], e.slice(1), n);
        }
    }, {
        key: "setData",
        value: function() {
            var t = this;
            this.setDataTimer && clearTimeout(this.setDataTimer), this.setDataTimer = setTimeout(function() {
                var n = !1;
                for (var i in t.raw) if (t.raw[i]) {
                    n = !0;
                    break;
                }
                t.ctx.setData(e({}, t.raw, {
                    showModule: n
                }));
            }, 200);
        }
    } ]), i;
}();

new o({
    behaviors: [ r ],
    properties: {
        showTime: {
            type: Number,
            observer: function() {
                this.onPageShow();
            }
        },
        saleConfig: {
            type: Object,
            observer: function(t) {
                this.getSaleConfigResolve && this.getSaleConfigResolve(t);
            }
        },
        loadOthers: {
            type: Boolean,
            observer: function(t) {
                this.onIdleResolve && this.onIdleResolve();
            }
        }
    },
    data: {
        showModule: !1,
        title: ""
    },
    attached: function() {
        this.store = new v({
            signEntry: null,
            welfareEntry: null,
            statedGiftEntry: null,
            giftEntries: null,
            freshmenEntry: null,
            oldBringEntry: null,
            plusEntry: null,
            beansEntry: null,
            goToMainVenueEntry: null,
            sharedEntry: null,
            goToSessionVenueEntry: null,
            joinGamesEntry: null,
            goToGuidesEntry: null
        }, this), this.setData(this.store.raw);
    },
    methods: {
        refresh: function() {
            var t = this;
            this.onIdle = new f(function(e) {
                return t.onIdleResolve = e;
            }), this.getSaleConfig().then(function(e) {
                var n = e.data;
                if (n.theme_task && n.theme_task.length) {
                    var i = n.theme_task.find(function(t) {
                        return s.checkTime(t.beginTime, t.endTime);
                    });
                    i && t.setData({
                        title: i.title,
                        bg: t.utils.getImg(i.bg),
                        entryColor: i.entryColor || "",
                        entryLink: i.entryLink || "",
                        entryText: i.entryText || ""
                    });
                }
            }), this.loadPpmsData();
        },
        commit: function(t, e) {
            this.store.proxy[t] = e;
        },
        onPageShow: function() {
            this.updateSignData && (this.updateSignData = !1, this.loadSignData()), this.updateGiftData && (this.updateGiftData = !1, 
            this.loadGiftData()), this.updateFreshmenData && (this.updateFreshmenData = !1, 
            this.loadFreshmenData()), this.updatePlusData && (this.updatePlusData = !1, this.loadPlusData(this.plusConfig)), 
            this.updateSaleData && (this.updateSaleData = !1, this.loadSaleTasks());
        },
        loadPpmsData: function() {
            var t = this;
            this.biz.getPPMS(32910).then(function(e) {
                var n = e[0];
                t.signConfig = n.arrived[0], t.subpageConfig = n.subpage[0], t.giftConfig = n.gift, 
                t.freshmenConfig = n.newGift[0], t.statedGiftConfig = n.statedGift[0], n.oldToNew && n.oldToNew.some(function(e) {
                    if (s.checkTime(e.startTime, e.endTime)) return t.oldBringConfig = e, !0;
                }), n.beans && n.beans.some(function(e) {
                    if (s.checkTime(e.startTime, e.endTime)) return t.beansConfig = e, !0;
                }), n.welfare && n.welfare.some(function(e) {
                    if (s.checkTime(e.beginTime, e.endTime)) return t.welfareConfig = e, !0;
                }), n.plusGift && n.plusGift.some(function(e) {
                    if (s.checkTime(e.beginTime, e.endTime)) return t.plusConfig = e, !0;
                }), n.goToMainVenue && (t.goToMainVenueConfig = n.goToMainVenue.find(function(t) {
                    return s.checkTime(t.beginTime, t.endTime);
                })), n.shared && (t.sharedConfig = n.shared.find(function(t) {
                    return s.checkTime(t.beginTime, t.endTime);
                })), n.goToSessionVenue && (t.goToSessionVenueConfig = n.goToSessionVenue.find(function(t) {
                    return s.checkTime(t.beginTime, t.endTime);
                })), n.joinGames && (t.joinGamesConfig = n.joinGames.find(function(t) {
                    return s.checkTime(t.beginTime, t.endTime);
                })), n.goToGuides && (t.goToGuidesConfig = n.goToGuides.find(function(t) {
                    return s.checkTime(t.beginTime, t.endTime);
                }));
            }).then(function() {
                var e = [];
                return s.checkTime(t.statedGiftConfig.startTime, t.statedGiftConfig.endTime, u.getServerTime()) && e.push(t.statedGiftConfig.activeId), 
                t.loadWelfareDate(), f.all([ t.loadSignData(), t.queryBingoList(e), t.loadSaleTasks() ]);
            }).then(function() {
                return t.onIdle;
            }).then(function() {
                return f.all([ t.loadGiftData(), t.loadFreshmenData(), t.queryOldBring(t.oldBringConfig), t.loadPlusData(t.plusConfig) ]);
            }).then(function() {
                return t.loadSubpageBanner(t.subpageConfig);
            }).catch(function(e) {
                e.code, e.message;
                t.commit(m, null);
            });
        },
        loadSignData: function() {
            var t = this;
            return a.getSignStatus().then(function(e) {
                var n = t.signConfig, i = {
                    icon: t.utils.getImg(n.img_v2),
                    url: n.url
                }, o = e.status;
                0 == o ? (i.finish = !1, i.desc = n.unsigned) : 1 == o || 2 == o ? (i.finish = !0, 
                i.desc = n.signed) : i = null, t.commit("signEntry", i);
            }, function(e) {
                e.code, e.message;
                t.commit("signEntry", null);
            });
        },
        gotoSign: function() {
            var t = this.data.signEntry;
            t.finish || (this.$goto("/pages/h5/index", {
                url: t.url
            }), this.updateSignData = !0);
        },
        loadSubpageBanner: function(t) {
            if (t) {
                var e = this.store.raw, n = {
                    title: t.title,
                    desc: t.desc,
                    url: t.url
                };
                for (var i in e) if (e[i] && "signEntry" !== i) {
                    n = null;
                    break;
                }
                this.setData({
                    subpage: n
                });
            }
        },
        queryBingoList: function(t) {
            var e = this;
            return t.length ? a.getBingoList(t).then(function(t) {
                t.forEach(function(t) {
                    t.active === e.statedGiftConfig.activeId && e.loadStatedGiftData(t.count);
                });
            }).catch(function(t) {
                var e = t.code, n = t.message;
                l.log("queryBingoList error: ", e, n);
            }) : f.resolve();
        },
        loadWelfareDate: function() {
            var t = this.welfareConfig;
            if (t) {
                var e = {
                    title: t.title,
                    icon: this.utils.getImg(t.img),
                    desc: t.text,
                    btnDesc: t.btnText,
                    url: t.url
                };
                this.commit("welfareEntry", e);
            }
        },
        loadStatedGiftData: function(t) {
            var e = this.statedGiftConfig, n = {
                title: e.title,
                desc: e.desc,
                getDesc: e.getDesc,
                btnDesc: e.btnDesc,
                icon: this.utils.getImg(e.img)
            };
            n.finish = 0 != t, this.commit("statedGiftEntry", n);
        },
        gotoStatedGift: function(t) {
            var n = this, i = this.data.statedGiftEntry;
            i.finish || (a.activeDraw({
                active: this.statedGiftConfig.activeId,
                level: this.statedGiftConfig.activeLevel
            }).then(function(t) {
                0 == t.ret && 0 == t.bingo.bingoret && t.bingo.bingolevel > 0 ? (n.commit("statedGiftEntry", e({}, i, {
                    finish: !0
                })), wx.showModal({
                    content: "恭喜您中奖啦～",
                    showCancel: !1,
                    confirmColor: "#E93B3D"
                })) : wx.showModal({
                    content: "很遗憾未中奖，请下个小时再来试试吧～",
                    showCancel: !1,
                    confirmColor: "#E93B3D"
                });
            }).catch(function(t) {
                t.code;
                var e = t.message;
                wx.showModal({
                    content: e || "服务器开小差了，请稍后再试～",
                    showCancel: !1,
                    confirmColor: "#E93B3D"
                });
            }), i.ptag && s.report(i.ptag));
        },
        loadGiftData: function() {
            var t = this;
            return a.getGiftData().then(function(e) {
                l.log("loadGiftData --\x3e", e);
                var n = [], i = [];
                t.giftConfig.forEach(function(i) {
                    var o = i.giftId, r = e[o];
                    r && r.forEach(function(e) {
                        var r = {
                            id: e.id,
                            desc: i.desc,
                            icon: t.utils.getImg(i.img),
                            type: o
                        };
                        e.url ? (r.url = e.url, n.push(r)) : e.status;
                    });
                });
                var o = n.concat(i);
                t.commit("giftEntries", o.length ? o : null);
            }, function(e) {
                e.code, e.message;
                t.commit("giftEntries", null);
            });
        },
        gotoGift: function(t) {
            var e = t.currentTarget.dataset, n = e.url, i = e.type, o = {
                1: "137889.5.11",
                2: "137889.5.12",
                3: "137889.5.13",
                99: "137889.5.14",
                110: "137889.5.15",
                111: "137889.5.16",
                112: "137889.5.17",
                113: "137889.5.18",
                114: "137889.5.19",
                115: "137889.5.20",
                116: "137889.5.21",
                117: "137889.5.22",
                118: "137889.5.23"
            };
            n && (o[i] && s.report(o[i]), this.$goto("/pages/h5/index", {
                url: n
            }), this.updateGiftData = !0);
        },
        loadFreshmenData: function() {
            var t = this;
            return a.getFreshmenData().then(function(e) {
                var n = t.freshmenConfig, i = {
                    title: n.title,
                    desc: n.desc,
                    btnDesc: n.btnDesc,
                    icon: t.utils.getImg(n.img),
                    url: n.url
                };
                t.commit("freshmenEntry", 1 == e.isnew && (0 == e.newgift || 1 == e.newgift) ? i : null);
            }).catch(function(e) {
                e.code, e.message;
                t.commit("freshmenEntry", null);
            });
        },
        gotoFreshmenGift: function(t) {
            var e = t.currentTarget.dataset.url;
            e && (this.$goto("/pages/h5/index", {
                url: e
            }), this.updateFreshmenData = !0);
        },
        queryOldBring: function(t) {
            var e = this;
            if (t) return a.queryOldBring().then(function(n) {
                var i = n.friends, o = n.jingbean, r = n.money, a = {
                    title: t.title,
                    icon: e.utils.getImg(t.img),
                    btnDesc: t.descBtn,
                    url: t.url
                };
                if (0 == i) a.desc = t.baseText || "邀请好友拆礼包"; else if (i > 0) {
                    var s = "您有" + i + "个好友拆礼包";
                    (o > 0 || r > 0) && (s += ",获得"), s = o > 0 ? s + (o + "个京豆") : s, s = r > 0 ? s + (o > 0 ? "," : "") + (r / 100).toFixed(2) + "元现金" : s, 
                    a.desc = s;
                }
                e.commit("oldBringEntry", a);
            }).catch(function(t) {
                e.commit("oldBringEntry", null);
            });
        },
        getToken: function() {
            var t = c.getCookie("wq_auth_token");
            return t ? f.resolve(t) : a.getToken().then(function(t) {
                return t ? (c.setCookie({
                    data: {
                        wq_auth_token: {
                            value: t,
                            maxAge: 300
                        }
                    }
                }), t) : f.reject();
            });
        },
        loadPlusData: function(t) {
            var e = this;
            if (t) {
                var n = t.plusChannelUrl, i = t.couponsGiftUrl;
                return this.getToken().then(function(o) {
                    return a.getPlusUserInfo().then(function(o) {
                        var r = {
                            title: t.title,
                            desc: t.desc,
                            btnDesc: t.btnDesc,
                            icon: e.utils.getImg(t.img)
                        };
                        if (o.plusUserBaseInfo.newPlusFlag) r.url = n; else {
                            var s = o.plusUserBaseInfo.flag;
                            if ("201" == s) return a.getPlusCouponTotalQuota().then(function(t) {
                                return 0 == t.totalQuotaWithMonth ? r = null : r.url = i, r;
                            });
                            ("000" == s || "101" == s || "102" == s || "103" == s) && o.plusUserQualificationInfo.qualificationFlag ? r.url = n : r = null;
                        }
                        return r;
                    });
                }).then(function(t) {
                    return e.commit("plusEntry", t);
                }).catch(function(t) {
                    return e.commit("plusEntry", null);
                });
            }
        },
        gotoPlusGift: function(t) {
            var e = t.currentTarget.dataset.url;
            e && (this.$goto("/pages/h5/index", {
                url: e
            }), this.updatePlusData = !0);
        },
        processBeansData: function(t) {
            if (t) {
                var e = null;
                e = {
                    desc: t.desc,
                    icon: this.utils.getImg(t.img),
                    url: t.url
                }, this.commit("beansEntry", e);
            }
        },
        gotoH5: function(t) {
            var e = t.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: e
            });
        },
        getSaleConfig: function() {
            var t = this;
            return new f(function(e) {
                return t.getSaleConfigResolve = e;
            });
        },
        onLoadOthers: function() {
            var t = this;
            return new f(function(e) {
                return t.loadOthersResolve = e;
            });
        },
        loadSaleTasks: function() {
            var t = this;
            if (s.checkTime(i.CATEGORY_BEGIN, i.OVERTIME_END)) return a.getExemption().then(function(e) {
                if (e && e.taskinfo) {
                    var n = e.taskinfo, i = {
                        3: {
                            config: t.goToMainVenueConfig,
                            entry: "goToMainVenueEntry"
                        },
                        4: {
                            config: t.sharedConfig,
                            entry: "sharedEntry"
                        },
                        6: {
                            config: t.goToSessionVenueConfig,
                            entry: "goToSessionVenueEntry"
                        },
                        7: {
                            config: t.joinGamesConfig,
                            entry: "joinGamesEntry"
                        },
                        8: {
                            config: t.goToGuidesConfig,
                            entry: "goToGuidesEntry"
                        }
                    }, o = [];
                    n.forEach(function(e) {
                        var n = e.taskstatus, r = e.tasktype;
                        if (2 == n || !r || !i[r].config) return t.commit(i[r].entry, null);
                        var a = i[r].config, s = {
                            title: a.title || "",
                            btnDesc: a.tagDesc || "",
                            icon: t.utils.getImg(a.image),
                            url: a.url || ""
                        };
                        0 == n && (s.desc = a.unDoneDesc), 1 == n && (s.desc = a.doneButUndrawedDesc);
                        var u = s.url.split("?")[1], l = u ? d(u).query : {}, c = l.ptag || l.PTAG;
                        c && o.push(c), t.commit(i[r].entry, s);
                    }), h.addPtagExposure(o.join("_"));
                }
            }).catch(function(e) {
                t.commit("goToMainVenueEntry", null), t.commit("sharedEntry", null), t.commit("goToSessionVenueEntry", null), 
                t.commit("joinGamesEntry", null), t.commit("goToGuidesEntry", null);
            });
        },
        gotoSaleGift: function(t) {
            var e = t.currentTarget.dataset.url;
            e && (this.$goto("/pages/h5/index", {
                url: e
            }), this.updateSaleData = !0);
        }
    }
});