function t(t, i) {
    if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
}

var i = function() {
    function t(t, i) {
        for (var a = 0; a < i.length; a++) {
            var e = i[a];
            e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), 
            Object.defineProperty(t, e.key, e);
        }
    }
    return function(i, a, e) {
        return a && t(i.prototype, a), e && t(i, e), i;
    };
}(), a = function() {
    function a(i, e) {
        t(this, a), this.page = i, this.defaultCallback = e || function() {}, this.callbacks = {}, 
        this.imgInfo = {}, this.page.data.imgLoadList = [], this.page._imgOnLoad = this._imgOnLoad.bind(this), 
        this.page._imgOnLoadError = this._imgOnLoadError.bind(this);
    }
    return i(a, [ {
        key: "load",
        value: function(t, i) {
            var a = this;
            if (t) {
                var e = this.page.data.imgLoadList, n = this.imgInfo[t];
                i && (this.callbacks[t] = i), n ? setTimeout(function() {
                    a._runCallback(null, {
                        src: t,
                        width: n.width,
                        height: n.height
                    });
                }, 0) : -1 == e.indexOf(t) && (e.push(t), this.page.setData({
                    imgLoadList: e
                }));
            }
        }
    }, {
        key: "_imgOnLoad",
        value: function(t) {
            var i = t.currentTarget.dataset.src, a = t.detail.width, e = t.detail.height;
            this.imgInfo[i] = {
                width: a,
                height: e
            }, this._removeFromLoadList(i), this._runCallback(null, {
                src: i,
                width: a,
                height: e
            });
        }
    }, {
        key: "_imgOnLoadError",
        value: function(t) {
            var i = t.currentTarget.dataset.src;
            this._removeFromLoadList(i), this._runCallback("Loading failed", {
                src: i
            });
        }
    }, {
        key: "_removeFromLoadList",
        value: function(t) {
            if (this.page) {
                var i = this.page.data.imgLoadList;
                i.splice(i.indexOf(t), 1), this.page.setData({
                    imgLoadList: i
                });
            }
        }
    }, {
        key: "_runCallback",
        value: function(t, i) {
            (this.callbacks[i.src] || this.defaultCallback)(t, i), delete this.callbacks[i.src];
        }
    } ]), a;
}();

module.exports = a;