require("../../netdisk_utils/transform.js");

var e = require("../../netdisk_utils/wxApiToPromise.js"), a = require("../../netdisk_utils/calculate.js"), i = function(a, i) {
    var d = "";
    (0, e.getImageInfo)(a).then(function(e) {
        var a = e.width, o = e.height, r = o / a;
        d = r > 1 && o > 240 ? "width: 100%; height: " + 750 * r + "rpx" : r <= 1 && a > 300 ? "width: " + 600 / r + "rpx; height: 100%; left: " + (750 - 600 / r) / 2 + "rpx" : "width: " + a + "rpx; height: " + o + "rpx; top: " + (600 - o) / 2 + "rpx; left: " + (750 - a) / 2 + "rpx", 
        wx.hideLoading(), -1 === e.height && -1 === e.width ? t(i) : i.setData({
            thumbStyle: d,
            isMediaMore: i.data.isMediaMore,
            mediaType: i.data.mediaType,
            showThumb: i.data.showThumb,
            videoName: i.data.videoName,
            videoSize: i.data.videoSize
        });
    }, function() {
        wx.hideLoading(), t(i);
    });
}, t = function(e) {
    var a = "";
    a = "video" === e.data.mediaType ? "background: url('https://pan.baidu.com/h5-static/mini-program/images/bg_video_default.png') no-repeat center;background-size:100% 600rpx;" : "background: url('https://pan.baidu.com/h5-static/mini-program/images/default_map.png') no-repeat center;background-size:100% 600rpx;", 
    e.setData({
        mediaBgStyle: a,
        isMediaMore: e.data.isMediaMore,
        mediaType: e.data.mediaType,
        videoName: e.data.videoName,
        videoSize: e.data.videoSize
    });
};

module.exports = {
    filterListMedia: function(e) {
        var a = [], i = [];
        return e.map(function(e) {
            3 == +e.category ? a.push(e) : 1 == +e.category && i.push(e);
        }), {
            imgList: a,
            videoList: i
        };
    },
    initSnapShots: function(e, t, d) {
        var o = e.imgList, r = e.videoList;
        if (o.length + r.length > 1 && (t.data.isMediaMore = !0), r.length > 0) {
            t.data.mediaType = "video", t.data.shareType = "video", wx.log.snapshoot.snapshootvideo.send();
            var s = r[0];
            t.data.showThumb = (0, a.getOriginImgUrl)(s.thumbs.url3), t.data.videoName = s.server_filename, 
            t.data.videoSize = s.size;
        } else if (o.length > 0) {
            t.data.mediaType = "image", t.data.shareType = "image", wx.log.snapshoot.snapshootimage.send();
            var n = o[0];
            t.data.showThumb = (0, a.getOriginImgUrl)(n.thumbs.url3);
        }
        i(t.data.showThumb, t);
    }
};