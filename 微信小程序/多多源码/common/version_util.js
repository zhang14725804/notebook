function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = e(require("./navigation")), s = e(require("./url_util")), r = e(require("./logger")), o = e(require("./object_util")), t = {
    replacePath: null,
    query: "",
    canOpenTargetPath: function(e) {
        if (!e) return !0;
        for (var a = !1, s = 0; s < this.pages.length; s++) if (this.pages[s].indexOf(e) >= 0) {
            a = !0;
            break;
        }
        if (!a) for (var r = this["package_a/"], o = 0; o < r.length; o++) if (("package_a/" + r[o]).indexOf(e) >= 0) {
            a = !0;
            break;
        }
        if (!a) for (var t = this["package_b/"], i = 0; i < t.length; i++) if (("package_b/" + t[i]).indexOf(e) >= 0) {
            a = !0;
            break;
        }
        return a;
    },
    resolveTargetPath: function(e, a) {
        if (e) {
            this.query = a || "";
            for (var o = e.replace("pages/", "").replace(/package_[a-z][/]/, ""), t = "", i = 0; i < this.pages.length; i++) {
                var _ = this.pages[i];
                if (_.indexOf(o) >= 0) {
                    t = _;
                    break;
                }
            }
            if (!t) for (var p = this["package_a/"], n = 0; n < p.length; n++) {
                var l = p[n];
                if (("package_a/" + l).indexOf(o) >= 0) {
                    t = "package_a/" + l;
                    break;
                }
            }
            if (!t) for (var g = this["package_b/"], c = 0; c < g.length; c++) {
                var d = g[c];
                if (("package_b/" + d).indexOf(o) >= 0) {
                    t = "package_b/" + d;
                    break;
                }
            }
            if (!t) for (var u = this.tabBar, m = 0; m < u.length; m++) {
                var f = u[m];
                if (f.indexOf(o) >= 0) {
                    t = f;
                    break;
                }
            }
            e.indexOf("package_a/answer/answer") >= 0 && (t = "package_b/idiom_guess_home/idiom_guess_home"), 
            this.replacePath = t, this.handle(), r.default.send({
                event_type: "unsupport_page",
                origin_page_path: e,
                resolve_path: this.replacePath || "/pages/page_not_found/page_not_found",
                origin_query: s.default.buildQuery(this.query)
            });
        }
    },
    handle: function() {
        if (this.replacePath) {
            var e = "/" + this.replacePath;
            this.query && (e = e + "?" + s.default.buildQuery(this.query)), a.default.redirectForward(e);
        } else a.default.redirectForward("/pages/page_not_found/page_not_found");
    },
    tryOpenInWebview: function(e) {
        for (var r = e && e.path, t = e && e.query, i = r && r.split("/")[2], _ = !1, p = "", n = a.default.webPages(), l = 0; l < n.length; l++) i === n[l] && (_ = !0, 
        p = n[l]);
        if (_ && p) {
            var g = o.default.assign({
                page_name: p
            }, t);
            a.default.redirectForward("/pages/web/web?" + s.default.buildQuery(g));
        }
    },
    pages: [ "pages/index/index", "pages/new_arrivals/new_arrivals", "pages/classification/classification", "pages/personal/personal", "pages/order_checkout/order_checkout", "pages/addresses/addresses", "pages/group/group", "pages/goods/goods", "pages/search_result/search_result", "pages/catgoods/catgoods", "pages/subject/subject", "pages/subjects/subjects", "pages/spike/spike", "pages/mall_page/mall_page", "pages/money_path/money_path", "pages/refund_money/refund_money", "pages/express_complaint/express_complaint", "pages/fill_return_information/fill_return_information", "pages/negotiate/negotiate", "pages/platform_intervention/platform_intervention", "pages/limited_free/limited_free", "pages/custom_service/custom_service", "pages/custom_service_list/custom_service_list", "pages/self_service/self_service", "pages/choose_orders/choose_orders", "pages/selfMessageProgress_detail/selfMessageProgress_detail", "pages/self_message_progress/self_message_progress", "pages/self_message/self_message", "pages/open_envelope/open_envelope", "pages/web/web", "pages/brand_spike/brand_spike", "pages/help_pay/help_pay", "pages/relative_recommend/relative_recommend", "pages/express_complaint_choose/express_complaint_choose", "pages/activity_entrance/activity_entrance", "pages/order/order", "pages/goods_express/goods_express", "pages/tzfree_list/tzfree_list", "pages/lottery_list/lottery_list", "pages/haitao/haitao", "pages/haitao_spike/haitao_spike", "pages/welfare_coupon/welfare_coupon", "pages/recommended/recommended", "pages/page_not_found/page_not_found" ],
    "package_a/": [ "after_sales/after_sales", "afterSalesStatus_detail/afterSalesStatus_detail", "coupons/coupons", "coupon_newbee/coupon_newbee", "comments/comments", "custom_service/custom_service", "little_pay_detail/little_pay_detail", "goods_comments/goods_comments", "mall_group/mall_group", "answer_pk_main/answer_pk_main", "answer_pk_pass/answer_pk_pass", "answer_pk_battle/answer_pk_battle", "comment_share/comment_share", "orders/orders", "order/order", "goods_express/goods_express", "tzfree_list/tzfree_list", "lottery_list/lottery_list", "mall_authorization/mall_authorization", "mall_certification/mall_certification", "search_result/search_result", "catgoods/catgoods", "relative_recommend/relative_recommend", "mall_page/mall_page", "brand_spike/brand_spike", "mall_search_result/mall_search_result", "open_envelope/open_envelope" ],
    "package_b/": [ "idiom_guess_home/idiom_guess_home", "idiom_guess_game/idiom_guess_game", "idiom_guess_profile/idiom_guess_profile", "customize_greeting_cards/customize_greeting_cards", "commodity_bargain_home/commodity_bargain_home", "commodity_bargain_detail/commodity_bargain_detail", "coupon_activity/coupon_activity", "red_envelope_help/red_envelope_help", "group_red_envelope/group_red_envelope", "group_red_envelope_exchange/group_red_envelope_exchange", "daily_raider/daily_raider", "sales_promotion/sales_promotion", "golden_eggs/golden_eggs" ],
    tabBar: [ "pages/index/index", "pages/recommended/recommended", "pages/classification/classification", "pages/custom_service_list/custom_service_list", "pages/personal/personal" ]
};

exports.default = t;