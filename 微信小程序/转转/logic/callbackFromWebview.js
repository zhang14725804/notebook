function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function postSuccessCallback(e, t) {
    execInteractive.call(this, e, "postSuccess", t);
}

function execInteractive(e, t, a) {
    var r = this, s = {};
    if (e = e || this.options, e.__callbackObj) try {
        s = JSON.parse(decodeURIComponent(e.__callbackObj));
    } catch (t) {
        s = JSON.parse(decodeURIComponent(decodeURIComponent(e.__callbackObj)));
    }
    var o = s[t];
    if (o) for (var i in o) switch (i) {
      case "request":
        this.$httpWithLogin({
            url: o.request
        });
        break;

      case "postactivity":
        var c = getCurrentPages();
        if (c.length > 1) {
            var n = c[c.length - 2];
            n.route.indexOf("webview/webview") > -1 && _routeParams2.default.setBackFromData({
                refresh: !0
            }, "pages/post/post");
        }
        this.$log("PUBLISHSUCCESS", "NEWPEOPLE"), this.$httpWithLogin({
            url: o.postactivity + "&infoId=" + a.infoId + "&infoid=" + a.infoId
        }).then(function(e) {
            0 == e.respCode ? r.$toast({
                title: "很遗憾，你发布的商品不符合活动条件，只有图片张大于2，描述大于30字，描述真实有效商品才能享受本次奖励。",
                type: "fail",
                duration: 6e3
            }) : e.errMsg && r.$toast({
                title: e.errMsg,
                type: "fail",
                duration: 4e3
            });
        });
    }
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.postSuccessCallback = postSuccessCallback;

var _routeParams = require("./../store/routeParams.js"), _routeParams2 = _interopRequireDefault(_routeParams);