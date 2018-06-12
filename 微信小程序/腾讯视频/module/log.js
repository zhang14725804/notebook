var o = "devtools" == wx.getSystemInfoSync().platform;

module.exports = function(a) {
    var n = [ Math.floor(50 * Math.random() + 200), Math.floor(50 * Math.random() + 150), Math.floor(50 * Math.random() + 100) ].sort(function() {
        return Math.random() - .5;
    });
    return n = "rgb(" + n[0] + ", " + n[1] + ", " + n[2] + ")", o ? function() {
        var o = [ "%c【%s】%c " + a + " %c %s ", "background: #ddd", new Date(), "background: " + n, "background: #333;color: white" ];
        console.log.apply(console, o.concat([].slice.call(arguments, 0)));
    } : function() {
        var o = [ "【%s】 " + a + " %s ", new Date() ];
        console.log.apply(console, o.concat([].slice.call(arguments, 0)));
    };
};