var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../libs/lodash.core.min.js")), a = getApp();

Page({
    baseData: {
        rectArr: [],
        needCheckLen: 0,
        checkedLen: 0,
        viewHeight: 0,
        viewWidth: 0,
        rowsCount: 19,
        rowUnitCount: 6,
        colsCount: 11,
        colUnitCount: 5,
        cellHeight: 0,
        cellWidth: 0,
        proportionW: 1,
        proportionH: 1,
        btnPositon: {},
        excepTimer: "",
        context: wx.createCanvasContext("screen-canvas"),
        curDiypropertyItem: {},
        propertyNameId: -1,
        toastSuccessIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHoAAABOCAMAAADYbPJtAAAAolBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8ELnaCAAAANXRSTlMA/RIIAvrZ8/Be5sVOBPcxfEfPpnZWDevebyIfyrGtnZeTQjcbFgHjwLaGZC0p6NS7gT2MJjBcW8gAAAMRSURBVGjevZiHUsJAEIZ30wuhBqQoVTqooHn/VzMGvJVcpCS5/W7GCc7A3pfk158AM/NN07abBw3YaduY4FSAmRBjonghMs+uJ4NPPxwNGPmMZ/5KR1gHNhZjPAmfpz8DF8YoHknWGDnARDDEBLLmGq2vTwPpWnOd8M4HYsqa6Tbr+GdnsmYKl9YUzpTrCjDw+i6cydoFBgZdxLS12QYGvpbCWVhXWc72zkNMW9tTYKD2dHYma3RmwMDRQUn6qQYMNGzhLJa3BwYqVZTo9oGBtik7W6/AwBZl3ufAQA9l52cNGAiTyZf4HWBgI2oYrQ8d1LOYIErWL0onyzWMVisA9QQtRMl6ZIB69BeqYWJNFqAenWoYWW9AOXINS1YIDGjPiJJ1DxiYUw0j6y0w8Grlr2HtUevQh7z0u7lr2MbEH6ycw/e5a1ggirpZKa2GHeEONCvZZ+6nDbPcNWzfpTBEOb4cTLNq2O6uAucg0ntj6sVr2PLrkUoR83s0NorWsAHcJhjhCbKOHvr/6mbVsHsKoLb6HZogXvhagRrWvOfNcwtRsk68rYHaGrYQzpG0A++ecByyaljnrjsECWkLdgNu8Zm/hq3/7FjegXkj4Ma4QA17EhMzTzzW1dWw6jXrGwEPhoVq2PKq9dWA6+tiNax1aV1N7eBKwDsruYY99Ad4in9wGjUvI2RWv+QaJmt39wADS7ymj32TAz5vFq9hdMVWWmLjCxWxKOBXa5gLD2L0kmbj9YzzXui+pQ823Zs1LFe5CWauOwtoLxPJOhXw/VKuYdUGlEEd09YxFPBdRg2zj1AOrpmypoBn1zBnVuojrwtrCvgxo4a97aA8ap5kHSUBb2TXsDIZWJL1T8ArpuzcHUC5aD5Zi4MMZRXP4fQhWdOBXMPmUD7GhKzp4PLeV/YcLvzHmn6x6kDpUMBla3q91kEZU/ua9TAAFVDA/73WLQMUQgGXrccLUIzmZ1t/gnr0YZb1ATgwJrJ1CEyEaestsOGaJB3jAiPTv9YusNKgWywELqiSJVTbwM/W996adQNK4RsmP4pXVsD1yAAAAABJRU5ErkJggg==",
        toastFailIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABQCAMAAAC9OtKiAAAApVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+4/eNVAAAANnRSTlMA+wPy6vX45YNTFe7RxUULrpB2XkoGmjou2syJZjQdCOC+cSkkGQ/VuKY/ErWinH1qWU4hDZWhjO01AAADqklEQVRYw6WY6ULqMBSEE8pa6EV22VcRcQFRz/s/2i2BekgmtE38+KNAp0PSZjIVMWG1UQoa1VD8gadxrDE6vApFLSBFUPNX7JRIUe8qRfpl5avYpgQZa4YByeuLqO2nWCXWKG7jfxPOb1R9FFvEyNhWg89wpuWu2D8rsEYkAj6DeuvHUbDwTqS5rIgSn+PCe8FFsfdwOZ41iqJBCcmbDz0HxTfSkRTdzlby5ts8r2Jzx0fzVRMGhsuYXTOf4ndEJjK+iETNcHn+I/rOo/g6Ujb0l7p9JtJ0KWn0mq0YNgiQn0LxKYldXv9ohJkLxRA9lk/iyqmcqLHs81O64teCgNI//rxboutPZt3hV5ripoIeg724YR/QVZTtVjb3FR+LBNQHQmNQJ+0CVYvK4z3FaRE88rfhvOwy/tZUMPr5gcpaAOuK7jL5Lci/EnpcbKwjvjBdyvMcAt0yAcOZsDIbai4V5a4wqEnwmHLFPT2bLiWVa0ZwSQIaYeo9xi75HrthYvEYbUUK20h3qV4T/nxFyLKZsV4t2SWGcZvQ4y5zdZ3vwOVvGFcJeejlSRNweQ3jFlqkl0KuzHtRgvqhLVHoE/KBinbNDyWo038Hj04J/UMwDzbGwoExiqDHqu/Oye7TZ0/WznBJR+HMMXU0ZcdrZytTXPrsmDmM0SSHqzOnMrjkhdkZjASGw/WP4wnj6Me0ji45jH0YBNahpPrUfyRvlDTxYOCqxeEqrS7Jec45XO+5lBzGjnMt77okj3mfmEowUa53+er3SBYC9YmL4kFJZLh0asZj3hNzuO4s6geX5pq45HDtPViGYJwzHy8HaZb6BRXGuMy18qW4xiXFOYzNgO8Xsvca+jF6uLbAZfZ+Y76DENMmYWy4zG7GzSUcYVwqB0zf1Ga8heaKF/QKAj5thxnammsHb1Uk2qbv1Bn74tCRODj2ZjyzNdeufdmDKbR2ik1ac8XF2XApLc1nbWuug9QIYZTrxVeO5jpNDTrDpeQWyeGa2VyNIxiJYbwP8jRX+F2GS8m/y9ZcYWRszZhdmlubU97mik832KW2AdtjK7zbM/FKNjtSeSDEN8w13AspLRabXGUu2uiRn2VlP8/CJncUI7fmimuX2TeXIjBd4uqXY4Vl1CNRaK5OzN+M0CyKZ82iwzNWTivdZSTGxHDeOT4N1mvgrEy3FdkDvVYHobbwV30EjfL/qZpd8kjoKLxpJxrXqNr0i0SV/kb8gfXHWeNndnN5NX21UOM/P4DFo3XjqxIAAAAASUVORK5CYII="
    },
    onLoad: function() {
        new a.WeToast(), a.detailDiyData.checkedDiyLength < a.detailDiyData.diyPagesStatus.length && (a.detailDiyData.isPausedDiyCheck = !0);
    },
    onReady: function() {
        var t = this;
        if (t.initView(), !a.detailDiyData.diyPropertyList.length) return !1;
        var i = a.detailDiyData.diyPropertyList;
        e.default.forEach(i, function(e) {
            /^触摸功能$/.test(e.name) && (t.baseData.curDiypropertyItem = e, t.baseData.propertyNameId = e.id);
        });
    },
    onUnload: function() {
        var e = this.baseData.excepTimer;
        e && clearInterval(e);
    },
    initView: function() {
        var e = this;
        try {
            var a = function(a, t, o) {
                var r = n * a, c = s * t;
                o ? (i.moveTo(r, c), i.lineTo(r, c + s)) : (i.moveTo(r, c), i.lineTo(r + n, c)), 
                A[t][a] = {
                    x: r,
                    y: c,
                    checked: !1
                }, ++e.baseData.needCheckLen;
            }, t = wx.getSystemInfoSync(), i = e.baseData.context, o = t.windowWidth, r = t.windowHeight, n = o / e.baseData.colsCount, s = r / e.baseData.rowsCount, c = e.baseData.rowUnitCount, l = e.baseData.colUnitCount, A = [];
            e.baseData.viewWidth = o, e.baseData.viewHeight = r, e.baseData.cellWidth = n, e.baseData.cellHeight = s, 
            e.baseData.proportionW = o / 375, e.baseData.proportionH = r / 625, i.setStrokeStyle("#A7A8AB");
            for (var D = 0; D < e.baseData.rowsCount; D++) {
                var d = D * s;
                if (A[D] = [], A[D][0] = {
                    x: 0,
                    y: d,
                    checked: !1
                }, ++e.baseData.needCheckLen, D % c == 0 || (D - 1) % c == 0) if (i.moveTo(0, d), 
                i.lineTo(o, d), D % c == 0) for (var h = 1; h < e.baseData.colsCount; h++) a(h, D, !0); else for (var u = 1; u < e.baseData.colsCount; u++) u % l != 1 && u % l != 0 || (u % l == 0 ? a(u, D, !0) : (i.moveTo(n * u, d), 
                i.lineTo(n * u, d + s))); else {
                    i.moveTo(0, d), i.lineTo(n, d);
                    for (var b = 1; b < e.baseData.colsCount; b++) b % l != 1 && b % l != 0 || (i.moveTo(n * b, d), 
                    i.lineTo(n * b, d + s), b % l == 0 && a(b, D, !1));
                }
            }
            e.baseData.rectArr = A, i.stroke(), i.draw(), e.drawTipsBaseContent(), e.drawTimerText(30), 
            e.startExcepTimer();
        } catch (e) {}
    },
    drawTipsBaseContent: function() {
        var e = this, a = e.baseData.context, t = e.baseData.proportionW, i = e.baseData.proportionH, o = 60 * t, r = 82 * i, n = 28 * t, s = Math.floor(20 * t), c = 56 * t, l = r + 26 * i + n, A = 90 * t, D = 35 * t;
        e.baseData.btnPositon = {
            x: c,
            y: l,
            width: A,
            height: D
        }, a.setFontSize(s), a.setLineWidth(1), a.setFillStyle("#000000"), a.fillText("触摸滑动", o, r), 
        a.fillText("填满格子", o, r + n), a.setLineJoin("round"), a.setStrokeStyle("#5C626D"), 
        a.moveTo(c, l), a.lineTo(c + A, l), a.lineTo(c + A, l + D), a.lineTo(c, l + D), 
        a.lineTo(c, l), a.stroke(), a.draw(!0);
    },
    drawTimerText: function(e) {
        var a = this, t = a.baseData.context, i = a.baseData.btnPositon, o = a.baseData.proportionW, r = i.x + 2 * o + 4, n = i.y + 26 * o - 1;
        t.setFillStyle("#ffffff"), t.fillRect(i.x + 1, i.y + 1, i.width - 2, i.height - 2), 
        t.setFillStyle("#5C626D"), t.setFontSize(Math.floor(18 * o)), t.fillText("异常(" + e + "s)", r, n), 
        t.draw(!0);
    },
    startExcepTimer: function() {
        var e = this, a = 30;
        e.baseData.excepTimer = setInterval(function() {
            0 === a ? (clearInterval(e.baseData.excepTimer), e.finishCheckScreen(!1)) : (--a, 
            e.drawTimerText(a));
        }, 1e3);
    },
    touchCheckEvent: function(e, a) {
        var t, i = !0;
        return function() {
            var o = arguments, r = this;
            return i ? (e.apply(r, o), i = !1) : !t && void (t = setTimeout(function() {
                clearTimeout(t), t = null, e.apply(r, o);
            }, a || 500));
        };
    }(function(e) {
        var a = this, t = a.baseData.btnPositon, i = e.changedTouches[0], o = a.baseData.context, r = a.baseData.cellWidth, n = a.baseData.cellHeight, s = Math.floor(e.changedTouches[0].x / r), c = Math.floor(e.changedTouches[0].y / n), l = {};
        return a.baseData.excepTimer && i.x > t.x && i.x < t.x + t.width && i.y > t.y && i.y < t.y + t.height ? (clearInterval(a.baseData.excepTimer), 
        a.finishCheckScreen(!1), !0) : !(!a.baseData.rectArr[c] || !a.baseData.rectArr[c][s]) && void ((l = a.baseData.rectArr[c][s]).checked || (o.beginPath(), 
        o.setFillStyle("#20B35D"), o.fillRect(l.x, l.y, r, n), o.closePath(), o.fill(), 
        o.draw(!0), l.checked = !0, ++a.baseData.checkedLen, a.baseData.checkedLen === a.baseData.needCheckLen && (a.finishCheckScreen(!0), 
        clearInterval(a.baseData.excepTimer))));
    }, 10),
    finishCheckScreen: function(e) {
        var t = this, i = a.detailDiyData.propertyNameIdList, o = t.baseData.propertyNameId, r = t.baseData.curDiypropertyItem, n = i[o];
        t.baseData.curDiypropertyItem.mixinStatus.isSelected = !0, n.status.isSelected = !0, 
        a.screenTouchStatus.isFinishedcheck = !0, e ? (n.data.selectedValue.id = r.values[0].id, 
        n.data.selectedValue.value = r.values[0].value, a.screenTouchStatus.isCheckedSuccess = !0) : (n.data.selectedValue.id = r.values[1].id, 
        n.data.selectedValue.value = r.values[1].value, a.screenTouchStatus.isCheckedSuccess = !1), 
        a.detailDiyData.navNextDiyProperty();
    }
});