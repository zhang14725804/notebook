var e = require("./module/login"), o = (require("./module/polyfill"), require("./module/fns"), 
require("./module/boss")()), t = require("./module/globalData"), n = require("./module/message"), l = require("./WechatAppPlayer/index"), r = (require("./module/cache"), 
0);

(0, require("./module/page").A)({
    onLaunch: function(n) {
        n && (this.global.scene = n.scene, 1023 == n.scene && (this.global.ptag = "fromdesktop"), 
        n.scene, t.init(this.global)), e.refreshLogin(function(e, o) {
            console.log("onLaunch:refreshLogin", o);
        }), o.stat("launch"), l.checkState();
    },
    onShow: function(t) {
        var l = "";
        if (t) {
            var i = t.referrerInfo;
            if (i) {
                var s = i.extraData;
                s && (console.log("{App} onShow:extraData:", s), s.tickets && s.tickets.length && (l = "qq", 
                e.setQQSession(s.tickets[0])));
            }
            this.global.scene = t.scene, 1023 == t.scene && (this.global.ptag = "fromdesktop"), 
            t.scene;
        }
        e.refreshLogin(null, null, l), o.stat("show");
        var a = r;
        r = 0, a && new Date() - a > 9e5 && n.emit("App:longSleep"), n.emit("App:Show");
    },
    onHide: function() {
        o.stat("hide"), r = new Date();
    },
    global: {}
});