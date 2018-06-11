Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = {
    specialPaths: [ "pages/index/index", "pages/recommended/recommended", "pages/classification/classification", "pages/custom_service_list/custom_service_list", "pages/personal/personal", "pages/activity_entrance/activity_entrance", "pages/subject/subject?subject_id=2742", "package_a/comments/comments", "package_a/coupons/coupons", "package_a/goods_comments/goods_comments", "package_a/answer_pk_main/answer_pk_main", "package_a/answer_pk_pass/answer_pk_pass", "package_a/answer_pk_battle/answer_pk_battle", "package_a/coupon_newbee/coupon_newbee", "package_a/custom_service/custom_service", "package_a/little_pay_detail/little_pay_detail", "package_a/orders/orders", "package_a/order/order", "package_a/tzfree_list/tzfree_list", "package_a/lottery_list/lottery_list", "package_a/search_result/search_result", "package_a/catgoods/catgoods", "package_a/relative_recommend/relative_recommend", "package_a/mall_page/mall_page", "package_a/brand_spike/brand_spike", "package_a/mall_search_result/mall_search_result", "package_a/open_envelope/open_envelope", "package_b/commodity_bargain_detail/commodity_bargain_detail", "package_b/commodity_bargain_home/commodity_bargain_home", "package_b/idiom_guess_home/idiom_guess_home", "package_b/idiom_guess_game/idiom_guess_game", "package_b/coupon_activity/coupon_activity", "package_b/customize_greeting_cards/customize_greeting_cards", "package_b/idiom_guess_profile/idiom_guess_profile", "package_b/idiom_guess_game/idiom_guess_game", "package_b/red_envelope_help/red_envelope_help", "package_b/group_red_envelope/group_red_envelope", "package_b/group_red_envelope_exchange/group_red_envelope_exchange", "package_b/daily_raider/daily_raider", "package_b/sales_promotion/sales_promotion", "package_b/golden_eggs/golden_eggs" ],
    tabbarPaths: [ "pages/index/index", "pages/recommended/recommended", "pages/classification/classification", "pages/custom_service_list/custom_service_list", "pages/personal/personal" ],
    urlMap: null,
    getUrlMap: function() {
        var e = this;
        return this.urlMap || (this.urlMap = {}, this.specialPaths.forEach(function(a) {
            var _ = a.split("/"), s = _[_.length - 1];
            e.urlMap[s] = {
                pageName: s,
                path: a,
                withTabbar: e.tabbarPaths.indexOf(a) >= 0
            };
        })), this.urlMap;
    }
};

exports.default = e;