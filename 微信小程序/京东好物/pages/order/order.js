function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../components/toast/toast.js")), a = require("../../utils/util.js"), r = require("../../utils/MPay.js"), o = require("../../utils/keplerReport.js").init(), i = require("../../utils/message_push.js"), n = getApp();

Page({
    data: {
        homedir: "/kwxhome",
        screenHeight: 0,
        screenWidth: 0,
        modalHidden: !0,
        scrollTop: "",
        toTopDisplay: "none",
        orderList: [],
        pageNum: 1,
        pageSize: 20,
        loadnone: !0,
        returnpage: "/pages/order/order",
        noMore: !1,
        checkLoginFlag: !1,
        lastOptionTime: 0,
        tab: {
            list: [ {
                id: "all",
                title: "全部",
                typeName: "newUserAllOrderList"
            }, {
                id: "topay",
                title: "待付款",
                typeName: "wait4Payment"
            }, {
                id: "receive",
                title: "待收货",
                typeName: "wait4Delivery"
            }, {
                id: "sign",
                title: "已完成",
                typeName: "userCompletedOrderList"
            } ],
            selectedId: "all"
        },
        noOrderItem: {
            msg: "您还没有相关订单"
        },
        firstHasData: !0,
        functionId: "newUserAllOrderList",
        loadMoreSucces: !0
    },
    loginModalShow: function() {
        a.globalLoginShow(this);
    },
    onLoad: function(e) {
        var t = this;
        o.set({
            urlParam: e,
            title: "订单列表",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        });
        var r = this;
        wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 8e3
        }), r.setData({
            pageNum: 1,
            orderList: [],
            loadnone: !0,
            noMore: !1
        }), a.request({
            url: "" + getApp().globalRequestUrl + r.data.homedir + "/newAllOrders/newAllOrders.json?page=" + r.data.pageNum + "&pageSize=" + r.data.pageSize,
            success: function(e) {
                t.checkLogin(e) && (e.orderList.length <= 0 ? t.setData({
                    firstHasData: !1
                }) : t.setData({
                    firstHasData: !0
                }), t.toViewPage(e));
            },
            complete: function() {
                t.setData({
                    loadnone: !0
                });
            },
            fail: function(e) {
                a.reportErr(encodeURIComponent("订单列表页初始化数据请求失败，具体信息：") + e.errMsg);
            }
        }), wx.getSystemInfo({
            success: function(e) {
                r.setData({
                    screenHeight: e.windowHeight,
                    screenWidth: e.windowWidth
                });
            }
        });
    },
    onShow: function() {
        var e = this;
        if ("wait4Payment" == this.data.functionId || "wait4Delivery" == this.data.functionId) {
            this.setData({
                pageNum: 1
            });
            var t = "" + n.globalRequestUrl + this.data.homedir + "/newAllOrders/newAllOrders.json?functionId=" + this.data.functionId + "&page=" + this.data.pageNum + "&pageSize=" + this.data.pageSize;
            this.onceGetOrderData(t);
        } else wx.getStorage({
            key: "order_detai_updated",
            success: function(t) {
                e.updateOrderList(t.data.updatedOrder), wx.removeStorageSync("order_detai_updated");
            }
        });
        o.pv();
    },
    switchOrder: function(t) {
        var a, r = t.target.dataset.itemId, o = t.target.dataset.type;
        this.setData((a = {
            loadnone: !1,
            pageNum: 1
        }, e(a, "tab.selectedId", r), e(a, "functionId", o), e(a, "scrollTop", .001 * Math.random()), 
        a));
        var i = "" + n.globalRequestUrl + this.data.homedir + "/newAllOrders/newAllOrders.json?functionId=" + o + "&page=" + this.data.pageNum + "&pageSize=" + this.data.pageSize;
        this.onceGetOrderData(i);
    },
    onceGetOrderData: function(e) {
        var t = this;
        a.request({
            url: e,
            success: function(e) {
                e.orderList.length <= 0 ? t.setData({
                    firstHasData: !1,
                    noMore: !1
                }) : t.setData({
                    firstHasData: !0,
                    orderList: e.orderList,
                    home_orderdetail_confirm618: e.home_orderdetail_confirm618,
                    noMore: !1
                });
            },
            complete: function() {
                t.setData({
                    loadnone: !0
                });
            },
            fail: function(e) {
                a.reportErr(encodeURIComponent("订单列表页切换tab" + t.data.functionId + "数据请求request失败，具体信息：") + e.errMsg);
            }
        });
    },
    ForReachBottom: function() {
        var e = this;
        0 == e.data.noMore && e.setData({
            loadnone: !1
        }), e.setData({
            pageNum: e.data.pageNum + 1
        }), this.data.loadMoreSucces && (a.request({
            url: n.globalRequestUrl + e.data.homedir + "/newAllOrders/newAllOrders.json?functionId=" + e.data.functionId + "&page=" + e.data.pageNum + "&pageSize=" + e.data.pageSize,
            success: e.toViewPage.bind(e),
            complete: function() {
                e.setData({
                    loadnone: !0,
                    loadMoreSucces: !0
                });
            },
            fail: function(t) {
                a.reportErr(encodeURIComponent("订单列表页" + e.data.functionId + "分页数据第" + e.data.pageNum + "页请求失败，具体信息：") + t.errMsg);
            }
        }), this.setData({
            loadMoreSucces: !1
        }));
    },
    scroll: function(e) {
        e.detail.scrollTop > this.data.screenHeight ? this.setData({
            toTopDisplay: "block"
        }) : this.setData({
            toTopDisplay: "none"
        });
    },
    goPay: function(e) {
        o.click({
            eid: "Morder_Allorders_Pay",
            event: e
        });
        var t = this.data.lastOptionTime;
        if (0 == t) this.setData({
            lastOptionTime: new Date().getTime()
        }); else {
            if (new Date().getTime() - t < 5e3) return !1;
            this.setData({
                lastOptionTime: 0
            });
        }
        var a = e.detail.formId;
        r.gotopay({
            orderId: e.currentTarget.dataset.orderid,
            orderType: e.currentTarget.dataset.ordertype,
            orderTypeCode: e.currentTarget.dataset.ordertypecode,
            factPrice: e.currentTarget.dataset.factprice,
            source: "order",
            formId: a
        });
    },
    toTopTap: function(e) {
        this.setData({
            toTopDisplay: "none",
            scrollTop: .001 * Math.random()
        });
    },
    checkLogin: function(e) {
        return "999" != e.code || (this.loginModalShow(), !1);
    },
    toViewPage: function(e) {
        var t = this;
        if (null != e) if (e.orderList.length <= 0) this.data.firstHasData ? this.data.noMore = !0 : this.data.noMore = !1, 
        t.setData({
            noMore: t.data.noMore,
            home_orderdetail_confirm618: e.home_orderdetail_confirm618
        }); else {
            var a = this.data.orderList.concat(e.orderList);
            t.setData({
                noMore: !1,
                orderList: a,
                home_orderdetail_confirm618: e.home_orderdetail_confirm618
            });
        }
        wx.hideToast();
    },
    jump2orderDetail: function(e) {
        var t = this.data.lastOptionTime;
        if (0 == t) this.setData({
            lastOptionTime: new Date().getTime()
        }); else {
            if (new Date().getTime() - t < 5e3) return !1;
            this.setData({
                lastOptionTime: 0
            });
        }
        var a = e.currentTarget.dataset.url;
        o.click({
            eid: "Morder_Allorders_Detailed",
            elevel: "",
            eparam: "",
            pname: "",
            pparam: "",
            target: a,
            event: e
        });
        var r = a && a.split("?")[1];
        wx.navigateTo({
            url: "../orderDetail/orderDetail?" + r
        });
    },
    jump2orderTrack: function(e) {
        var t = this.data.lastOptionTime;
        if (0 == t) this.setData({
            lastOptionTime: new Date().getTime()
        }); else {
            if (new Date().getTime() - t < 5e3) return !1;
            this.setData({
                lastOptionTime: 0
            });
        }
        var a = e.currentTarget.dataset.url;
        o.click({
            eid: "Morder_Allorders_Check",
            elevel: "",
            eparam: "",
            pname: "",
            pparam: "",
            target: a,
            event: e
        }), wx.removeStorageSync("order_track_jump_url"), wx.setStorage({
            key: "order_track_jump_url",
            data: {
                trackUrl: a
            },
            fail: function() {
                console.log("set order_track_jump_url error in order module");
            },
            success: function() {
                wx.navigateTo({
                    url: "../orderTrack/orderTrack"
                });
            }
        });
    },
    updateOrderList: function(e) {
        e.orderId;
        var t = this.data.orderList.map(function(t) {
            return t.orderId == e.orderId && (t.home_orderdetail_confirm618 = e.home_orderdetail_confirm618, 
            t.orderStatusShow = e.orderStatusShow, t.message = e.message, t.buttons = e.buttons, 
            t.isOtcSelfOrder = e.isOtcSelfOrder, t.isPreSaleOrder = e.isPreSaleOrder, t.internationalType = e.internationalType, 
            t.orderType = e.orderType, t.payTypeCode = e.payTypeCode), t;
        });
        this.setData({
            orderList: t
        });
    },
    confirmGoods: function(e) {
        var r = this, s = e.currentTarget.dataset.orderid, d = getApp().globalRequestUrl + r.data.homedir + "/user/confirmGoods.json?orderId=" + s;
        wx.showModal({
            content: "是否确定已收到货品？",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确认",
            confirmColor: "#f23030",
            success: function(o) {
                o.confirm && a.request({
                    url: d,
                    method: "GET",
                    success: function(a) {
                        if ("true" == a.flag) {
                            i.messagePush({
                                formId: e.detail.formId,
                                times: 1,
                                type: 30003
                            });
                            var o = n.globalRequestUrl + r.data.homedir + "/newAllOrders/newAllOrders.json?functionId=" + r.data.functionId + "&page=" + r.data.pageNum + "&pageSize=" + r.data.pageSize;
                            r.onceGetOrderData(o), r.setData({
                                scrollTop: .001 * Math.random()
                            });
                        } else t.default.show({
                            icon: t.default.icon.error,
                            message: "无法完成收货，请稍后重试。",
                            pageObj: r
                        });
                    },
                    fail: function(e) {
                        a.reportErr(encodeURIComponent("订单列表页confirmGoods操作失败，具体信息：") + e.errMsg);
                    }
                });
            }
        }), o.click({
            eid: "WOrder_ListConfirmReceipt",
            elevel: "",
            eparam: "",
            pname: "",
            pparam: "",
            target: "",
            event: e
        });
    }
});