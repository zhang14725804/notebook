module.exports = {
    formatRecentTime: function(e, t) {
        if (e % 1 != 0) return e;
        e = (e = parseInt(e)) > 9999999999 ? e : 1e3 * e;
        var a, r, s, n, c, u, g = new Date(e), i = g.getHours(), o = g.getMinutes(), l = g.getDate(), D = g.getMonth() + 1, b = g.getDay(), k = new Date(), m = (i < 10 ? "0" + i : i) + ":" + (o < 10 ? "0" + o : o);
        switch (k.setHours(0), k.setMinutes(0), k.setSeconds(0), r = k.getTime(), s = k.getDay(), 
        n = null, a = null, c = r - 864e5, u = new Date(k.getFullYear().toString() + "/01/01 00:00:00").getTime(), 
        b) {
          case 1:
            a = "星期一 ";
            break;

          case 2:
            a = "星期二 ";
            break;

          case 3:
            a = "星期三 ";
            break;

          case 4:
            a = "星期四 ";
            break;

          case 5:
            a = "星期五 ";
            break;

          case 6:
            a = "星期六 ";
            break;

          case 0:
            a = "星期日";
        }
        return n = 0 !== s ? r - 24 * (s - 1) * 36e5 : r - 5184e5, e >= r ? m : e >= c ? "chat" === t ? "昨天 " + m : "昨天" : e >= n ? "chat" === t ? a + m : a : e >= u ? (D < 10 ? "0" + D : D) + "-" + (l < 10 ? "0" + l : l) : new Date(e).getFullYear().toString() + "-" + (D < 10 ? "0" + D : D) + "-" + (l < 10 ? "0" + l : l);
    }
};