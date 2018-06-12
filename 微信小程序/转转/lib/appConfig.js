Object.defineProperty(exports, "__esModule", {
    value: !0
});

var appConfig = {
    appId: "103",
    pageTypeLegacyCheck: function(e) {
        return [ "pages/index/index", "pages/list/list", "pages/list/more", "pages/list/moreC", "pages/category/category", "pages/detail/detail", "pages/orderdetail/orderdetail", "pages/messages/messages", "pages/mine/mine", "pages/bindphonenumber/bindphonenumber", "pages/chat/chat", "pages/buy/buy", "pages/buy/success", "pages/buy/city", "pages/minesold/minesold", "pages/minebought/minebought", "pages/deliver/deliver", "pages/deliver/deliverCallList", "pages/deliver/selectexpress", "pages/deliver/deliverDetail", "pages/paymenttip/paymenttip", "pages/paymenttip/paymentRefund", "pages/updateprice/updateprice", "pages/userrules/userrules", "pages/comments/comments", "pages/post/post", "pages/post/postcate", "pages/post/postparams", "pages/post/postsuccess", "pages/post/postGuide", "pages/post/threeDayoversell", "pages/iwant/iwant", "pages/irelease/irelease", "pages/group/group", "pages/group/exam", "pages/youpinIntro/youpinIntro", "pages/themeMarket/themeMarket", "pages/minegroup/minegroup", "pages/package/package", "pages/package/redIntroduce", "pages/group/grouplist", "pages/homepage/homepage", "pages/homepage/Friends", "pages/homepage/TAComment", "pages/curtain/curtain", "pages/webview/webview", "pages/sso/sso", "pages/tools/customEntry", "pages/divideredpackage/divideredpackage" ].includes(e) ? {
            hit: !0,
            prefix: "WA"
        } : {
            hit: !1,
            prefix: ""
        };
    },
    pageTypePrefix: function(e, p) {
        var a = appConfig.pageTypeLegacyCheck(e);
        if (a.hit) return a.prefix;
        for (var s = e.split("/"), g = 0; g < s.length - 1; ++g) s[g] === s[g + 1] && (s[g] = "");
        return "pages" === s[0] && (s[0] = ""), s = s.filter(function(e) {
            return !!e;
        }), s = s.slice(0, s.length - 1), "WA-MAIN-" + (s.length > 0 ? s.join("-") + "-" : "");
    }
};

exports.default = appConfig;