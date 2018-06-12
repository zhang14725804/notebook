var e = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
};

module.exports = {
    formatTime: function(t) {
        var n = t.getFullYear(), r = t.getMonth() + 1, i = t.getDate(), a = t.getHours(), u = t.getMinutes(), o = t.getSeconds();
        return [ n, r, i ].map(e).join("-") + " " + [ a, u, o ].map(e).join(":");
    },
    getOriginImgUrl: function(e) {
        var t = new RegExp("size=\\S*?&"), n = e.replace(t, "size=c9999_u9999&"), r = new RegExp("http://pcsdata.baidu.com/");
        return n.replace(r, "https://thumbnail10.baidupcs.com/");
    }
};