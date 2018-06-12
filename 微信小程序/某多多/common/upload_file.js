function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, a = e(require("../libs/es6-promise.min")), n = e(require("../libs/co/we-index")), r = e(require("../libs/regenerator-runtime/runtime")), o = e(require("../storage/ram_manager")), u = e(require("../configs/api")), l = e(require("../common/request")), i = e(require("../common/data_util")), c = e(require("./util")), s = {
    uploadFileQueue: [],
    uploadFileWaitQueue: [],
    uploadFileLock: !1,
    chooseUploadImg: function(e, t, a) {
        try {
            wx.chooseImage({
                count: e,
                sizeType: [ "original", "compressed" ],
                sourceType: [ "album", "camera" ],
                success: function(e) {
                    "function" == typeof t && t(e);
                },
                fail: function(e) {
                    "function" == typeof a && a(e), console.error(e);
                }
            });
        } catch (e) {
            "function" == typeof a && a(), console.error(e);
        }
    },
    uploadImg: function(e, a, o) {
        e.size / 1e3 >= 400 ? "function" == typeof o && o("请上传小于400KB的图片") : (0, n.default)(r.default.mark(function n() {
            var l, i, c, f;
            return r.default.wrap(function(n) {
                for (;;) switch (n.prev = n.next) {
                  case 0:
                    return n.prev = 0, n.next = 3, s.getUploadSign();

                  case 3:
                    return l = n.sent, i = {
                        url: u.default.uploadFileUrl + "?sign=" + l.signature,
                        filePath: e.path,
                        name: "file"
                    }, n.next = 7, s.uploadFile(i);

                  case 7:
                    c = n.sent, "object" == (void 0 === (f = JSON.parse(c.data)) ? "undefined" : t(f)) && f.url ? "function" == typeof a && a(f) : "function" == typeof o && o("网络出错"), 
                    n.next = 16;
                    break;

                  case 12:
                    n.prev = 12, n.t0 = n.catch(0), console.error(n.t0), "function" == typeof o && o("网络出错");

                  case 16:
                  case "end":
                    return n.stop();
                }
            }, n, this, [ [ 0, 12 ] ]);
        }));
    },
    chooseCommentImg: function() {
        var e = o.default.CPData.canSelImgsCount - o.default.CPData.commentImgs.length;
        s.chooseUploadImg(e, function(e) {
            s.chooseCommentImgSuccess(e);
        });
    },
    chooseCommentImgSuccess: function(e) {
        var a = o.default.CPPage.$showToast;
        a = c.default.bind(a, o.default.CPPage), s.uploadFileLock ? a("上次上传仍在进行中") : (s.uploadFileLock = !0, 
        o.default.CPSetData({
            loadingVisible: !0
        }), (0, n.default)(r.default.mark(function n() {
            var l, i, c, f, d, m, p, g, b, h, C;
            return r.default.wrap(function(n) {
                for (;;) switch (n.prev = n.next) {
                  case 0:
                    n.prev = 0, l = !0, i = !1, c = void 0, n.prev = 4, f = e.tempFiles[Symbol.iterator]();

                  case 6:
                    if (l = (d = f.next()).done) {
                        n.next = 30;
                        break;
                    }
                    if (!((m = d.value).size / 1e3 >= 400)) {
                        n.next = 13;
                        break;
                    }
                    return a("请上传小于400KB的图片"), s.uploadFileLock = !1, o.default.CPSetData({
                        loadingVisible: !1
                    }), n.abrupt("return");

                  case 13:
                    if (!(o.default.CPData.commentImgs.length >= o.default.CPData.canSelImgsCount)) {
                        n.next = 18;
                        break;
                    }
                    return a("请上传不多于" + o.default.CPData.canSelImgsCount + "图片"), s.uploadFileLock = !1, 
                    o.default.CPSetData({
                        loadingVisible: !1
                    }), n.abrupt("return");

                  case 18:
                    return n.next = 20, s.getUploadSign();

                  case 20:
                    return p = n.sent, g = {
                        url: u.default.uploadFileUrl + "?sign=" + p.signature,
                        filePath: m.path,
                        name: "file"
                    }, n.next = 24, s.uploadFile(g);

                  case 24:
                    b = n.sent, "object" == (void 0 === (h = JSON.parse(b.data)) ? "undefined" : t(h)) && h.url ? ((C = o.default.CPData.commentImgs).push(h), 
                    o.default.CPSetData({
                        commentImgs: C,
                        imageUploaderShow: C.length < o.default.CPData.canSelImgsCount,
                        commentImgsCount: C.length
                    })) : a("网络出错");

                  case 27:
                    l = !0, n.next = 6;
                    break;

                  case 30:
                    n.next = 36;
                    break;

                  case 32:
                    n.prev = 32, n.t0 = n.catch(4), i = !0, c = n.t0;

                  case 36:
                    n.prev = 36, n.prev = 37, !l && f.return && f.return();

                  case 39:
                    if (n.prev = 39, !i) {
                        n.next = 42;
                        break;
                    }
                    throw c;

                  case 42:
                    return n.finish(39);

                  case 43:
                    return n.finish(36);

                  case 44:
                    o.default.CPSetData({
                        loadingVisible: !1
                    }), s.uploadFileLock = !1, n.next = 54;
                    break;

                  case 48:
                    n.prev = 48, n.t1 = n.catch(0), console.error(n.t1), o.default.CPSetData({
                        loadingVisible: !1
                    }), s.uploadFileLock = !1, a("网络出错");

                  case 54:
                  case "end":
                    return n.stop();
                }
            }, n, this, [ [ 0, 48 ], [ 4, 32, 36, 44 ], [ 37, , 39, 43 ] ]);
        })));
    },
    getUploadSign: n.default.wrap(r.default.mark(function e() {
        var t, a;
        return r.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, t = {
                    bucket_tag: "wx_app"
                }, e.next = 4, l.default.apiRequest("POST", u.default.getUploadFileSign, t);

              case 4:
                return a = e.sent, e.abrupt("return", a);

              case 8:
                e.prev = 8, e.t0 = e.catch(0), console.error(e.t0);

              case 11:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 8 ] ]);
    })),
    uploadFile: function(e) {
        return new a.default(function(t, a) {
            e.success = t, e.fail = a, wx.uploadFile(e);
        });
    },
    delCommentImg: function(e) {
        var t = e.currentTarget.dataset.index, a = o.default.CPData.commentImgs;
        a.splice(t, 1), o.default.CPSetData({
            commentImgs: a,
            imageUploaderShow: !0,
            commentImgsCount: a.length
        });
    },
    showCommentImg: function(e) {
        var t = e.currentTarget.dataset.imgUrl;
        wx.previewImage({
            current: t,
            urls: i.default.ObjectArrToStringArr(o.default.CPData.commentImgs, "url")
        });
    }
};

exports.default = s;