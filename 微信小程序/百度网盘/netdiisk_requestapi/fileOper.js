Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.fileOper = void 0;

var e = require("../netdisk_utils/wxRequestApi.js"), n = !1, r = 0, t = [ "/apps" ], i = {
    CREATE: "api/create",
    RENAME: "api/filemanager?opera=rename&async=0&onnest=fail&ondup=newcopy",
    ASYNCRENAME: "api/filemanager?opera=rename&async=2&onnest=fail&ondup=newcopy",
    COPY: "api/filemanager?opera=copy&async=0&onnest=fail&ondup=newcopy",
    DELETE: "api/filemanager?opera=delete&async=2&onnest=fail",
    TASKQUERY: "api/taskquery"
}, o = function(r, t) {
    return n ? (wx.showToast({
        title: "正在执行其他操作...",
        icon: "loading",
        duration: 1e3
    }), Promise.reject(new Error("is doing"))) : (wx.showLoading({
        title: "请稍候..."
    }), n = !0, (0, e.wxReq)(r, t, "POST").then(function(e) {
        return wx.hideLoading(), n = !1, 0 !== e.data.errno ? Promise.reject(e) : e;
    }).catch(function(e) {
        return wx.hideLoading(), n = !1, Promise.reject(e);
    }));
}, a = function(e) {
    return o(i.DELETE, {
        filelist: JSON.stringify(e)
    });
}, s = function(e) {
    return function() {
        return new Promise(function(n) {
            setTimeout(n, e);
        });
    };
}, u = function(n) {
    return function() {
        return r > 8 ? Promise.reject("超过最多次数") : (r++, (0, e.wxReq)(i.TASKQUERY, {
            taskid: n
        }, "GET").then(function(e) {
            return 0 !== e.data.errno ? Promise.reject(e) : "success" === e.data.status ? e : Promise.resolve();
        }).catch(function(e) {
            return Promise.reject(e);
        }));
    };
}, c = function(e, n) {
    var r = s(n), t = u(e);
    return t().then(function e(n) {
        return n || r().then(function() {
            return t();
        }).then(e);
    });
};

exports.fileOper = {
    createDir: function(e) {
        return o(i.CREATE, {
            path: e,
            isdir: 1,
            block_list: "[]"
        });
    },
    renameDir: function(e, n) {
        return o(i.RENAME, {
            filelist: '[{"path": "' + e + '", "newname": "' + n + '"}]'
        });
    },
    asyncRenameDir: function(n, t) {
        return wx.showLoading({
            title: "请稍候..."
        }), r = 0, (0, e.wxReq)(i.ASYNCRENAME, {
            filelist: '[{"path": "' + n + '", "newname": "' + t + '"}]'
        }, "POST").then(function(e) {
            if (0 !== e.data.errno) return Promise.reject(e);
            var n = e.data.taskid;
            return c(n, 1e3);
        }).then(function(e) {
            return wx.hideLoading(), e;
        }).catch(function(e) {
            return wx.hideLoading(), Promise.reject(e);
        });
    },
    copyDir: function(e, n) {
        return o(i.COPY, {
            filelist: '[{"path": "' + e + '", "dest": "' + n + '", "newname": "' + (e.match(/\/([^\/]+)\/?$/) || [])[1] + '"}]'
        });
    },
    deleteFile: function(e) {
        if ("string" == typeof e) return a([ e ]);
        Array.isArray(e) || (e = [ e ]);
        for (var n, r = wx.getCurrentViewPage(), i = "sharedir" === r.pageName || "sharedir" === r.fromPage, o = wx.getStorageSync("uk"), s = [], u = !1, c = !1, f = !1, d = 0, l = e.length; d < l; d++) {
            if (n = e[d], i) if (n.oper_id && n.oper_id !== o) {
                if (!f && (f = !!n.isdir), !c && (c = !n.isdir), !n.isdir) continue;
            } else !u && (u = !0); else 1 === n.share && !u && (u = !0);
            s.push(n.path);
        }
        if (s.some(function(e) {
            return t.includes(e);
        })) return wx.showToast({
            title: "预置文件不可以删除",
            icon: "none",
            duration: 1e3
        }), Promise.reject();
        var p = "";
        return i && (c || f) ? (wx.wetoast({
            content: "只能管理自己上传的文件哦",
            duration: 1200
        }), Promise.reject()) : (!p && u && (p = "确认删除所选文件吗? 删除后他人将无法查看和管理"), !p && (p = "确认删除所选文件吗？"), 
        new Promise(function(e) {
            wx.showModal({
                confirmColor: "#3888ff",
                title: "确认删除",
                content: p,
                success: function(n) {
                    n.confirm && e();
                }
            });
        }).then(function() {
            return a(s);
        }));
    }
};