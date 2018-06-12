function e(e, n) {
    for (var t = ""; n > 0; ) 1 & n && (t += e), n >>= 1, e += e;
    return t;
}

var n = "~!@#$%^&*-+=|:<>?/".split(""), t = __wxConfig || {}, r = 0;

module.exports = function(o) {
    var i = e(n[r++ % n.length], 10);
    return function() {
        var e;
        if (t.debug) {
            var n = new Error(), r = new Date(), l = r.toTimeString().split(" ")[0] + " " + r.getMilliseconds();
            console.debug(i + "【" + o + "】[" + l + "]: "), (e = console).debug.apply(e, arguments), 
            console.debug(n.stack.split("\n")[2].replace("    at", ""));
        }
    };
};