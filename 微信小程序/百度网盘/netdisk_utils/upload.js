function e(e, a) {
    var t = new Date(), o = /\.[^.]+$/.exec(e);
    return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + " " + t.getHours() + t.getMinutes() + t.getSeconds() + " " + (a + 1) + o;
}

function a(a, t, o) {
    var n = e(a, o), r = wx.getStorageSync("userInfo").bduss, u = wx.getStorageSync("PANWX");
    return new Promise(function(e, o) {
        wx.uploadFile({
            url: i + "rest/2.0/pcs/file?method=upload&dir=" + encodeURIComponent(t) + "&filename=" + n + "&app_id=250528",
            filePath: a,
            header: {
                Cookie: "BDUSS=" + r + ";PANWX=" + u + ";",
                Host: "inner.pcs.bae.baidu.com",
                "content-type": "application/x-www-form-urlencoded"
            },
            name: "file",
            formData: {},
            success: e,
            fail: o
        });
    });
}

function t(a) {
    return r.globalData.uploadList.map(function(t, o) {
        var i = e(t, o);
        return {
            filename: i,
            filePath: t,
            promise: (0, n.getUploadSign)(a, i)
        };
    });
}

var o = require("./wxRequestApi.js"), n = require("../netdiisk_requestapi/getUploadSign.js"), i = wx.ENV.pcsHost, r = getApp();

module.exports = {
    cloudUpload: function(e) {
        return (0, o.wxReq)("api/filemanager?opera=copy&async=2&ondup=newcopy", {
            filelist: JSON.stringify(e)
        }, "POST");
    },
    checkUploadStatus: function(e) {
        return (0, o.wxReq)("api/taskquery?taskid=" + e, {}, "GET");
    },
    clearUploadList: function(e) {
        r.globalData.uploadList = [], e.setData({
            uploadData: {}
        });
    },
    backToDesPathWithData: function(e) {
        var a = getCurrentPages(), t = a[r.globalData.uploadDesIndex], o = a.length - 1 - r.globalData.uploadDesIndex;
        t.data.uploadData = e, wx.navigateBack({
            delta: o
        });
    },
    getLocalUploadPromiseList: function(e) {
        var t = [];
        return r.globalData.uploadList.forEach(function(o, n) {
            t.push(a(o, e, n));
        }), t;
    },
    getShareLocalUploadPromiseList: function(e) {
        if (!e.includes("<share>")) return [];
        var a = [], o = r.globalData.uploadList.length, n = 0, u = t(e), l = {}, s = wx.getStorageSync("userInfo").bduss, c = wx.getStorageSync("PANWX");
        return new Promise(function(t) {
            u.forEach(function(r) {
                var u = r.filename, p = r.filePath;
                r.promise.then(function(r) {
                    l = new Promise(function(a, t) {
                        if (0 == +r.data.errno) {
                            var o = r.data.uploadsign;
                            wx.uploadFile({
                                url: i + "rest/2.0/pcs/file?method=upload&dir=" + encodeURIComponent(e) + "&filename=" + u + "&upload_sign=" + o + "&app_id=250528",
                                filePath: p,
                                header: {
                                    Cookie: "BDUSS=" + s + ";PANWX=" + c + ";",
                                    Host: "inner.pcs.bae.baidu.com"
                                },
                                name: "file",
                                formData: {},
                                success: a,
                                fail: t
                            });
                        }
                    }), n++, a.push(l), n === o && t(a);
                }, function() {
                    a.push(Promise.reject()), n === o && t(a);
                });
            });
        });
    }
};