function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    var t = e.split("?"), r = "";
    t.length > 1 && (r = t[1]);
    var s = i.default.parseUrlQueryStr(r), o = t[0] + "?" + i.default.buildQuery(n.default.assign({}, s, {}));
    return a.default.removePageInfo(o.slice(1)), o;
}

function r(e) {
    for (var t = 0; t < c.length; t++) if (e.indexOf(c[t]) >= 0) return !0;
    for (var r = [ "goods", "order", "group", "selfMessageProgress_detail" ], a = 0; a < r.length; a++) if (o.default.isLastPageService && e.indexOf(r[a]) >= 0) return o.default.isLastPageService = !1, 
    !0;
    return !1;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = e(require("./page_util")), i = e(require("./url_util")), n = e(require("./object_util")), s = e(require("./util")), o = e(require("../storage/ram_manager")), u = e(require("./system_info")), l = 5, c = [ "/addresses" ], f = [ "pages/index/index", "pages/recommended/recommended", "pages/classification/classification", "pages/custom_service_list/custom_service_list", "pages/personal/personal" ], d = [ "haitao", "coupon_activity", "advice_complete", "advice_content", "after_sales", "order_item", "after_sales_status_detail", "comments", "common_qa", "coupon_usage", "express_complaint", "express_complaint_choose", "feedback", "fill_return_information", "footprint", "goods_express", "haitao_spike", "like_good_item", "like_mall_item", "likes", "money_path", "my_group_list", "negotiate", "platform_intervention", "qa_detail", "refund_money", "reward_user_comments", "setup", "mall_authorization", "mall_certification", "mall_group" ], _ = {
    webPages: function() {
        return d;
    },
    route: function(e, a, c) {
        if (a = a || "forward", c = c || {}, "back" == a || e || (e = "/pages/index/index", 
        a = "switchTab"), e) {
            var _ = e.split("?")[0];
            0 === _.indexOf("/") && (_ = _.slice(1)), f.indexOf(_) >= 0 && (a = "switchTab");
        }
        if ("switchTab" !== a && "back" !== a && (e = t(e)), "forward" === a) {
            var g = getCurrentPages().length;
            u.default.getSDKVersionInt() >= 120 && (l = 10), g >= (r(e) ? l : l - 1) && (a = "redirect");
        }
        var p = e;
        if (e && e.indexOf("?") >= 0 && (p = e.split("?")[0] || ""), "forward" === a || "redirect" === a) {
            if (!this.canContinue(e)) return;
            o.default.inTransitionPage = p, o.default.transitionStartTime = Date.now();
        }
        switch (a) {
          case "forward":
            for (var m = !1, v = "", h = p.split("/")[2], w = 0; w < d.length; w++) h === d[w] && (m = !0, 
            v = d[w]);
            if (m && v) {
                var x = getCurrentPages(), b = x[x.length - 1];
                s.default.toWeb(n.default.assign({
                    page_name: v
                }, i.default.parseUrlQueryStr(e.split("?")[1] || "")), b);
                break;
            }
            return s.default.promisifyAPI(wx.navigateTo)({
                url: e
            });

          case "redirect":
            return s.default.promisifyAPI(wx.redirectTo)({
                url: e
            });

          case "switchTab":
            return s.default.promisifyAPI(wx.switchTab)({
                url: e
            });

          case "back":
            var P = c.backNum || 1;
            setTimeout(function() {
                wx.navigateBack({
                    delta: P
                });
            }, 300);
        }
    },
    forward: function(e) {
        this.route(e, "forward");
    },
    redirectForward: function(e) {
        this.route(e, "redirect");
    },
    back: function(e) {
        setTimeout(function() {
            wx.navigateBack({
                delta: e || 1
            });
        }, 300);
    },
    canContinue: function(e) {
        var t = e.split("?")[0] || "";
        return !t || t != o.default.inTransitionPage;
    },
    toIndexPage: function() {
        this.route("/pages/index/index", "switchTab");
    }
};

exports.default = _;