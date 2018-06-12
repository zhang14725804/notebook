function t(t) {
    t.setData({
        "tipData.entryStatus": "entry"
    });
}

function a(t) {
    t.setData({
        "tipData.entryStatus": "exit"
    });
}

function e(t, a) {
    var e = [ "upload", "succ", "local" ].includes(t) ? "normal" : "err";
    return "object" === (void 0 === a ? "undefined" : o(a)) && (tipData = Object.assign({}, tipData, a)), 
    function(a) {
        a.setData({
            "tipData.status": t,
            "tipData.staticName": i,
            "tipData.topic": e
        });
    };
}

function u(t) {
    e("none")(t);
}

function n(t) {
    setTimeout(function() {
        a(t);
    }, 3e3), setTimeout(function() {
        u(t);
    }, 4e3);
}

var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, s = getApp(), i = wx.ENV.staticName, c = {
    114: "参数错误",
    "-33": "文件数目过多",
    "-32": "空间配额超限",
    "-30": "文件已存在",
    "-31": "文件拷贝失败",
    default: "上传失败，服务器开小差"
};

module.exports = {
    setStatusUpload: function(a) {
        e("upload")(a), t(a);
    },
    setStatusErr: function(t, a) {
        var e = c[a] || c.default, u = {
            succNum: 0,
            failNum: 0,
            status: "err",
            staticName: i,
            errMsg: e,
            topic: "err"
        };
        t.setData({
            tipData: u
        }), n(t);
    },
    setStatusSucc: function(t) {
        e("succ")(t), n(t);
    },
    setStatusHasFail: function(t, a, e) {
        var u = {
            succNum: a,
            failNum: e,
            status: "hasFail",
            staticName: i,
            topic: "err",
            entryStatus: "entry"
        };
        t.setData({
            tipData: u
        }), n(t);
    },
    setStatusLocal: function(t, a, e) {
        var u = {
            succNum: a,
            failNum: e,
            status: "local",
            staticName: i,
            topic: "normal",
            entryStatus: "entry"
        }, o = a + e;
        return t.setData({
            tipData: u
        }), o === s.globalData.uploadList.length && n(t), o;
    }
};