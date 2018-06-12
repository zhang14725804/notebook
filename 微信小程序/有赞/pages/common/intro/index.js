!function(e) {
    function c(i) {
        if (t[i]) return t[i].exports;
        var n = global.installedModules[i] = t[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(n.exports, n, n.exports, c), n.l = !0, n.exports;
    }
    e = Object.assign(require("../../../commons.js").modules, e);
    var t = {};
    t = global.installedModules = global.installedModules || {}, c.m = e, c.c = t, c.d = function(e, t, i) {
        c.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: i
        });
    }, c.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, c.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return c.d(t, "a", t), t;
    }, c.o = function(e, c) {
        return Object.prototype.hasOwnProperty.call(e, c);
    }, c.p = "", c(c.s = 239);
}({
    239: function(e, c, t) {
        var i;
        (0, ((i = t(0)) && i.__esModule ? i : {
            default: i
        }).default)({
            data: {
                wxapps: [ {
                    title: "微商城小程序",
                    imageUrl: "https://img.yzcdn.cn/public_files/2017/06/15/aa26b09280d8ea8d3b03fcd9eac4a2dc.png",
                    feature0: "店铺展示",
                    feature1: "自定义模版",
                    feature2: "下单购买",
                    feature3: "优惠促销",
                    feature4: "订单查询",
                    feature5: "售后退款"
                }, {
                    title: "零售小程序",
                    imageUrl: "https://img.yzcdn.cn/public_files/2017/06/15/f5bb328138d90a8df7b3f5836c8749f6.png",
                    feature0: "网店展示",
                    feature1: "商品销售",
                    feature2: "订单查询",
                    feature3: "互动营销",
                    feature4: "粉丝管理",
                    feature5: "售后退款"
                }, {
                    title: "餐饮小程序",
                    imageUrl: "https://img.yzcdn.cn/public_files/2017/06/15/3e9ae6970da8caae55a8b04084f19958.png",
                    feature0: "网店展示",
                    feature1: "在线点餐",
                    feature2: "自定义配送区域",
                    feature3: "第三方配送",
                    feature4: "支持活动促销",
                    feature5: "优惠券、满就减"
                }, {
                    title: "美业小程序",
                    imageUrl: "https://img.yzcdn.cn/public_files/2017/06/15/1f8ebc2b2f1fc9a676bd273191ccdc2c.png",
                    feature0: "线上店铺",
                    feature1: "在线预约",
                    feature2: "服务管理",
                    feature3: "会员管理",
                    feature4: "网络推广",
                    feature5: "数据分析"
                } ],
                miniapp_intros: [ {
                    image: "https://img.yzcdn.cn/public_files/2017/06/15/e5d7859f31d26ffea640055156969eaa.png",
                    title: "附近的小程序"
                }, {
                    image: "https://img.yzcdn.cn/public_files/2017/06/15/7a965614dafc310dbd5ed6bfcc007b1b.png",
                    title: "线下扫码"
                }, {
                    image: "https://img.yzcdn.cn/public_files/2017/06/15/43f294b583cca8225c129c222feb75c1.png",
                    title: "带参数二维码引流"
                }, {
                    image: "https://img.yzcdn.cn/public_files/2017/06/15/6a4f69abb579c48fe82d6d8c4ffe9356.png",
                    title: "我浏览过的小程序"
                }, {
                    image: "https://img.yzcdn.cn/public_files/2017/06/15/d5a26b4397684a8b61b7584c84c29b4c.png",
                    title: "在微信里直接搜索小程序"
                }, {
                    image: "https://img.yzcdn.cn/public_files/2017/06/15/1d0746c59f673cb58c5cc99329b9ddb6.png",
                    title: "分享到微信群"
                }, {
                    image: "https://img.yzcdn.cn/public_files/2017/06/15/dd5cd0d73561cbcbd0b1c49173019758.png",
                    title: "把小程序推荐给好友"
                }, {
                    image: "https://img.yzcdn.cn/public_files/2017/06/15/2952c72ab94e7246e2c34f1dea53684d.png",
                    title: "关联商家已有公众号"
                }, {
                    image: "https://img.yzcdn.cn/public_files/2017/06/15/b72d1cc92777f38e87eb27a260885161.png",
                    title: "在微信推文中插入小程序"
                }, {
                    image: "https://img.yzcdn.cn/public_files/2017/06/15/a5fb3482e6e6610ab7c2bbbdabb9aa89.png",
                    title: "支持消息模板"
                } ],
                flow_names: [ "注册微信小程序，申请微信支付", "把小程序一键授权给有赞", "填写商户信息，提交审核", "审核通过，小程序上线" ],
                shop_images: [ "https://img.yzcdn.cn/public_files/2017/06/15/3e39c9bc29aed1c376a14d6036d4d177.png", "https://img.yzcdn.cn/public_files/2017/06/15/1f812223bc99f1f6fad8085d88023510.png", "https://img.yzcdn.cn/public_files/2017/06/15/c32ddd541b3dbfe3ddf16c50415aaf55.png", "https://img.yzcdn.cn/public_files/2017/06/15/807d55ad1d8ee280f7937e44b8835d13.png", "https://img.yzcdn.cn/public_files/2017/06/15/c3c4228f686be5e7fa2d8f92d912b61a.png", "https://img.yzcdn.cn/public_files/2017/06/15/282b9d6be0662cb4054c93cf47c5b209.png", "https://img.yzcdn.cn/public_files/2017/06/15/e09723a49b09f8fc6e75b188de5f76f5.png", "https://img.yzcdn.cn/public_files/2017/06/15/48462a6f15dc2a44539eb71f510a34c0.png", "https://img.yzcdn.cn/public_files/2017/06/15/2bc91e0e0c142704f7bf4fc831530175.png" ]
            },
            onLoad: function(e) {},
            onShareAppMessage: function() {},
            call: function() {
                wx.makePhoneCall({
                    phoneNumber: "0571-85225188"
                });
            }
        });
    }
});