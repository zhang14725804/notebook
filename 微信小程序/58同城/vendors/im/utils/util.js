module.exports = {
    convertUrl: function(n) {
        return 0 === n.indexOf("http") ? n : 0 === n.indexOf("//") ? "https:" + n : void 0;
    },
    param: function(n) {
        var t = [], e = arguments.length > 1 && 0 == arguments[1] ? "false" : "true";
        for (var r in n) {
            var o = n[r];
            o = null == o ? "" : o, t[t.length] = "false" === e ? r + "=" + o : encodeURIComponent(r) + "=" + encodeURIComponent(o);
        }
        var i = /%20/g;
        return t.join("&").replace(i, "+");
    },
    isEmpty: function(n) {
        return n + "" == "null" || n + "" == "undefined" || "" === n;
    },
    isString: function(n) {
        return "string" == typeof n && n.constructor == String;
    }
};