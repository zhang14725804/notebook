function CosCloud(t) {
    this.appid = t.appid, this.bucket = t.bucket, this.region = t.region, this.sign_url = t.sign_url, 
    t.getAppSign && (this.getAppSign = t.getAppSign), t.getAppSignOnce && (this.getAppSignOnce = t.getAppSignOnce);
}

function fixPath(t, e) {
    if (!t) return "";
    var o = this;
    return t = t.replace(/(^\/*)|(\/*$)/g, ""), t = "folder" == e ? encodeURIComponent(t + "/").replace(/%2F/g, "/") : encodeURIComponent(t).replace(/%2F/g, "/"), 
    o && (o.path = "/" + o.appid + "/" + o.bucket + "/" + t), t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, SLICE_SIZE_512K = 524288, SLICE_SIZE_1M = 1048576, SLICE_SIZE_2M = 2097152, SLICE_SIZE_3M = 3145728, MAX_UNSLICE_FILE_SIZE = 20971520;

CosCloud.prototype.cosapi_cgi_url = "https://REGION.file.myqcloud.com/files/v2/", 
CosCloud.prototype.sliceSize = 3145728, CosCloud.prototype.getExpired = function(t) {
    return parseInt(Date.now() / 1e3) + (t || 60);
}, CosCloud.prototype.set = function(t) {
    t && (this.appid = t.appid, this.bucket = t.bucket, this.region = t.region, this.sign_url = t.sign_url, 
    t.getAppSign && (this.getAppSign = t.getAppSign), t.getAppSignOnce && (this.getAppSignOnce = t.getAppSignOnce));
}, CosCloud.prototype.getCgiUrl = function(t) {
    var e = this.region, o = this.bucket, i = this.cosapi_cgi_url;
    return (i = i.replace("REGION", e)) + this.appid + "/" + o + "/" + t;
}, CosCloud.prototype.updateFolder = function(t, e, o, i, a) {
    i = fixPath.call(this, i, "folder"), this.updateBase(t, e, o, i, a);
}, CosCloud.prototype.updateFile = function(t, e, o, i, a) {
    i = fixPath.call(this, i), this.updateBase(t, e, o, i, a);
}, CosCloud.prototype.updateBase = function(t, e, o, i, a, r, s) {
    var n = this;
    n.getAppSignOnce(function(o) {
        var p = n.getCgiUrl(i), u = {
            op: "update"
        };
        a && (u.biz_attr = a), r && (u.authority = r), s && (s = JSON.stringify(s), u.customHeaders = s), 
        wx.request({
            method: "POST",
            url: p,
            header: {
                Authorization: o
            },
            data: u,
            success: t,
            fail: e
        });
    });
}, CosCloud.prototype.deleteFolder = function(t, e, o, i) {
    i = fixPath.call(this, i, "folder"), this.deleteBase(t, e, o, i);
}, CosCloud.prototype.deleteFile = function(t, e, o, i) {
    i = fixPath.call(this, i), this.deleteBase(t, e, o, i);
}, CosCloud.prototype.deleteBase = function(t, e, o, i) {
    if ("/" == i) return void e({
        code: 10003,
        message: "不能删除Bucket"
    });
    var a = this;
    this.getAppSignOnce(function(o) {
        var r = a.getCgiUrl(i), s = {
            op: "delete"
        };
        wx.request({
            method: "POST",
            url: r,
            header: {
                Authorization: o
            },
            data: s,
            success: t,
            fail: e
        });
    });
}, CosCloud.prototype.getFolderStat = function(t, e, o, i) {
    i = fixPath(i, "folder"), this.statBase(t, e, o, i);
}, CosCloud.prototype.getFileStat = function(t, e, o, i) {
    i = fixPath(i), this.statBase(t, e, o, i);
}, CosCloud.prototype.statBase = function(t, e, o, i) {
    var a = this;
    this.getAppSign.call(a, function(o) {
        var r = a.getCgiUrl(i), s = {
            op: "stat"
        };
        wx.request({
            url: r,
            method: "GET",
            header: {
                Authorization: o
            },
            data: s,
            success: t,
            fail: e
        });
    });
}, CosCloud.prototype.createFolder = function(t, e, o, i, a) {
    var r = this;
    this.getAppSign(function(o) {
        i = fixPath(i, "folder");
        var s = r.getCgiUrl(i), n = {
            op: "create",
            biz_attr: a || ""
        };
        wx.request({
            method: "POST",
            url: s,
            header: {
                Authorization: o
            },
            data: n,
            success: t,
            fail: e
        });
    });
}, CosCloud.prototype.copyFile = function(t, e, o, i, a, r) {
    var s = this;
    this.getAppSign(function(o) {
        i = fixPath(i);
        var n = s.getCgiUrl(i), p = {
            op: "copy",
            dest_fileid: a,
            to_over_write: r
        };
        wx.request({
            method: "POST",
            url: n,
            header: {
                Authorization: o
            },
            data: p,
            success: t,
            fail: e
        });
    });
}, CosCloud.prototype.moveFile = function(t, e, o, i, a, r) {
    var s = this;
    this.getAppSign(function(o) {
        i = fixPath(i);
        var n = s.getCgiUrl(i), p = {
            op: "move",
            dest_fileid: a,
            to_over_write: r
        };
        wx.request({
            method: "POST",
            url: n,
            header: {
                Authorization: o
            },
            data: p,
            success: t,
            fail: e
        });
    });
}, CosCloud.prototype.getFolderList = function(t, e, o, i, a, r, s, n, p) {
    var u = this;
    i = fixPath(i, "folder"), u.listBase(t, e, o, i, a, r, s, n);
}, CosCloud.prototype.listBase = function(t, e, o, i, a, r, s, n, p) {
    var u = this;
    u.getAppSign(function(o) {
        var p = u.getCgiUrl(i);
        a = a || 20, r = r || "", s = s || 0, n = n || "eListBoth";
        var l = {
            op: "list",
            num: a,
            context: r,
            order: s,
            pattern: n
        };
        wx.request({
            url: p,
            method: "GET",
            header: {
                Authorization: o
            },
            data: l,
            success: t,
            fail: e
        });
    });
}, CosCloud.prototype.uploadFile = function(t, e, o, i, a, r) {
    if ("object" === (void 0 === t ? "undefined" : _typeof(t))) {
        var s = t;
        t = s.success, e = s.error, s.bucket, i = s.path, a = s.filepath, r = s.insertOnly;
        var n = s.bizAttr;
    }
    var p = this;
    i = fixPath(i), p.getAppSign(function(o) {
        i = fixPath(o.fileId);
        var s = p.getCgiUrl(i), u = {
            op: "upload"
        };
        r >= 0 && (u.insertOnly = r), n && (u.biz_attr = n), wx.uploadFile({
            url: s,
            filePath: a,
            name: "fileContent",
            header: {
                Authorization: o.sign
            },
            formData: u,
            success: function(e) {
                e.data = JSON.parse(e.data), 0 == e.data.code && (e.data.data.imgUrl = e.data.data.access_url.replace(/http.*com/, "http://pic1.58cdn.com.cn"));
                var o = e.data.data.access_url.split("/");
                e.data.data.imgName = o[o.length - 1], t.call(this, e);
            },
            fail: e
        });
    });
}, module.exports = CosCloud, exports.default = CosCloud;