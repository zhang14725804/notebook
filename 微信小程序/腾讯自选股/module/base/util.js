(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../../utils/ppdog"), c = a(b), d = require("../../utils/regenerator-runtime"), e = a(d);
    var f = Array.prototype.push, g = Array.prototype.slice, h = Object.prototype.toString, i = Object.prototype.hasOwnProperty, j = {};
    j.each = function(a, b) {
        var c, d;
        if (a instanceof Array) for (c = 0, d = a.length; c < d; c++) b(a[c], c, a);
        return a;
    }, j.each([ "Object", "Arguments", "Function", "String", "Number", "Date", "RegExp", "Error" ], function(a) {
        j["is" + a] = function(b) {
            return h.call(b) === "[object " + a + "]";
        };
    }), j.encode2Json = function(a) {
        return "string" == typeof a ? a.replace(/\\x([0-9A-Fa-f]{2})/g, function() {
            var a = String.fromCharCode(parseInt(arguments[1], 16));
            return '"' === a ? "“" : a;
        }).replace("\n", " ").replace(/\\“/g, "“").replace(/\\/g, " ") : void 0;
    }, j.extend = function(a, b) {
        if (!j.isObject(a) || !j.isObject(b)) return a;
        for (var c in b) a[c] = b[c];
        return a;
    }, j.getParameter = function(a, b, c) {
        if (!(2 > arguments.length)) {
            c = "undefined" == typeof c || c;
            var d = {}, e = b.split("&");
            if (0 < e.length) for (var f = 0, g = e.length; f < g; f++) try {
                if (/(.*?)=(.*)/.test(e[f])) {
                    var h = RegExp.$1, i = RegExp.$2;
                    i = c ? decodeURIComponent(i) : i, d[h] = this.filterScript(i);
                }
            } catch (a) {
                console.log(a.message);
            }
            return a ? d[a] : d;
        }
    }, j.filterScript = function(a) {
        return a = a.toString(), a = a.replace(/</g, "&lt;"), a = a.replace(/>/g, "&gt;"), 
        a = a.replace(/"/g, "&quot;"), a = a.replace(/'/g, "&#x27;"), a = a.replace(/\//g, "&#x2f;"), 
        a;
    }, j.showMsg = function(a, b) {
        wx.showModal({
            title: b || "",
            content: a,
            showCancel: !1,
            confirmText: "确定"
        });
    }, j.resCommonHandle = function(a) {
        var b;
        if (a || (a = {
            errMsg: "wx.request未返回数据",
            statusCode: "f2e"
        }), a && "200" == a.statusCode) {
            if (b = a.data, "string" == typeof b) {
                var c = this.encode2Json(b);
                b = JSON.parse(c);
            }
            return {
                check: !0,
                json: b
            };
        }
        return {
            check: !1
        };
    }, module.exports = j;
})();