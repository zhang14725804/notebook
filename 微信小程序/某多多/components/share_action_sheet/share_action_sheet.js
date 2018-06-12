function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function r(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function o(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, n = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var o = t[r];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, r, o) {
        return r && e(t.prototype, r), o && e(t, o), t;
    };
}(), s = function e(t, r, o) {
    null === t && (t = Function.prototype);
    var a = Object.getOwnPropertyDescriptor(t, r);
    if (void 0 === a) {
        var n = Object.getPrototypeOf(t);
        return null === n ? void 0 : e(n, r, o);
    }
    if ("value" in a) return a.value;
    var s = a.get;
    if (void 0 !== s) return s.call(o);
}, i = e(require("../pdd_action_sheet/pdd_action_sheet")), u = require("../../common/index"), c = (e(require("../../libs/es6-promise.min")), 
e(require("../../libs/co/we-index"))), l = e(require("../../libs/regenerator-runtime/runtime")), p = e(require("../../storage/user_storage.js")), f = e(require("../../configs/api")), h = function(e) {
    function h(e) {
        var o = e.page, a = e.ns, n = e.success, s = e.fail, i = e.complete, u = e.justSave, c = e.goosId;
        t(this, h);
        var l = u ? [ {
            title: "保存到相册"
        } ] : [ {
            title: "分享该商品给好友",
            type: "share"
        }, {
            title: "生成分享卡片到相册"
        } ], p = r(this, (h.__proto__ || Object.getPrototypeOf(h)).call(this, {
            page: o,
            ns: a,
            itemList: l,
            success: n,
            fail: s,
            complete: i
        }));
        return p.goosId = c, p.setCowrap(), p;
    }
    return o(h, i.default), n(h, [ {
        key: "setCowrap",
        value: function() {
            var e = this;
            this.getShareImage = c.default.wrap(l.default.mark(function t() {
                var r, o, n, s, i, c, h, _;
                return l.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return t.prev = 0, r = {
                            share_id: u.DataUtil.getRandomString(),
                            share_channel: "message",
                            share_form: "bi3ZuH",
                            share_result: "success",
                            refer_share_btn: "share_pic",
                            goods_id: e.goodsId
                        }, o = JSON.stringify(r), n = {
                            value: o
                        }, s = p.default.getUserLocalInfo(), i = {
                            user_name: s.nickName,
                            user_avatar: s.avatarUrl,
                            goods_id: e.goosId
                        }, t.next = 8, e.page.$encodeAlias(n);

                      case 8:
                        return "object" !== (void 0 === (c = t.sent) ? "undefined" : a(c)) && (i.__p = c.toString()), 
                        t.next = 12, u.Request.apiRequest("POST", f.default.goodsDetailGenerateCard, i, !1, {
                            forceUseApiGZ: !0
                        });

                      case 12:
                        if (!((h = t.sent).result && h.result.share_pic_url && h.result.share_pic_url.length > 0)) {
                            t.next = 18;
                            break;
                        }
                        return _ = h.result.share_pic_url, t.abrupt("return", _);

                      case 18:
                        e.page.$showToast("图片生成失败");

                      case 19:
                        t.next = 24;
                        break;

                      case 21:
                        t.prev = 21, t.t0 = t.catch(0), e.page.$showToast("图片生成失败");

                      case 24:
                      case "end":
                        return t.stop();
                    }
                }, t, this, [ [ 0, 21 ] ]);
            }));
        }
    }, {
        key: "show",
        value: function(e) {
            this.imageUrl = e, s(h.prototype.__proto__ || Object.getPrototypeOf(h.prototype), "show", this).call(this);
        }
    }, {
        key: "tap",
        value: function(e) {
            e.target.dataset.index == this.data.itemList.length - 1 && this.save(this.imageUrl), 
            s(h.prototype.__proto__ || Object.getPrototypeOf(h.prototype), "tap", this).call(this, e);
        }
    }, {
        key: "save",
        value: function(e) {
            var t = this;
            this.page.$showToast("保存图片中"), (0, c.default)(l.default.mark(function r() {
                var o, a, n;
                return l.default.wrap(function(r) {
                    for (;;) switch (r.prev = r.next) {
                      case 0:
                        return r.prev = 0, e.indexOf("https") < 0 && (e = e.replace("http", "https")), t.setData({
                            loadingVisible: !0
                        }, !0), o = !1, r.next = 6, u.User.authorize("scope.writePhotosAlbum", function() {
                            (0, u.TrackingRecord)({
                                op: "impr",
                                page_section: "auth_prompt",
                                refer_page_element: "save_pic_btn",
                                page_el_sn: 99615
                            }), o = !0;
                        });

                      case 6:
                        if (a = r.sent, o && (0, u.TrackingRecord)({
                            op: "click",
                            page_section: "auth_prompt",
                            page_element: a ? "approve" : "refuse",
                            page_el_sn: a ? 99899 : 99898,
                            refer_page_element: "save_pic_btn"
                        }), !a) {
                            r.next = 21;
                            break;
                        }
                        if (!t.goosId) {
                            r.next = 13;
                            break;
                        }
                        return r.next = 12, t.getShareImage();

                      case 12:
                        e = r.sent;

                      case 13:
                        return r.next = 15, u.Util.downloadFile(e);

                      case 15:
                        return n = r.sent, r.next = 18, u.User.saveImageToPhotosAlbum(n);

                      case 18:
                        t.page.$showToast("保存成功，可在相册中查看"), r.next = 22;
                        break;

                      case 21:
                        u.User.showAuthorizeModelDialog("scope.writePhotosAlbum");

                      case 22:
                        t.setData({
                            loadingVisible: !1
                        }, !0), r.next = 30;
                        break;

                      case 25:
                        r.prev = 25, r.t0 = r.catch(0), console.error(r.t0), t.setData({
                            loadingVisible: !1
                        }, !0), t.page.$showToast("图片保存失败");

                      case 30:
                      case "end":
                        return r.stop();
                    }
                }, r, this, [ [ 0, 25 ] ]);
            }));
        }
    } ]), h;
}();

exports.default = h;