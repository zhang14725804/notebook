Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.changeBtnColorFn = function(e, o, n) {
    var t = {};
    t["" + n] = e, e.length > 0 && (t.clearIcon = "block", t.btnColor = "#fff"), 0 == e.length && (t.clearIcon = "none", 
    t.btnColor = ""), o.setData(t);
};