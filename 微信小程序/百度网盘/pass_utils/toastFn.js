Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.toastFn = function(t, e) {
    var s = e || "";
    t.setData({
        toast: !0,
        toasttxt: s
    }), setTimeout(function() {
        t.setData({
            toast: !1,
            toasttxt: ""
        });
    }, 2e3);
};