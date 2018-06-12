(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../../utils/ppdog"), c = a(b), d = require("../../utils/regenerator-runtime"), e = a(d), f = require("./login"), g = require("./util"), h = 3, i = 2, j = !1, k = !1, l = !1, m = 1;
    module.exports = {
        options: {
            data: {},
            message: function() {},
            error: function() {},
            close: function() {}
        },
        getUinSkey: function(a) {
            var b = f.getLoginInfo();
            b.qluin && b.qlskey ? a && a(b.qluin, b.qlskey) : console.log("getUinSkey: no qluin or qlskey");
        },
        createWS: function(a) {
            var b = this;
            k = !1, l ? (l = !0, b.send(a.data)) : wx.connectSocket({
                url: a.url,
                success: function() {
                    console.log("connectSocket success");
                },
                fail: function(a) {
                    console.log(a.errMsg);
                },
                complete: function() {}
            }), wx.onSocketOpen(function() {
                l = !0, b.send(a.data);
            }), wx.onSocketClose(function(c) {
                if (l = !1, !c) return void console.log("onclose: " + c);
                var d = parseInt(c.code || 4005, 10);
                switch (d) {
                  case 1e3:
                  case 1001:
                    break;

                  case 1005:
                    break;

                  case 1006:
                    !0 == j ? j = !1 : b.reconnectWS();
                    break;

                  case 4001:
                    a.close && a.close(c);
                    break;

                  case 4002:
                    var e = JSON.parse(c.reason || {}), f = parseInt(e.next_time || 0, 10) - parseInt(e.current_time || 0, 10);
                    setTimeout(function() {
                        b.reconnectWS();
                    }, 1e3 * f);
                    break;

                  case 4003:
                    b.switchToPull();
                    break;

                  case 4004:
                    var f = 1e3 * (i * Math.random());
                    setTimeout(function() {
                        b.createWS(a);
                    }, f);
                    break;

                  case 4005:
                    break;

                  default:
                    /4\d{3}/.test(d) && a.close && a.close(c);
                }
            }), wx.onSocketError(function(b) {
                l = !1, "function" == typeof a.error && a.error(b);
            }), wx.onSocketMessage(function(c) {
                var d;
                return c && c.data ? (d = JSON.parse(c.data), d && d.command ? void b.processCommand(d) : d && d.type == b.options.data.type && "0" == d.retcode ? void (k = !0) : void (k && a.message && a.message(d))) : void console.log("onmessage：" + c);
            });
        },
        send: function(a) {
            var b = this;
            b.getUinSkey(function(c, d) {
                a.qluin = c, a.skey = d;
                var e = JSON.stringify(a);
                l && (wx.sendSocketMessage({
                    data: e
                }), b.options.data = a);
            });
        },
        reconnectWS: function() {
            var a = this.options;
            m < h && (this.createWS(a), m++);
        },
        processCommand: function(a) {
            var b = this.options, c = this;
            switch (a.command) {
              case "retry_subscribe":
                this.send(b.data);
            }
        },
        init: function(a) {
            var b = a || {}, c = this.options;
            h = 3, i = 2, j = !1, b = g.extend(c, b), this.options = b, this.createWS(b);
        },
        destroy: function() {
            console.warn("[WARN] 为了尽可能的减少WebSocket创建，如非必要请使用#unsubscribe()取消订阅"), wx.closeSocket();
        },
        unsubscirbe: function() {
            var a = this.options;
            j = !0, k = !1, this.send({
                type: "cancel_subscribe",
                scode: a.data.scode
            });
        }
    };
})();