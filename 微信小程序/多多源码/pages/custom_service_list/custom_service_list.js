function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, a = require("../../common/index"), s = require("../../common/message"), i = t(require("../../common/wx_socket")), o = require("../../controller/custom_service"), n = (t(require("../../libs/co/we-index")), 
t(require("../../libs/regenerator-runtime/runtime")), t(require("../../common/navigation"))), r = t(require("../../components/bubble/bubble")), l = t(require("../../storage/ram_manager")), c = t(require("../../components/resource_place_config/resource_place_config")), d = t(require("../../common/gotop_util")), u = t(require("../../models/format/grid_item_goods")), h = t(require("../../components/image_map/image_map")), m = t(require("../../common/system_info")), g = {
    1: "SmallMixinPromotion",
    2: "LargeMixinPromotion",
    3: "subejct-scroll",
    99: "image-map"
}, f = {
    mallUid: 0,
    hasMoreContact: !0,
    curContactIndex: 1,
    isInRequest: !1,
    focusViewIndex: 0,
    cacheGoodsList: [],
    listId: "xcx_chat_list_reclist_" + a.DataUtil.getRandomString(6),
    startX: 0,
    startY: 0,
    socketErrorHandler: null,
    unreadMsgCountHandler: null,
    isDeleteAll: !0,
    data: {
        mallId: 465342,
        mallImgUrl: "",
        roleImgUrl: "",
        contactList: [],
        showEmpty: !1,
        showError: !1,
        showAnswerFloat: !1,
        longPressMallIndex: -1,
        touchStartIndex: -1,
        deleteIndex: -1,
        list: [],
        localGroupsMap: {},
        isLoadAll: !1,
        templeName: "gridItemV2",
        size: 20,
        page: 1,
        isAndroid: !0,
        clickEnable: !0
    },
    onLoad: function() {
        this.pvTracking(), this.requestList(!0), "android" !== m.default.getSystemInfoSync().platform && this.setData({
            isAndroid: !1
        });
    },
    reset: function() {
        this.curContactIndex = 1, this.hasMoreContact = !0, this.isInRequest = !1, this.isDeleteAll = !0, 
        this.setData({
            longPressMallIndex: -1,
            touchStartIndex: -1
        }), this.getLatestConversations(this.curContactIndex, 20);
    },
    onShow: function() {
        var t = this;
        this.msgHandler = s.Message.on(s.KEYS.CUSTOM_SERVICE_MESSAGE, function(e) {
            switch (e.response) {
              case "latest_conversations":
                "ok" == e.result && t.processConversations(e);
                break;

              case "mark_delete":
                t.reset();
            }
        }), this.socketErrorHandler = s.Message.on(s.KEYS.RECONNECT_ERROR, function() {
            t.$hideLoading(), t.setData({
                loadingVisibility: !1,
                showError: !0
            });
        }), this.unreadMsgCountHandler = s.Message.on(s.KEYS.UNREAD_MESSAGE_COUNT, function() {
            t.reset();
        }), 0 === this.data.contactList.length && this.$showLoading(), i.default.reset(), 
        i.default.connectToSocket(function() {
            r.default.close(), i.default.getUnreadMsgCount(), t.reset();
        }), l.default.isFromAppOnShow || this.$firstTimeTrackRecord.pv || this.pvTracking(!0), 
        this.resourcePlaceControlFloat || (this.resourcePlaceControlFloat = new c.default({
            page: this,
            ns: "resourcePlaceConfigFloat",
            resourcePlaceKey: "floating_chatlist"
        })), this.resourcePlaceControlBanner || (this.resourcePlaceControlBanner = new c.default({
            page: this,
            ns: "resourcePlaceConfigBanner",
            resourcePlaceKey: "little_banner_chatlist"
        }));
    },
    clear: function() {
        this.timeOut && (clearTimeout(this.timeOut), this.timeOut = null), "function" == typeof this.msgHandler && (this.msgHandler(), 
        this.msgHandler = null), "function" == typeof this.socketErrorHandler && (this.socketErrorHandler(), 
        this.socketErrorHandler = null), "function" == typeof this.unreadMsgCountHandler && (this.unreadMsgCountHandler(), 
        this.unreadMsgCountHandler = null);
    },
    onHide: function() {
        this.timeOut && (clearTimeout(this.timeOut), this.timeOut = null), this.clear();
    },
    onUnload: function() {
        this.clear();
    },
    pvTracking: function(t) {
        var e = {
            op: "pv",
            page_name: "chat_list"
        };
        t && (e.is_back = 1), (0, a.TrackingRecord)(e), this.$firstTimeTrackRecord.pv = !0;
    },
    getLatestConversations: function(t, e) {
        if (this.hasMoreContact && !this.isInRequest) {
            var a = {
                cmd: "latest_conversations",
                page: t,
                size: e,
                status: "unread"
            };
            i.default.sendSocketMessage(a, function() {
                this.isInRequest = !1;
            }), this.isInRequest = !0;
        }
    },
    getMallId: function(t) {
        return t.from.role.indexOf("mall") >= 0 ? t.from.mall_id || t.from.uid : t.to.mall_id || t.to.uid;
    },
    processConversations: function(t) {
        this.isInRequest = !1;
        var a = t.platform_conv || {};
        if (a.need_platform_conv && this.isDeleteAll) {
            t.mall_info_map[606] = a.mall_info;
            var s = {
                content: "如有疑问，您可以点击此处联系客服进行咨询。",
                from: {
                    csid: "智能机器人",
                    mall_id: "606",
                    role: "mall_cs",
                    uid: "606"
                },
                identity: 1,
                is_aut: 1,
                is_rich_text: 1,
                mallName: "智能机器人",
                msg_id: "",
                rich_text: {
                    content: [],
                    template: "text_with_menu_items",
                    version: 1
                },
                status: "read",
                to_csid: "",
                ts: 0,
                type: 0,
                version: 1
            };
            t.conversations.unshift(s);
        }
        if (!t || "object" !== e(t.conversations) || 0 === t.conversations.length) return this.$hideLoading(), 
        this.setData({
            loadingVisibility: !1,
            showError: !1
        }), 1 === this.curContactIndex && this.setData({
            contactList: [],
            showEmpty: !0
        }), void (t && (this.hasMoreContact = t.has_more));
        this.hasMoreContact = t.has_more, this.processList(t), this.curContactIndex += 1;
    },
    processList: function(t) {
        var e = t.conversations, a = t.mall_info_map;
        o.CustomServiceController.cacheMallInfo(a);
        for (var s = new Array(), i = 0; i < e.length; ++i) {
            var n = e[i];
            if (n) {
                var r = this.formatConversation(n), l = a[r.mallId];
                l && (r.mallName = l.mall_name || "", r.mallLogo = l.logo || ""), s.push(r);
            }
        }
        var c = this.data.contactList.concat(s);
        this.$hideLoading(), this.setData({
            showError: !1,
            loadingVisibility: !1,
            contactList: this.isDeleteAll ? s : c,
            showEmpty: 0 === c.length
        }), this.focusViewIndex >= 0 && (this.setData({
            scrollToViewId: "mag" + this.focusViewIndex
        }), this.focusViewIndex = 0);
    },
    getTimeStr: function(t) {
        if (0 === t) return "";
        var e = new Date(1e3 * parseInt(t)), a = new Date(), s = parseInt(a.getTime()) / 1e3, i = a.getDate(), o = e.getDate(), n = Math.abs(parseInt(t) - s), r = function(t) {
            return parseInt(t) < 10 ? "0" + t : t;
        };
        return i == o && n < 86400 ? r(e.getHours()) + ":" + r(e.getMinutes()) : e.getFullYear() % 2e3 + "/" + r(e.getMonth() + 1) + "/" + r(o);
    },
    formatConversation: function(t) {
        var e = {};
        e.mallId = parseInt(this.getMallId(t)), e.content = t.content;
        var a = t.ts;
        return e.type = t.type, e.contentStr = t.content, 0 === t.sub_type || 2 === t.sub_type ? e.contentStr = "[商品信息]" : 1 === t.sub_type ? e.contentStr = "[订单信息]" : 1 === t.type && (e.contentStr = "[图片]"), 
        e.timeStr = this.getTimeStr(a), e.unReadCount = t.unread_count || 0, e.msgId = t.msg_id, 
        e;
    },
    mallClicked: function(t) {
        if (-1 === this.data.deleteIndex && -1 === this.data.longPressMallIndex) {
            var e = t.currentTarget.dataset.mallId, a = "/pages/custom_service/custom_service?mall_id=" + e;
            n.default.forward(a);
            for (var s = 0; s < this.data.contactList.length; ++s) {
                var i = this.data.contactList[s];
                if (i.mallId === e) {
                    i.unReadCount = 0, this.setData({
                        contactList: this.data.contactList
                    });
                    break;
                }
            }
            this.setData({
                touchStartIndex: -1
            });
        } else this.setData({
            deleteIndex: -1
        });
    },
    resetTouchHandler: function() {
        this.touchStartHandler && (clearTimeout(this.touchStartHandler), this.touchStartHandler = null);
    },
    touchStart: function(t) {
        var e = this, s = (t.touches || [])[0] || {};
        this.startX = a.Util.pxToRpx(s.clientX), this.startY = a.Util.pxToRpx(s.clientY), 
        this.data.isAndroid && !this.touchStartHandler && (this.touchStartHandler = setTimeout(function() {
            e.touchStartHandler = null, e.mallLongpress(t);
        }, 350));
    },
    touchMove: function(t) {
        if (this.data.isAndroid) this.resetTouchHandler(); else if (!t.currentTarget.dataset || 606 !== t.currentTarget.dataset.mallId) {
            var e = (t.touches || [])[0] || {}, s = a.Util.pxToRpx(e.clientX), i = a.Util.pxToRpx(e.clientY), o = s - this.startX, n = Math.abs(this.startY - i), r = t.currentTarget.dataset.index;
            this.data.deleteIndex !== r ? n < 50 && o < -150 && this.setData({
                deleteIndex: r
            }) : n < 50 && o > 120 && this.setData({
                deleteIndex: -1
            });
        }
    },
    touchEnd: function(t) {
        if (this.data.isAndroid) this.data.touchStartIndex >= 0 && this.setData({
            touchStartIndex: -1
        }), this.resetTouchHandler(); else {
            var e = t.currentTarget.dataset.index;
            this.data.deleteIndex !== e && this.setData({
                deleteIndex: -1
            });
        }
    },
    mallLongpress: function(t) {
        if ((!t.currentTarget.dataset || 606 !== t.currentTarget.dataset.mallId) && this.data.isAndroid) {
            var e = (t.touches || [])[0] || {}, s = a.Util.pxToRpx(e.clientX), i = a.Util.pxToRpx(e.clientY), o = t.currentTarget.dataset.index;
            this.setData({
                touchStartIndex: o,
                longPressMallIndex: o,
                longPressX: s - 50,
                longPressY: Math.max(0, i - 80)
            });
        }
    },
    deleteItem: function(t) {
        var e = this.data.contactList[t] || {}, a = {
            cmd: "mark_delete",
            conversation: {
                uid: e.mallId.toString(),
                role: "mall_cs",
                msg_id: e.msgId
            }
        };
        i.default.sendSocketMessage(a), this.setData({
            longPressMallIndex: -1,
            deleteIndex: -1
        }), this.focusViewIndex = t < 1 ? 0 : t - 1;
    },
    onDeleteItemClicked: function(t) {
        var e = t.currentTarget.dataset.index;
        this.deleteItem(e);
    },
    onDeleteClicked: function() {
        var t = this.data.longPressMallIndex;
        this.deleteItem(t);
    },
    onDeleteMaskClicked: function() {
        this.setData({
            longPressMallIndex: -1
        });
    },
    goTop: function() {
        this.setData({
            scrollTop: 1
        }), this.setData({
            scrollTop: 0
        }), d.default.goTop(!1);
    },
    scrollToLower: function() {
        this.hasMoreContact && (this.isDeleteAll = !1, this.getLatestConversations(this.curContactIndex, 20));
    },
    onScroll: function(t) {
        if (t) {
            var e = parseInt(t.detail.scrollTop);
            d.default.showGoTopBtn(e, this), t.scrollTop = e, this.quickEntryControl.onPageScroll(t);
        }
        this.data.touchStartIndex >= 0 && this.setData({
            touchStartIndex: -1
        });
    },
    preventMaskTouchMove: function() {
        this.setData({
            longPressMallIndex: -1
        });
    },
    reLoad: function() {
        this.hasMoreContact = !0, this.curContactIndex = 1, this.isInRequest = !1, this.isDeleteAll = !0, 
        this.$showLoading(), this.setData({
            showError: !1,
            loadingVisibility: !0
        });
        var t = this;
        i.default.reset(), i.default.connectToSocket(function() {
            t.getLatestConversations(t.curContactIndex, 20);
        });
    },
    onOfficialClicked: function() {
        this.$forward("custom_service", {
            mall_id: 606,
            refer_page_el_sn: 99494
        }), (0, a.TrackingRecord)({
            op: "click",
            page_el_sn: 99494,
            page_section: "main",
            page_name: "custom_service_list",
            page_element: "custom_service"
        });
    },
    requestList: function(t) {
        var e = this, s = this.data, i = s.page, o = s.size, n = this.listId, r = "api/barrow/query?app_name=new_chat_list&offset=" + i + "&count=" + o + "&list_id=" + n;
        if (!s.isLoadingMore) {
            this.setData({
                isLoadingMore: !0
            }), t && this.$showLoading();
            var l = a.Request.requestDataWithUrl("GET", r, null, !0);
            a.Request.runMainRequestForPage(l, this).then(function(t) {
                e.$hideLoading(), e.setData({
                    isLoadingMore: !1
                });
                var s = a.DataUtil.isArray(t.data) ? t.data : [], r = e.cacheGoodsList;
                s.forEach(function(t) {
                    var e = u.default.formatData(t);
                    e.listId = n, r.push(e);
                }), e.cacheGoodsList = [].concat(r), e.cacheGoodsList = a.DataUtil.objectArrayDuplicateRemove(e.cacheGoodsList, "goodsId", function(t) {
                    return 1 == t.isApp;
                });
                var l = h.default.execMix(null, e.cacheGoodsList, [], g, "gridItemV2");
                e.mixGoodsData = h.default.listPositionAdjust(l);
                var c = t && t.data && t.data.length;
                0 == c ? e.setData({
                    isLoadAll: !0,
                    noOrderText: "没有更多的商品了..."
                }) : c > 0 && c <= o / 2 ? (e.fillGoodsList(), e.setData({
                    page: i + 1
                }), e.requestList()) : (e.fillGoodsList(), e.setData({
                    page: i + 1
                }));
            }, function() {
                e.$hideLoading(), e.setData({
                    showError: !0,
                    isLoadingMore: !1
                });
            });
        }
    },
    fillGoodsList: function() {
        var t = this.mixGoodsData || [], e = this.data.list || [], a = e.length;
        if (t.length > a) {
            var s = t.length - a, i = 20;
            s < 20 && s % 2 != 0 && !this.data.isLoadAll && (i = s - 1), e = t.slice(0, e.length + i), 
            this.setData({
                list: e
            });
            var o = e.slice(a);
            this.$requestLocalGroup(o), this.tryInitImprRect();
        }
    },
    getTrackingParams: function(t, e, a) {
        var s = {
            op: t,
            goods_id: a.goodsId,
            idx: e,
            page_el_sn: 99084,
            page_element: "goods",
            list_id: a.listId
        };
        return a.transData && (a.transData.ad && (s.ad = JSON.stringify(a.transData.ad)), 
        a.transData.p_rec && (s.p_rec = JSON.stringify(a.transData.p_rec)), a.transData.p_search && (s.p_search = JSON.stringify(a.transData.p_search))), 
        s;
    },
    gotoGoodsDetail: function(t) {
        var e = t.currentTarget.dataset, s = e.goodsId, i = a.DataUtil.checkByKey(this.data.list, s, "goodsId"), o = e.itemIndex;
        this.transGoodsData = i.transData || {}, this.transGoodsData.preloadImgUrl = i.imgUrl, 
        this.$forward("goods", Object.assign({
            goods_id: s
        }, i.transData));
        var n = this.getTrackingParams("click", o, i);
        n.page_section = "goods_list", (0, a.TrackingRecord)(n), this.$uploadFormId(t);
    },
    imprItems: function(t) {
        var e = this;
        t.forEach(function(t) {
            var s = e.data.list || [];
            if (t < s.length) {
                var i = s[t] || {}, o = e.getTrackingParams("impr", t, i);
                (0, a.TrackingRecord)(o);
            }
        });
    },
    onReachBottom: function() {
        this.requestList();
    },
    onPageScroll: function(t) {
        var e = this;
        if (t) {
            var a = parseInt(t.scrollTop);
            d.default.showGoTopBtn(a, this), this.updateScrollTop(a);
        }
        this.data.clickEnable && this.setData({
            clickEnable: !1
        }), this.scrollHandler && (clearTimeout(this.scrollHandler), this.scrollHandler = null), 
        this.scrollHandler = setTimeout(function() {
            e.scrollHandler = null, e.setData({
                clickEnable: !0
            });
        }, 300);
    }
};

(0, a.PddPage)(f, {
    pageName: "custom_service_list",
    pageSn: 10051,
    notUseCommonPV: !0
});