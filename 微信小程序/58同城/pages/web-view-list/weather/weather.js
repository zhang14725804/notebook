var e = getApp();

e.createPage([ {
    methodOptions: {},
    data: {
        pageType: "web-view",
        pageName: "weather",
        dispLocalId: 1,
        thirdKey: ""
    },
    _onLoad: function(t) {
        var a = void 0;
        a = void 0 != t.dispLocalId ? t.dispLocalId : e.storage.getSync("wxCityKey").dispCityId, 
        this.setDataLazy({
            dispLocalId: a
        });
    },
    _onShow: function() {
        var t = setInterval(function() {
            void 0 != e.storage.getSync("wxThirdKey").thirdKey && Date.now() < e.storage.getSync("wxThirdKey").expireTime && (clearInterval(t), 
            this.setDataLazy({
                thirdKey: e.storage.getSync("wxThirdKey").thirdKey
            }));
        }.bind(this), 200);
    }
} ]);