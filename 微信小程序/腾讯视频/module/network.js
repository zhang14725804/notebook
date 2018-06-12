function e() {
    wx.getNetworkType({
        success: function(e) {
            e && e.networkType && (t = e.networkType, e.networkType != t && n.emit("change", t));
        }
    });
}

var n = new (require("./message"))(), t = "";

e();

var o, r = module.exports = function() {
    return t;
};

r.onChange = function(e) {
    n.on("change", e);
}, r.startPoll = function() {
    o = setInterval(e, 5e3);
}, r.endPoll = function() {
    clearInterval(o);
};