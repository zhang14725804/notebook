require("/model.js");

Page({
    data: {
        shopCategories: []
    },
    onLoad: function(e) {
        this.setData({
            shopCategories: JSON.parse(e.shopCategories) || []
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    clickAllgood: function() {
        wx.navigateTo({
            url: "/pages/shopSearch/shopSearch"
        });
    },
    clickSeeAll: function(e) {
        var t = e.currentTarget.dataset.cateid;
        wx.navigateTo({
            url: "/pages/shopSearch/shopSearch?cateId=" + t
        });
    },
    clickBar: function(e) {
        var t = this.data.shopCategories, a = e.currentTarget.dataset.index, o = e.currentTarget.dataset.item;
        o.subCategories && o.subCategories.length > 0 ? (o.open = !o.open, t.splice(a, 1, o), 
        console.log(t), this.setData({
            shopCategories: t
        })) : wx.navigateTo({
            url: "/pages/shopSearch/shopSearch?cateId=" + o.id
        });
    },
    clickItem: function(e) {
        var t = e.currentTarget.dataset.item.id;
        e.currentTarget.dataset.item.shopId, e.currentTarget.dataset.item.title;
        wx.navigateTo({
            url: "/pages/shopSearch/shopSearch?cateId=" + t
        });
    }
});