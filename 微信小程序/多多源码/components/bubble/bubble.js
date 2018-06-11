function e(e, s) {
    if (!(e instanceof s)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var s = function() {
    function e(e, s) {
        for (var a = 0; a < s.length; a++) {
            var t = s[a];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(s, a, t) {
        return a && e(s.prototype, a), t && e(s, t), s;
    };
}(), a = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../common/wx_socket")), t = require("../../common/message"), l = require("../../common/index"), i = new (function() {
    function i() {
        e(this, i), this.page = null, this.isSingle = null, this.location = null, this.requestId = null, 
        this.handler = null, this.showHandler = null, this.msgList = [];
        var s = this;
        t.Message.on(t.KEYS.BUBBLE_MESSAGE, function(e) {
            if (!(s.msgList.length >= 10)) {
                if (s.isSingle) {
                    if ("ok" === e.result && e.message_array) for (var a = 0; a < e.message_array.length; ++a) e.message_array[a].group_order_id = "", 
                    s.msgList.push(e.message_array[a]);
                } else if ("ok" === e.result && e.message_array && e.message) for (var t = 0; t < e.message_array.length; ++t) e.message_array[t].group_order_id = e.message.group_order_id, 
                s.msgList.push(e.message_array[t]); else "ok" === e.result && e.message && s.msgList.push(e.message);
                s.handler || s.handleBubbleList();
            }
        });
    }
    return s(i, [ {
        key: "init",
        value: function(e, s, t, l) {
            if (this.page = e, this.isSingle = s, this.location = t, this.requestId = l, e.bubbleIsClosed = !1, 
            e.bubbleLastTime = 0, this.msgList = [], this.hideBubble(), this.regImageOnLoad(e), 
            a.default.reset(), a.default.enableBubble(), s) {
                var i = {
                    cmd: "handshake",
                    location: t,
                    request_id: l,
                    version: 1
                };
                a.default.sendSocketMessage(i);
            } else {
                var n = {
                    cmd: "handshake",
                    location: "pages/index/index",
                    request_id: l,
                    version: 1
                };
                a.default.sendSocketMessage(n);
            }
        }
    }, {
        key: "close",
        value: function() {
            this.msgList = [], this.page && (this.page.bubbleIsClosed = !0, this.page.bubbleLastTime = 0, 
            this.hideBubble()), this.handler && (clearTimeout(this.handler), this.handler = null), 
            this.showHandler && (clearTimeout(this.showHandler), this.showHandler = null), a.default.disableBubble();
        }
    }, {
        key: "hideBubble",
        value: function() {
            this.page.setData({
                "bubble.showBubbleCls": "bubble-hide"
            });
        }
    }, {
        key: "regImageOnLoad",
        value: function() {
            var e = this;
            this.page.bubbleImageOnLoad = function() {
                if (!e.page.pauseBubble) {
                    if (e.handler && clearTimeout(e.handler), !e.page.data.bubble || !e.page.data.bubble.content) return e.handler = null, 
                    void e.handleBubbleList();
                    e.page.setData({
                        "bubble.showBubbleCls": "bubble-show"
                    }), e.handler = setTimeout(function() {
                        e.page.setData({
                            "bubble.showBubbleCls": "bubble-hide"
                        }), e.handler = null, e.handleBubbleList();
                    }, 5e3);
                }
            };
        }
    }, {
        key: "handleBubbleList",
        value: function() {
            var e = this;
            !this.showHandler && this.msgList.length > 0 && (this.showHandler = setTimeout(function() {
                if (e.showHandler = null, 0 !== e.msgList.length) {
                    var s = e.msgList.shift();
                    if (s && e.page && !e.page.bubbleIsClosed) {
                        var a = s.content;
                        s.nickname && (a = s.nickname + a);
                        var t = s.image_url, i = s.group_order_id;
                        e.page.bubbleLastTime = Number(new Date()), e.page.setData({
                            "bubble.content": a,
                            "bubble.img": t,
                            "bubble.groupOrderId": i
                        }), (0, l.TrackingRecord)({
                            op: "impr",
                            event: "page_show",
                            page_element: "bubble"
                        });
                    }
                }
            }, 5e3));
        }
    } ]), i;
}())();

exports.default = i;