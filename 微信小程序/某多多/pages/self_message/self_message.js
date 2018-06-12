function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = require("../../common/index"), r = e(require("../../configs/api")), a = e(require("../../storage/ram_manager")), s = e(require("../../common/upload_file")), n = e(require("../../libs/co/we-index")), o = e(require("../../libs/regenerator-runtime/runtime")), i = {
    data: {
        commentImgs: [],
        showQuestionsPanel: !1,
        questionsList: [],
        restStringLen: 170,
        rightPhone: !0
    },
    requestServiceMessage: n.default.wrap(o.default.mark(function e(a, s) {
        var n, i;
        return o.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, n = r.default.selfServiceMessage + "?ticket_id=" + s, e.next = 4, 
                t.Request.apiRequest("GET", n);

              case 4:
                if (i = e.sent, a.$hideLoading(), a.setData({
                    enableSubmit: !0
                }), !i.errorCode) {
                    e.next = 10;
                    break;
                }
                return a.$showToast(i.errorMsg), e.abrupt("return");

              case 10:
                i.created_time = t.TimeUtil.formatTime(i.created_at, "yyyy-MM-dd hh:mm:ss"), i.tel_hidden = i.tel.slice(0, 3) + "****" + i.tel.slice(7, 11), 
                a.setData({
                    message: i,
                    tel: i.tel,
                    tel_hidden: i.tel_hidden,
                    type_desc: i.type_desc,
                    type_id: i.type_id,
                    restStringLen: a.data.restStringLen - i.question.length
                }), e.next = 18;
                break;

              case 15:
                e.prev = 15, e.t0 = e.catch(0), console.error(e.t0);

              case 18:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 15 ] ]);
    })),
    requestServiceProblems: n.default.wrap(o.default.mark(function e(a) {
        var s, n;
        return o.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, s = r.default.selfServiceProblems + "?" + a, e.next = 4, t.Request.apiRequest("GET", s);

              case 4:
                return n = e.sent, e.abrupt("return", n);

              case 8:
                e.prev = 8, e.t0 = e.catch(0), console.error(e.t0);

              case 11:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 8 ] ]);
    })),
    inputStringChange: function(e) {
        var t = e.detail.value.length, r = 170 - parseInt(t);
        this.setData({
            restStringLen: r,
            enableSubmit: t > 0
        });
    },
    regPhone: function(e) {
        var t = e.detail.value;
        "" == t || /^1[34578]\d{9}$/.test(t) ? this.setData({
            rightPhone: !0
        }) : this.setData({
            rightPhone: !1
        });
    },
    chooseCommentImg: s.default.chooseCommentImg,
    delCommentImg: s.default.delCommentImg,
    previewImg: function(e) {
        var t = e.currentTarget.dataset.url;
        wx.previewImage({
            current: t,
            urls: [ t ]
        });
    },
    questionType: function() {
        var e = this;
        e.data.questionsList.length > 0 ? e.setData({
            showQuestionsPanel: !0
        }) : (0, n.default)(o.default.mark(function t() {
            var r;
            return o.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.prev = 0, t.next = 3, e.requestServiceProblems(e.param);

                  case 3:
                    r = t.sent, e.setData({
                        questionsList: r.problem_list,
                        showQuestionsPanel: !0
                    }), t.next = 10;
                    break;

                  case 7:
                    t.prev = 7, t.t0 = t.catch(0), console.error(t.t0);

                  case 10:
                  case "end":
                    return t.stop();
                }
            }, t, this, [ [ 0, 7 ] ]);
        }));
    },
    chooseType: function(e) {
        var t = e.currentTarget.dataset;
        if (t) {
            var r = t.index;
            this.setData({
                type_id: this.data.questionsList[r].id,
                type_desc: this.data.questionsList[r].type_desc
            });
        }
        this.closePanel();
    },
    closePanel: function() {
        this.setData({
            showQuestionsPanel: !1
        });
    },
    selfServiceForm: function(e) {
        var a = this, s = a.data.rightPhone, i = e.detail.value;
        if (0 != s) if ("" != i.question) {
            if (i.type_id = parseInt(i.type_id), a.data.commentImgs.length > 0) {
                var u = [];
                a.data.commentImgs.forEach(function(e) {
                    var t = {
                        url: e.url
                    };
                    u.push(t);
                }), i.attach_url = u;
            } else "update" == a.operate && a.data.message.attach_url.length > 0 && (i.attach_url = a.data.message.attach_url);
            "" == i.tel && (i.tel = a.data.tel), "create" == a.operate ? (i.goods_name = a.goods_name, 
            i.mall_id = a.mall_id, i.order_sn = a.order_sn) : i.ticket_id = a.ticket_id, a.$showLoading(), 
            (0, n.default)(o.default.mark(function e() {
                var s, n;
                return o.default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return s = t.DataUtil.formatByPos(r.default.postSelfServiceMessage, a.operate), 
                        e.next = 3, t.Request.apiRequest("POST", s, i);

                      case 3:
                        n = e.sent, a.$hideLoading(), n.error_msg ? a.$showToast(n.error_msg) : a.$showModal({
                            title: "留言提交成功",
                            content: "拼多多会尽快核实，并通过微信公众号“拼多多”或者手机拼多多通知您处理结果，感谢您的支持。",
                            showCancel: !1,
                            confirmText: "知道了",
                            success: function(e) {
                                e.confirm && a.$forward("personal");
                            }
                        });

                      case 6:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            })).catch(function(e) {
                a.$hideLoading(), a.$showToast(e.error_msg);
            });
        } else a.$showToast("请输入"); else a.$showToast("请输入正确的手机号");
    },
    requestOrderInfo: n.default.wrap(o.default.mark(function e(r, a) {
        var s, n;
        return o.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, s = "order/" + a, e.next = 4, t.Request.apiRequest("GET", s);

              case 4:
                return n = e.sent, e.abrupt("return", n);

              case 8:
                e.prev = 8, e.t0 = e.catch(0), console.error(e.t0);

              case 11:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 8 ] ]);
    })),
    preventTouchMove: function() {},
    onLoad: function(e) {
        var r = this;
        if (r.$showLoading(), e = t.UrlUtil.parseQuery(e), "choose_orders" == a.default.referPageName) {
            var s = e.tel, i = e.type_id, u = "";
            u = 46 == i ? "我要退货退款" : 47 == i ? "我要退款" : "我要催发货", r.order_sn = e.order_sn;
            var c = s.slice(0, 3) + "****" + s.slice(7, 11);
            (0, n.default)(o.default.mark(function e() {
                var t;
                return o.default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, r.requestOrderInfo(r, r.order_sn);

                      case 2:
                        t = e.sent, r.goods_name = t.order_goods[0].goods_name, r.mall_id = t.mall_id;

                      case 5:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            })), r.$hideLoading(), r.setData({
                tel: s,
                type_desc: u,
                type_id: i,
                tel_hidden: c,
                enableSubmit: !1
            }), r.param = "group=1", r.operate = "create";
        } else {
            var d = e.ticketId;
            d && (r.ticket_id = d), r.requestServiceMessage(r, d), r.param = "parent_id=0", 
            r.operate = "update";
        }
    }
};

(0, t.PddPage)(i, {
    pageName: "self_message",
    pageSn: 10079
});