Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = {
    listenScreenShot: function(e) {
        e.data.canShowShare && (e.setData({
            shareMainClass: "screen-share-main screen-share-main-show",
            canShowShare: !1
        }), setTimeout(function() {
            e.setData({
                shareMainClass: "screen-share-main screen-share-main-hide",
                canShowShare: !0
            });
        }, 5e3));
    }
};

exports.default = e;