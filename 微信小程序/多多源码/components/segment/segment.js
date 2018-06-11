function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var a = e[i];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(t, a.key, a);
        }
    }
    return function(e, i, a) {
        return i && t(e.prototype, i), a && t(e, a), e;
    };
}(), i = require("../../common/index"), a = function() {
    function a(e, i) {
        t(this, a);
        var n = [ "align-average", "align-gap" ];
        if (this.alignType = e.alignType, this.setDataFunc = e.setDataFunc, this.sliderLeft = 0, 
        this.segmentData = null, this.gap = e.gap, this.scrollLeftGap = e.scrollLeftGap || 0, 
        this.tabsContainerWidth = 0, this.gap || (this.gap = 20), this.alignType || (this.alignType = n[0]), 
        this.refreshTabsData(e.tabsData), i) {
            var s = this, h = i.didClickSegmentTab;
            i.didClickSegmentTab = function(t) {
                s.didClickSegmentTab(t), h && h(t);
            };
        }
    }
    return e(a, [ {
        key: "$data",
        value: function() {
            return this.segmentData;
        }
    }, {
        key: "refreshTabsData",
        value: function(t) {
            if (t.length) {
                this.segmentData = {
                    $tabsData: t
                }, this.selectIndex = -1, this.animation = null, this.scrollLeft = 0, this.paddingLeftWidth = 0;
                var e = 0, a = 0, n = i.SystemInfo.getWindowWidthSync();
                if (0 != (e = t.length)) {
                    for (var s = 0, h = 0, d = 0; d < e; d++) {
                        for (var l = t[d], r = l.title.trim(), o = 0, c = 0; c < r.length; c++) r.charCodeAt(c) > 255 ? o += 15 : o += 7.5;
                        l.textWidth = o, l.tabWidth = o + this.gap, o > s && (s = o), h += l.tabWidth;
                    }
                    if ("align-average" == this.alignType) {
                        (a = s + this.gap) * e < n && (a = n / e);
                        for (var f = 0; f < e; f++) t[f].tabWidth = Math.floor(a);
                        this.tabsContainerWidth = a * e;
                    } else h < n ? (this.paddingLeftWidth = (n - h) / 2, this.tabsContainerWidth = n) : this.tabsContainerWidth = h;
                    this.data = t, this.selectIndex = -1, this.updateSelectIndex(0);
                }
            }
        }
    }, {
        key: "didClickSegmentTab",
        value: function(t) {
            var e = parseInt(t.currentTarget.dataset.index);
            this.updateSelectIndex(e);
        }
    }, {
        key: "setDedDot",
        value: function(t, e) {
            !self.data || t < 0 || t > this.data.length - 1 || (this.data[t].showRedDot = e, 
            this.updateSelectIndex(this.selectIndex));
        }
    }, {
        key: "updateSelectIndex",
        value: function(t) {
            t != this.selectIndex && (t < 0 || t > this.data.count - 1 || (this.selectIndex = t, 
            this.setSliderAnimation(), this.setScrollLeft(), this.setPageData()));
        }
    }, {
        key: "setScrollLeft",
        value: function() {
            var t = this.data[this.selectIndex].tabWidth;
            t * this.data.count <= i.SystemInfo.getWindowWidthSync() || (this.scrollLeft = this.sliderLeft + 2 * t - i.SystemInfo.getWindowWidthSync() + this.scrollLeftGap + 20, 
            this.scrollLeft < 0 && (this.scrollLeft = 0));
        }
    }, {
        key: "setSliderAnimation",
        value: function() {
            this.animation || (this.animation = wx.createAnimation({
                duration: 50,
                timingFunction: "linear",
                delay: 10
            }));
            for (var t = this.data[this.selectIndex], e = t.textWidth, i = t.tabWidth, a = this.paddingLeftWidth || 0, n = 0; n < this.selectIndex; n++) a += this.data[n].tabWidth;
            a += (i - e) / 2, this.sliderLeft = a, this.animation.left(a).width(e).step();
        }
    }, {
        key: "setPageData",
        value: function() {
            var t = {};
            this.data && (t.$tabsData = this.data), this.animation && (t.animationData = this.animation.export()), 
            t.scrollLeft = this.scrollLeft, t.curTabIndex = this.selectIndex, t.tabsContainerWidth = this.tabsContainerWidth, 
            t.paddingLeftWidth = this.paddingLeftWidth, this.segmentData = t;
        }
    } ]), a;
}();

exports.default = a;