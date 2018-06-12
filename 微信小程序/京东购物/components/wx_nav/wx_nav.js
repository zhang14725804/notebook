new (require("../../bases/component.js"))({
    behaviors: [],
    properties: {
        navlist: {
            type: Array,
            value: [ {
                pagePath: "/pages/index/index",
                text: "首页",
                iconPath: "/assets/images/tabbar_home.png",
                selectedIconPath: "/assets/images/tabbar_home_on.png",
                on: !1,
                tag: 0,
                dot: !1
            }, {
                pagePath: "/pages/cate/cate",
                text: "分类",
                iconPath: "/assets/images/tabbar_cate.png",
                selectedIconPath: "/assets/images/tabbar_cate_on.png",
                on: !1,
                tag: 0,
                dot: !1
            }, {
                pagePath: "/pages/gwq/index",
                text: "购物圈",
                iconPath: "/assets/images/tabbar_circle.png",
                selectedIconPath: "/assets/images/tabbar_circle_on.png",
                on: !1,
                tag: 0,
                dot: !1
            }, {
                pagePath: "/pages/cart/cart/index",
                text: "购物车",
                iconPath: "/assets/images/tabbar_cart.png",
                selectedIconPath: "/assets/images/tabbar_cart_on.png",
                on: !1,
                tag: 0,
                dot: !1
            }, {
                pagePath: "/pages/my/index/index",
                text: "我的",
                selectedIconPath: "/assets/images/tabbar_my_on.png",
                iconPath: "/assets/images/tabbar_my.png",
                on: !1,
                tag: 0,
                dot: !1
            } ]
        }
    },
    data: {},
    attached: function() {},
    methods: {
        gotoPage: function(a) {
            var t = a.currentTarget.dataset.index, e = this.data.navlist;
            e.forEach(function(a) {
                a.on = !1;
            }), e[t].on = !0, this.$goto(e[t].pagePath, {}, "switchTab");
        }
    }
});