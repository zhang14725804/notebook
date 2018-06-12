function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var a = 0; a < e.length; a++) {
            var n = e[a];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, a, n) {
        return a && t(e.prototype, a), n && t(e, n), e;
    };
}(), a = function() {
    function a(e) {
        t(this, a), this.keyName = e, this.dataList = [], this.dataKeyIndexMap = {};
    }
    return e(a, [ {
        key: "getDataKeyIndexMap",
        value: function() {
            return this.dataKeyIndexMap;
        }
    }, {
        key: "getDataList",
        value: function() {
            return this.dataList;
        }
    }, {
        key: "pushDataItem",
        value: function(t) {
            var e = t[this.keyName];
            t && e && null == this.dataKeyIndexMap[e] && (this.dataList.push(t), this.dataKeyIndexMap[e] = this.dataList.length - 1);
        }
    }, {
        key: "removeAllDatas",
        value: function() {
            this.dataList = [], this.dataKeyIndexMap = {};
        }
    }, {
        key: "resetDataKeyIndexMap",
        value: function() {
            this.dataKeyIndexMap = {};
            for (var t = 0; t < this.dataList.length; t++) {
                var e = this.dataList[t];
                e && (this.dataKeyIndexMap[e[this.keyName]] = t);
            }
        }
    }, {
        key: "removeItemByKey",
        value: function(t) {
            if (t && null != this.dataKeyIndexMap[t]) {
                var e = this.dataKeyIndexMap[t];
                if (e >= 0 && e < this.dataList.length) {
                    var a = this.dataList.splice(e, 1);
                    return this.resetDataKeyIndexMap(), a;
                }
            }
            return null;
        }
    }, {
        key: "isLastThreeItemByKey",
        value: function(t) {
            if (t && null != this.dataKeyIndexMap[t]) {
                var e = this.dataKeyIndexMap[t];
                if (e >= 0 && e >= this.dataList.length - 3 && e < this.dataList.length) return !0;
            }
            return !1;
        }
    } ]), a;
}();

exports.default = a;