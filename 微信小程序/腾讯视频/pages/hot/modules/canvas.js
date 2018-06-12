var e = 0, t = null;

module.exports = {
    setPlayerTitle: function(l, i) {
        !e && (e = ~~((i - 32) / 15)), !t && (t = wx.createCanvasContext("playerTitle")), 
        t.setFontSize(15), t.setFillStyle("white");
        var a = l.length <= e ? l : l.slice(0, e) + "...";
        t.fillText(a, 16, 35), t.draw();
    }
};