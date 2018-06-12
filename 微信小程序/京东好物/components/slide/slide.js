var t = {
    getAngle: function(t, a, e, s) {
        var i = Math.abs(t - a), d = Math.abs(e - s), h = Math.sqrt(i * i + d * d), r = Math.round(Math.asin(d / h) / Math.PI * 180);
        return a >= t && s <= e ? r = r : a <= t && s <= e ? r = 180 - r : a <= t && s >= e ? r = 180 + r : a >= t && s >= e && (r = 360 - r), 
        r;
    },
    slideStart: function(t) {
        var a = t.changedTouches;
        if (1 === a.length) {
            var e = a[0];
            this.data.startPageX = e.pageX, this.data.startPageY = e.pageY, this.data.itemId = t.currentTarget.id;
        }
    },
    slideEnd: function(t) {
        var a = t.changedTouches, e = t.currentTarget.id;
        if (1 === a.length && e == this.data.itemId) {
            var s = !!this.data.slideItems[e], i = a[0], d = i.pageX - this.data.startPageX, h = (i.pageY, 
            this.data.startPageY, this.getAngle(this.data.startPageX, i.pageX, this.data.startPageY, i.pageY)), r = !1;
            (h >= 0 && h <= 20 || h >= 160 && h <= 200 || h >= 340 && h <= 360) && (r = !0), 
            !s && d < -30 && r ? (this.data.slideItems = {}, this.data.slideItems[e] = !0, this.setData({
                slideItems: this.data.slideItems
            })) : s && d > 0 && r && (this.data.slideItems[e] = !1, this.setData({
                slideItems: this.data.slideItems
            }));
        }
    }
};

module.exports = t;