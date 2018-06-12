var t = require("./model.js"), e = require("../../../../utils/util.js"), s = getApp();

Component({
    properties: {
        suitList: {
            type: Array,
            value: [],
            observer: function(t, e) {
                console.log("suit suit suit suit suit suit suit list"), console.log(t), console.log(e);
            }
        }
    },
    data: {
        list: t.getData_SuitList()
    },
    methods: {
        bindViewTap: function() {
            wx.navigateTo({
                url: "../logs/logs"
            });
        },
        suitListClick: function(t) {
            console.log("999999999");
            var e = this.data.suitList, s = t.currentTarget.dataset.index, i = t.currentTarget.dataset.item;
            i.open = !i.open, e.splice(s, 1, i), this.setData({
                suitList: e
            });
        },
        tipsClick: function() {
            var t = this.data.list;
            t.otherMap.promRuleOpen = !t.otherMap.promRuleOpen, this.setData({
                list: t
            });
        },
        onMyEvent: function() {
            console.log("page1 test");
        },
        skuClick: function(t) {
            var e = t.currentTarget.dataset.item.wareId;
            wx.navigateTo({
                url: "../product/product?wareId=" + e
            });
        },
        addCard: function(t) {
            console.log("加入购物车");
            var i = t.currentTarget.dataset.item, o = i.rfId;
            console.log(i);
            wx.getStorageSync("sid"), wx.getStorageSync("USER_FLAG_CHECK");
            e.request({
                url: s.globalRequestUrl + "/kwxp/cart/add.json?rfId=" + o,
                success: function(t) {},
                fail: function(t) {}
            });
        }
    }
});