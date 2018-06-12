function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    if (Array.isArray(t)) {
        for (var e = 0, o = Array(t.length); e < t.length; e++) o[e] = t[e];
        return o;
    }
    return Array.from(t);
}

function o(t, e, o) {
    return e in t ? Object.defineProperty(t, e, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = o, t;
}

var n = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (t[n] = o[n]);
    }
    return t;
}, a = function() {
    function t(t, e) {
        var o = [], n = !0, a = !1, i = void 0;
        try {
            for (var s, r = t[Symbol.iterator](); !(n = (s = r.next()).done) && (o.push(s.value), 
            !e || o.length !== e); n = !0) ;
        } catch (t) {
            a = !0, i = t;
        } finally {
            try {
                !n && r.return && r.return();
            } finally {
                if (a) throw i;
            }
        }
        return o;
    }
    return function(e, o) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, o);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), i = t(require("../../../api/Ptag/Ptag_utils.js")), s = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    return e.default = t, e;
}(require("../../../api/Ptag/Ptag_constants")), r = t(require("modal/modal")), u = require("common.js"), c = require("couponData.js"), d = require("../../page.js"), h = require("../../../libs/promise.min"), l = getApp();

new d({
    data: {
        ppms: null,
        filterStatus: [ {
            name: "类型",
            selectedIndex: 0,
            status: [ "全部类型", "京券", "东券", "运费券" ]
        }, {
            name: "状态",
            selectedIndex: 0,
            status: [ "全部类型", "新到", "快过期" ]
        }, {
            name: "优惠力度",
            selectedIndex: -1,
            status: [ "", "从高到低", "从低到高" ]
        } ],
        filterTabIndex: -1,
        filterDetailToggle: !1,
        maskToggle: !1,
        bindStatus: null,
        realNameInfo: null,
        shareBtnInfo: null,
        currentPage: 0,
        couponList: [ [], [], [], [] ],
        cdkey: null,
        getCDkey: !0,
        renderList: [],
        isRenderPanel: [ !1, !1, !1, !1 ],
        couponPage: [ 0, 0, 0, 0 ],
        couponLoading: [ !0, !0, !0, !0 ],
        pageCount: 10,
        noMorePage: [ !1, !1, !1, !1 ],
        finishLoading: !1,
        isLoading: !1,
        couponError: [],
        couponLengths: [ 0, 0, 0, 0 ],
        mode: 1
    },
    pageIndex: {
        0: 0,
        1: 0,
        2: 0,
        3: 0
    },
    touchstart: function(t) {
        var e = t.currentTarget.dataset, o = e.index, n = e.tabIndex, a = t.touches[0];
        this.data.touch = {
            startX: a.clientX,
            startY: a.clientY,
            isFirst: !0,
            index: o,
            tabIndex: n
        };
    },
    touchmove: function(t) {
        var e = t.touches[0], o = this.data.touch, n = o.startX, a = o.startY, i = o.isFirst, s = e.clientX - n, r = e.clientY - a;
        Math.abs(s) < 50 && Math.abs(r / s) < Math.tan(30 * Math.PI / 180) && i && (s < 0 ? this.toggleDeleteBtn(!0) : this.toggleDeleteBtn(!1), 
        this.data.touch.isFirst = !1);
    },
    touchend: function(t) {
        this.data.touch.isFirst = !0;
    },
    toggleDeleteBtn: function() {
        var t, e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], n = this.data.touch, a = n.index, i = n.tabIndex;
        this.setData((t = {}, o(t, "couponList[" + i + "][" + a + "].isShowDeleteBtn", e), 
        o(t, "couponList[" + i + "][" + a + "].isShowDeleteAnimate", !0), t));
    },
    showSendRole: function() {
        r.default.show(u.TRANFER_ROLE);
    },
    deleteCoupon: function(t) {
        var e = t.currentTarget.dataset, n = e.tabIndex, a = e.index, i = this.data, s = i.couponList, u = i.renderList, d = s[n][a];
        0 == n || 1 == n && d.canBeShare || 3 == n ? r.default.show({
            showClose: !0,
            icon: r.default.ICON_WARN,
            content: "您确定要删除该券？",
            sub: "您可在京东网站-我的京东-优惠券-回收站优惠券中查看或恢复优惠券",
            btns: [ {
                name: "删除",
                color: "#e93b3d",
                cb: function() {
                    var t = this;
                    this.setData({
                        isLoading: !0
                    }), c.delCoupon(d).then(function() {
                        var e = {
                            isLoading: !1
                        };
                        t.toast.show({
                            icon: t.toast.ICON.SUCCESS,
                            content: "删除成功"
                        });
                        var o = 0;
                        if (u[n].some(function(t, e) {
                            return t.couponid == d.couponid && (o = e, !0);
                        }), u[n].splice(o, 1), e["couponLengths[" + n + "]"] = u[n].length > 99 ? "99+" : u[n].length, 
                        d.canBeShare) {
                            var a = 0 == n ? 1 : 0, i = 0;
                            u[a].some(function(t, e) {
                                return t.couponid == d.couponid && (i = e, !0);
                            }), u[a].splice(i, 1), e["couponLengths[" + a + "]"] = u[a].length > 99 ? "99+" : u[a].length;
                        }
                        t.setData(e), t.renderCoupon(0);
                    }).catch(function(e) {
                        t.toast.show({
                            icon: t.toast.ICON.ERROR,
                            content: e || "删除失败"
                        }), t.setData({
                            isLoading: !1
                        });
                    });
                }
            }, {
                name: "取消"
            } ]
        }) : (s[n][a].isShowDeleteBtn = !1, this.setData(o({}, "couponList[" + n + "]", s[n])), 
        r.default.show({
            content: "该类型优惠券暂不支持删除功能",
            btns: [ {
                name: "确定",
                color: "#e93b3d"
            } ]
        }));
    },
    turnPage: function(t) {
        var e = t.currentTarget.dataset.index;
        i.default.addPtag(s["MY_COUPON_TAB" + e]);
        var o = this.data.isRenderPanel, n = {
            currentPage: e,
            scrollTop: 0 == this.data.scrollTop ? -1 : 0
        };
        0 != e && Object.assign(n, {
            filterDetailToggle: !1,
            maskToggle: !1
        }), this.setData(n), o[e] || (this.renderCoupon(), this.data.isRenderPanel[e] = !0);
    },
    showModal: function() {
        var t = this;
        this.setData({
            filterDetailToggle: !1
        }), r.default.show(Object.assign({}, u.COUPON_ROLE, {
            closeModalAlert: function() {
                t.setData({
                    maskToggle: !1
                });
            }
        }));
    },
    hideMask: function() {
        this.setData({
            filterDetailToggle: !1,
            maskToggle: !1
        });
    },
    switchFilterTab: function(t) {
        var e = t.currentTarget.dataset.tabIdx, o = this.data, n = o.filterStatus, a = o.filterTabIndex, i = o.renderList, s = o.filterDetailToggle;
        e != a ? (n.forEach(function(t, e) {
            t.selectedIndex = 2 == e ? -1 : 0;
        }), i[0].forEach(function(t) {
            t.isFilterShow = !0;
        }), i[0] = c.sortUseableCoupons(i[0]), this.setData({
            filterStatus: n,
            filterTabIndex: e,
            filterDetailToggle: !0,
            maskToggle: !0,
            scrollTop: 0 == this.data.scrollTop ? -1 : 0
        }), this.resetFilterStatus(), this.renderCoupon()) : this.setData({
            filterTabIndex: e,
            filterDetailToggle: !s,
            maskToggle: !s
        });
    },
    selectFilterItem: function(t) {
        var e = t.currentTarget.dataset.tabIdx;
        0 == e ? this.filterByCouponType(t) : 1 == e ? this.filterByCouponStatus(t) : 2 == e ? this.filterByCouponCost(t) : 3 == e && this.showModal();
    },
    resetFilterStatus: function() {
        var t;
        this.setData((t = {}, o(t, "couponPage[0]", 0), o(t, "couponLoading", [ !1, !1, !1, !1 ]), 
        o(t, "pageCount", 10), o(t, "noMorePage", [ !1, !1, !1, !1 ]), t));
    },
    filterByCouponType: function(t) {
        var e = t.currentTarget.dataset.index, o = this.data.renderList;
        0 == e ? o[0].forEach(function(t) {
            t.isFilterShow = !0;
        }) : 1 == e ? o[0].forEach(function(t) {
            3 == t.couponTypeNum ? t.isFilterShow = !0 : t.isFilterShow = !1;
        }) : 2 == e ? o[0].forEach(function(t) {
            1 == t.couponTypeNum || 2 == t.couponTypeNum ? t.isFilterShow = !0 : t.isFilterShow = !1;
        }) : 3 == e && o[0].filter(function(t) {
            4 == t.couponTypeNum ? t.isFilterShow = !0 : t.isFilterShow = !1;
        }), this.setData({
            "filterStatus[0].selectedIndex": e,
            scrollTop: 0 == this.data.scrollTop ? -1 : 0
        }), this.resetFilterStatus(), this.renderCoupon(), this.switchFilterTab(t);
    },
    filterByCouponStatus: function(t) {
        var e = t.currentTarget.dataset.index, o = this.data.renderList;
        0 == e ? o[0].forEach(function(t) {
            t.isFilterShow = !0;
        }) : 1 == e ? o[0].forEach(function(t) {
            1 == t.useableCouponStatus ? t.isFilterShow = !0 : t.isFilterShow = !1;
        }) : 2 == e ? o[0].forEach(function(t) {
            2 == t.useableCouponStatus ? t.isFilterShow = !0 : t.isFilterShow = !1;
        }) : 3 == e && o[0].filter(function(t) {
            t.canBeShare ? t.isFilterShow = !0 : t.isFilterShow = !1;
        }), this.setData({
            "filterStatus[1].selectedIndex": e,
            scrollTop: 0 == this.data.scrollTop ? -1 : 0
        }), this.resetFilterStatus(), this.renderCoupon(), this.switchFilterTab(t);
    },
    filterByCouponCost: function(t) {
        var e = t.currentTarget.dataset.index, o = this.data.renderList;
        1 == e ? o[0].sort(function(t, e) {
            var o = e.discount - t.discount;
            return 0 == o && (o = t.useableCouponStatus - e.useableCouponStatus), o;
        }) : 2 == e && o[0].sort(function(t, e) {
            var o = t.discount - e.discount;
            return 0 == o && (o = t.useableCouponStatus - e.useableCouponStatus), o;
        }), this.setData({
            "filterStatus[2].selectedIndex": e,
            scrollTop: 0 == this.data.scrollTop ? -1 : 0
        }), this.resetFilterStatus(), this.renderCoupon(), this.switchFilterTab(t);
    },
    navigateToRedeem: function() {
        l.isCouponListNeedRefresh = !0, this.$goto("/pages/h5/index", {
            url: "https://wqs.jd.com/promote/2015/exchangecoupons/index.html?ptag=7211.4.9&inwxapp=1"
        }), this.setData({
            filterDetailToggle: !1,
            maskToggle: !1
        });
    },
    navigateToCouponDetail: function(t) {
        var e = t.currentTarget.dataset, o = e.type, n = e.index, a = this.data.couponList[o][n];
        i.default.addPtag(s.MY_COUPON_TO_DETAIL), l.myCouponDetail = a, this.$goto("/pages/my_pages/coupon_detail/coupon_detail");
    },
    navigateToGoodsCategory: function(t) {
        var e = this.data.ppms, o = t.currentTarget.dataset.type;
        i.default.addPtag(s.MY_COUPON_TO_USE), 2 == o && e && e.url ? this.$goto("/pages/h5/index", {
            url: e.url
        }) : this.$goto("/pages/seckill/index/index");
    },
    navigateToTicketPurchase: function(t) {
        var e = t.currentTarget.dataset, o = e.couponKind, n = e.batchid, a = e.beginTime, r = e.endTime, u = e.type;
        1 == (u = u || 1) ? i.default.addPtag(s.MY_COUPON_TO_USE) : 2 == u && i.default.addPtag(s.MY_COUPON_TICKET_CLICK), 
        this.$goto("/pages/search/subPackages/coupon/coupon", {
            batch: n,
            kind: o,
            startTime: a,
            endTime: r
        });
    },
    navigateToCouponCenter: function() {
        l.isCouponListNeedRefresh = !0, this.$goto("/pages/coupon/index");
    },
    verifyAuthUser: u.verifyAuthUser,
    queryBindStatus: u.queryBindStatus,
    judgeShareBtnStatus: u.judgeShareBtnStatus,
    navigateToSend: function(t) {
        var e = t.currentTarget.dataset, o = e.tabIndex, n = e.couponIdx, a = this.data.couponList[o][n];
        u.judgeToSend.call(this, a, 521392392);
    },
    recallSend: function(t) {
        var e = this, o = t.currentTarget.dataset.couponIdx, n = this.data.couponList[1][o];
        this.setData({
            isLoading: !0
        }), c.cancelCouponShare(n).then(function(t) {
            e.toast.show({
                icon: e.toast.ICON.SUCCESS,
                content: "撤销成功",
                duration: 2e3
            }), setTimeout(function() {
                e.resetStatus(), e.getData();
            }, 3e3), e.setData({
                isLoading: !1
            });
        }).catch(function(t) {
            e.handleCancelCouponShare(t, n), e.setData({
                isLoading: !1
            });
        });
    },
    handleCreateCouponShare: function(t, e) {
        var o = t.errorCode;
        9011 == o ? this.toast.show({
            content: "赠送次数已超过上限，明天再来吧",
            duration: 3e3
        }) : 9002 == o ? this.toast.show({
            content: "参与赠送的人有点多，先去逛逛吧",
            duration: 3e3
        }) : 9008 == o || 9009 == o ? u.judgeToSend.call(this, e, 521392392) : this.toast.show({
            content: "赠送的人有点多，请稍后再试",
            duration: 3e3
        }), i.default.addPtag("7211.6.26");
    },
    handleCancelCouponShare: function(t, e) {
        if (9013 == t.errorCode) {
            this.toast.show({
                content: "撤销失败，券被好友领走了",
                duration: 3e3
            });
            var o = this;
            setTimeout(function() {
                o.resetStatus(), o.getData();
            }, 3e3);
        } else this.toast.show({
            content: "抱歉，撤销失败，请稍后重试",
            duration: 3e3
        });
    },
    goSharePage: function(t) {
        var e = this;
        i.default.addPtag("7211.6.21");
        var o = t.currentTarget.dataset.couponIdx, n = this.data.couponList, a = n[1][o];
        this.setData({
            isLoading: !0
        }), c.queryQuanShare(n[1][o]).then(function(t) {
            t.shareInfo.shareInfo && t.shareInfo.shareInfo.shareid && e.$goto("/pages/my_pages/coupon_share/coupon_share", {
                couponid: a.couponid,
                shareid: t.shareInfo.shareInfo.shareid
            }), e.setData({
                isLoading: !1
            });
        }).catch(function(t) {
            e.toast.show({
                content: t,
                duration: 3e3
            }), e.setData({
                isLoading: !1
            });
        });
    },
    loadAllCoupon: function() {
        var t = this;
        this.setData({
            noMorePage: [ !1, !1, !1, !1 ],
            finishLoading: !1
        });
        var o = c.loadCouponData(1).then(function(t) {
            var e = c.handleUseableCoupons(t.useable);
            return h.resolve(e);
        }).catch(function(t) {
            return h.reject(t);
        }), n = c.loadCouponData(2).then(function(t) {
            var e = c.handleUsedCoupons(t.used);
            return h.resolve(e);
        }).catch(function(t) {
            return h.reject(t);
        }), i = c.loadCouponData(4).then(function(t) {
            var e = c.handleExpiredCoupons(t.expired);
            return h.resolve(e);
        }).catch(function(t) {
            return h.reject(t);
        });
        h.all([ o, n, i ]).then(function(o) {
            var n = a(o, 3), i = n[0], s = n[1], r = n[2], u = t.data.currentPage, d = i.useable, l = s.used, g = r.expired, p = c.handleSocialCoupons([].concat(e(i.social), e(s.social), e(r.social))), f = [ d, p, l, g ];
            t.data.renderList = f, t.data.isRenderPanel[u] = !0, t.speedMark(4), t.setData({
                couponLengths: [ d.length > 99 ? "99+" : d.length, p.length > 99 ? "99+" : p.length, l.length > 99 ? "99+" : l.length, g.length > 99 ? "99+" : g.length ],
                couponError: [],
                finishLoading: !0
            }, function() {
                t.speedMark(5).speedReport();
            });
            var S = c.getCDKeyCouponShare().then(function(t) {
                return h.resolve(t);
            }).catch(function(t) {
                return h.reject(t);
            });
            h.all([ S ]).then(function(e) {
                var o = a(e, 1)[0].cdkey;
                t.setData({
                    cdkey: o
                }), t.data.couponLoading = [ !1, !1, !1, !1 ], t.renderCoupon();
            }).catch(function(e) {
                t.setData({
                    getCDkey: !1
                }), t.data.couponLoading = [ !1, !1, !1, !1 ], t.renderCoupon();
            });
        }).catch(function(e) {
            t.setData({
                couponError: [ e, e, e, e ],
                noMorePage: [ !0, !0, !0, !0 ],
                finishLoading: !0
            });
        });
    },
    loadNext: function() {
        var t = this.data, e = t.currentPage, o = t.couponLoading, n = t.noMorePage;
        if (o[e] || n[e]) return !1;
        this.renderCoupon();
    },
    renderCoupon: function() {
        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, n = this.data, a = n.currentPage, i = n.couponPage, s = n.pageCount, r = n.couponLoading, u = n.renderList;
        r[a] = !0, i[a] += e;
        var c = i[a] * s, d = [];
        d = 0 == a ? u[a].filter(function(t) {
            return t.isFilterShow;
        }).slice(0, c) : u[a].slice(0, c);
        var h = o({}, "couponList[" + a + "]", d);
        d.length < c && (h["noMorePage[" + a + "]"] = !0), this.setData(h), setTimeout(function() {
            0 != a && 1 != a || t.getExpiringGoods(), r[a] = !1;
        }, 300);
    },
    getExpiringGoods: function() {
        var t = this, e = this.data, o = e.renderList, a = e.couponPage, r = e.pageCount, u = e.currentPage, d = a[u] * r, l = [];
        o[u].filter(function(t) {
            return t.isFilterShow;
        }).slice(0, d).forEach(function(e) {
            if (2 == e.useableCouponStatus && e.isShowGoods) {
                var o = new h(function(o, a) {
                    if (e.ticketPurchase.isGoodsLoaded) {
                        var r = t.getIndexOfNowCoupon(e), u = r.firstIndex, d = r.secondIndex, h = {};
                        u > -1 && (h["couponList[0][" + u + "].ticketPurchase"] = e.ticketPurchase), d > -1 && (h["couponList[1][" + d + "].ticketPurchase"] = e.ticketPurchase), 
                        o(h);
                    } else 0 == e.ticketPurchase.requestNum && (e.ticketPurchase.requestNum++, c.getExpiringGood(e.batchid, e.couponKind, e.shopId).then(function(a) {
                        Object.assign(e.ticketPurchase, a), a.goodsNoWrap.length > 0 && i.default.addPtag(s.MY_COUPON_TICKET_EXPOSURE);
                        var r = t.getIndexOfNowCoupon(e), u = r.firstIndex, c = r.secondIndex, d = {};
                        u > -1 && (d["couponList[0][" + u + "].ticketPurchase"] = n({}, e.ticketPurchase, a)), 
                        c > -1 && (d["couponList[1][" + c + "].ticketPurchase"] = n({}, e.ticketPurchase, a)), 
                        o(d);
                    }).catch(function(a) {
                        var i = t.getIndexOfNowCoupon(e), s = i.firstIndex, r = i.secondIndex, u = {};
                        s > -1 && (u["couponList[0][" + s + "].ticketPurchase"] = n({}, e.ticketPurchase, {
                            isGoodsLoaded: !0,
                            isGoodsError: !0
                        })), r > -1 && (u["couponList[1][" + r + "].ticketPurchase"] = n({}, e.ticketPurchase, {
                            isGoodsLoaded: !0,
                            isGoodsError: !0
                        })), o(u);
                    }));
                });
                l.push(o);
            }
        }), h.all(l).then(function(e) {
            var o = {};
            e.forEach(function(t) {
                for (var e in t) o[e] = t[e];
            }), t.setData(o);
        });
    },
    getIndexOfNowCoupon: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.data.couponList, o = -1, n = -1;
        return e[0].some(function(e, n) {
            return e.couponid == t.couponid && (o = n, !0);
        }), t.canBeShare && e[1].some(function(e, o) {
            return e.couponid == t.couponid && (n = o, !0);
        }), {
            firstIndex: o,
            secondIndex: n
        };
    },
    resetStatus: function() {
        this.setData({
            bindStatus: null,
            realNameInfo: null,
            couponList: [ [], [], [], [] ],
            cdkey: null,
            renderList: [],
            couponPage: [ 0, 0, 0, 0 ],
            couponLoading: [ !0, !0, !0, !0 ],
            isRenderPanel: [ !1, !1, !1, !1 ],
            noMorePage: [ !1, !1, !1, !1 ],
            finishLoading: !1,
            isLoading: !1,
            couponError: [],
            couponLengths: {
                useable: 0,
                used: 0,
                expired: 0,
                social: 0
            }
        });
    },
    getPPMS: function() {
        var t = this;
        c.getPPMS().then(function(e) {
            t.setData({
                ppms: e
            });
        }, function(t) {
            console.log(t);
        });
    },
    getData: function() {
        var t = this;
        this.loadAllCoupon();
        var e = this.queryBindStatus(521392392), o = this.verifyAuthUser();
        h.all([ e, o ]).then(function(e) {
            var o = a(e, 2), n = o[0], i = o[1];
            t.judgeShareBtnStatus(n, i);
        }).catch(function(e) {
            t.judgeShareBtnStatus({
                state: 4
            }, {
                status: 2
            });
        });
    },
    onShow: function() {
        var t = l.isCouponListNeedRefresh;
        void 0 !== t && t && (this.resetStatus(), this.getData(), delete l.isCouponListNeedRefresh);
    },
    onLoad: function() {
        this.getPPMS(), this.getData();
    },
    onShareAppMessage: function(t) {
        var e = this, o = t.from, n = t.target, a = {
            title: (0, u.getRandomItem)(u.SHARE_TEXT),
            imageUrl: "https://img11.360buyimg.com/jdphoto/s420x336_jfs/t18970/154/342137297/87057/bdbc780f/5a6ddd2aN6a6ba0a7.png",
            path: "/pages/coupon/index"
        }, s = n.dataset, r = s.tabIndex, d = s.couponIdx, h = this.data, l = h.couponList, g = h.cdkey, p = l[r][d];
        return p.cdkey = g, "button" == o ? (i.default.addPtag("7211.6.19"), a.path = "/pages/my_pages/coupon_share/coupon_share?couponid=" + p.couponid + "&cdkey=" + p.cdkey, 
        a.success = function() {
            i.default.addPtag("7211.6.24"), c.createShareUrl(p).then(function(t) {
                i.default.addPtag("7211.6.25"), e.toast.show({
                    icon: e.toast.ICON.SUCCESS,
                    content: "赠送成功，可在我的优惠券-赠送转让栏查看",
                    duration: 3e3
                });
                var o = e;
                setTimeout(function() {
                    o.resetStatus(), o.getData();
                }, 3e3), e.setData({
                    isLoading: !1
                });
            }).catch(function(t) {
                e.handleCreateCouponShare(t, p);
            });
        }, a.fail = function() {
            i.default.addPtag("7211.6.23");
        }, console.log("share path=========================", a.path), a) : (console.log("share path=========================", a.path), 
        a);
    }
});