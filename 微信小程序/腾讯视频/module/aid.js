function n(n) {
    for (var i, e = {}, $ = /(\$\d+):[^$]*/g; null != (i = $.exec(n)); ) e[i[1]] = i[0];
    return e;
}

function i(i) {
    var e = n(i);
    return "$2$4$13$5$12$1$7$11$15$6$3$8$9$10$14".replace(/\$\d+/g, function(n) {
        return e[n] || "";
    });
}

function e() {
    var n = 10;
    try {
        var i = wx.getSystemInfoSync();
        console.log("📱 wx res", i), i.system.indexOf("iOS") > -1 && (n = 9);
    } catch (n) {}
    return n;
}

module.exports = {
    buildAid: function(n) {
        var $ = n.value;
        if ($ && -1 != $.indexOf("V0$$")) {
            var o = $.split("$$")[1];
            if (o) {
                for (var t = [], c = o.split("$"), d = 0; d < c.length; d++) {
                    var r = c[d];
                    if (r) {
                        var a = r.split(":");
                        a.length > 0 && "" != a[1] && t.push(r);
                    }
                }
                $ = [ "$", t.join("$") ].join("");
            }
            -1 == $.indexOf("$1:") && n.channel && ($ += [ "$1:", n.channel ].join("")), -1 == $.indexOf("$2:") && (n.plat ? $ += [ "$2:", n.plat ].join("") : $ += [ "$2:", e() ].join("")), 
            -1 == $.indexOf("$4:") && n.source && ($ += [ "$4:", n.source ].join("")), -1 == $.indexOf("$5:") && n.cid && ($ += [ "$5:", n.cid ].join("")), 
            -1 == $.indexOf("$6:") && n.vid && ($ += [ "$6:", n.vid ].join("")), -1 == $.indexOf("$7:") && n.pid && ($ += [ "$7:", n.pid ].join("")), 
            -1 == $.indexOf("$11:") && n.scene && ($ += [ "$11:", n.scene ].join("")), -1 == $.indexOf("$12:") && n.ptag && ($ += [ "$12:", encodeURIComponent(n.ptag) ].join("")), 
            n.actid && (-1 != $.indexOf("$13:") ? $ = $.replace(/\$13:HLW\_[^$]*/g, "$13:" + n.actid) : $ += [ "$13:", n.actid ].join("")), 
            -1 == $.indexOf("$15:") && n.serial && ($ += [ "$15:", n.serial ].join(""));
        } else $ = "", n.channel && ($ += [ "$1:", n.channel ].join("")), n.plat ? $ += [ "$2:", n.plat ].join("") : $ += [ "$2:", e() ].join(""), 
        n.source && ($ += [ "$4:", n.source ].join("")), n.cid && ($ += [ "$5:", n.cid ].join("")), 
        n.vid && ($ += [ "$6:", n.vid ].join("")), n.pid && ($ += [ "$7:", n.pid ].join("")), 
        n.scene && ($ += [ "$11:", n.scene ].join("")), n.ptag && ($ += [ "$12:", encodeURIComponent(n.ptag) ].join("")), 
        n.actid && ($ += [ "$13:", n.actid ].join("")), n.serial && ($ += [ "$15:", n.serial ].join(""));
        return "V0$" + i($);
    }
};