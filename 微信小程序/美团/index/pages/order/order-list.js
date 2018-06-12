var t, e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, a = require("../../../utils/cat"), o = require("../../../config.js"), i = require("../../../utils/lx.js"), r = require("../../../utils/util.js"), n = getApp(), s = {
    ptDataState: {
        end: !1,
        lockFlag: !1,
        limit: 10,
        offset: 0,
        platformid: 6,
        statusFilter: 0,
        version: 0
    },
    data: {
        showList: !1,
        sysInfo: n.globalData.sysInfo,
        orderList: []
    },
    getOrderListParams: function() {
        var t = {
            all: 0,
            waitPay: 1,
            waitUse: 2,
            waitRete: 3,
            refund: 4
        }[arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "all"];
        return {
            userid: n.globalData.userId,
            token: n.globalData.token,
            offset: this.ptDataState.offset,
            limit: this.ptDataState.limit,
            platformid: this.ptDataState.platformid,
            statusFilter: t || 0,
            version: this.ptDataState.version
        };
    },
    moreOrders: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "all";
        if (!this.ptDataState.end && !this.ptDataState.lockFlag) {
            this.ptDataState.lockFlag = !0, n.showLoading();
            var e = this.getOrderListParams(t);
            n.fetch(o.orderListApi, e, function() {
                wx.showNavigationBarLoading();
            }, function(t) {
                var e = this;
                if (t && t.data && t.data.error) n.showErrTip("订单列表读取失败"); else if (t && t.data && t.data.data && t.data.data.orders) {
                    this.processingMoreDataState(a), this.ptDataState.offset += this.ptDataState.limit;
                    var a = t.data.data.orders;
                    a.forEach(function(t) {
                        t.dealpic = r.formatImgURI(t.dealpic), t.orderDetail = e.formatOrderDetail(t.orderDetail, t.partnerid, t.orderid);
                    }), this.setData({
                        orderList: this.data.orderList.concat(a)
                    }, function() {
                        e.ptDataState.lockFlag = !1;
                    });
                }
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh(), n.hideLoading();
            }.bind(this), function(t) {
                n.hideLoading(), n.showErrTip("订单列表读取失败"), wx.stopPullDownRefresh();
            });
        }
    },
    processingMoreDataState: function(t) {
        t && t.length < this.ptDataState.limit && (this.ptDataState.end = !0);
    },
    onReady: function() {
        wx.setNavigationBarTitle({
            title: "订单列表"
        });
    },
    onPullDownRefresh: function() {
        var t = this;
        n.login(function() {
            t.setData({
                orderList: []
            }), t.ptDataState.offset = 0, t.ptDataState.end = !1, t.ptDataState.lockFlag = !1, 
            t.moreOrders();
        });
    },
    onLoad: function() {
        n._sLoginProm || n.loginSdk.destroySession(), n.showLoading();
    },
    gotoLogin: function() {
        wx.switchTab({
            url: "/index/pages/mine/mine"
        }), n.globalData.redirectUrl = "/index/pages/order/order-list", n.globalData.suppressLogin = !0;
    },
    onShow: function() {
        var e = this;
        t = new Date() - 0, n.lxPvReport(r.getCid());
        var a = n.loginSdk.authState.session, o = n.loginSdk.SessionState;
        if (a && e.tryLogin) switch (a.state) {
          case o.BINDING:
            return n._sLoginProm || n.loginSdk.destroySession(), void e.gotoLogin();

          case o.AUTH:
          default:
            n._sLoginProm || n.loginSdk.destroySession();
        } else e.tryLogin = !0, n.login(function() {
            e.setData({
                showList: !0
            }), e.moreOrders();
        }, function() {
            e.gotoLogin();
        });
    },
    onHide: function() {
        i.pageDisappear({
            duration: new Date() - t
        });
    },
    formatOrderDetail: function(t) {
        var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "", i = "";
        if (t) try {
            i = decodeURIComponent(t.replace("imeituan://www.meituan.com/web?url=", ""));
        } catch (t) {
            console.error(t);
        }
        return i = i || function(t, a) {
            var o = {
                1: "/mt/pages/order/order-detail?orderid=${orderId}",
                2: "",
                3: "",
                30: "/mt/pages/order/order-detail-daozong?orderid=${orderId}"
            }[t];
            if (!o || !a || "object" !== (void 0 === a ? "undefined" : e(a))) return "";
            for (var i in a) o = o.replace("${" + i + "}", a[i]);
            return o;
        }(a, {
            orderId: o
        });
    },
    onReachBottom: function() {
        this.moreOrders();
    }
};

(0, a.page)(s);