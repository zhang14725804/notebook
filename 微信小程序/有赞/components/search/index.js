!function(e) {
    function t(n) {
        if (a[n]) return a[n].exports;
        var l = global.installedModules[n] = a[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(l.exports, l, l.exports, t), l.l = !0, l.exports;
    }
    var a = {};
    a = global.installedModules = global.installedModules || {}, t.m = e, t.c = a, t.d = function(e, a, n) {
        t.o(e, a) || Object.defineProperty(e, a, {
            configurable: !1,
            enumerable: !0,
            get: n
        });
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, t.n = function(e) {
        var a = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(a, "a", a), a;
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 102);
}({
    102: function(e, t, a) {
        Component({
            externalClasses: [ "search-class", "input-class", "cancel-class" ],
            properties: {
                show: {
                    type: Array,
                    value: [ "icon", "cancel" ]
                },
                cancelText: {
                    type: String,
                    value: "取消"
                },
                keyword: {
                    type: String,
                    value: ""
                },
                pickerWidth: {
                    type: Number,
                    value: 55
                },
                placeholder: {
                    type: String,
                    value: "请输入查询关键字",
                    observer: function(e) {
                        this.setData({
                            inputWidth: 14 * e.length + 45 + "px"
                        });
                    }
                },
                range: {
                    type: Array,
                    value: []
                },
                rangeIndex: {
                    type: Number,
                    value: 0
                },
                useCancel: {
                    type: Boolean
                },
                onlySearch: {
                    type: Boolean,
                    value: !1
                },
                alignLeft: {
                    type: Boolean,
                    value: !1
                },
                searchStyle: String,
                cancelStyle: String,
                inputStyle: String,
                focus: {
                    type: Boolean,
                    value: !1
                },
                disabled: {
                    type: Boolean,
                    value: !1
                }
            },
            data: {
                inputWidth: "auto"
            },
            attached: function() {
                this.data.useCancel || this.data.range.length || this.setData({
                    onlySearch: !0
                });
            },
            methods: {
                pickerChange: function(e) {
                    var t = e.detail.value;
                    this.triggerEvent("pickerchange", {
                        value: t,
                        text: this.data.range[t]
                    });
                },
                search: function(e) {
                    this.triggerEvent("search", {
                        value: e.detail.value
                    });
                },
                inputChange: function(e) {
                    this._inputvalue = e.detail.value, this.triggerEvent("change", {
                        value: e.detail.value
                    });
                },
                cancelSearch: function() {
                    this.triggerEvent("cancel");
                },
                focus: function() {
                    this.data.onlySearch && this.setData({
                        onlySearch: !1
                    }), this.triggerEvent("focus");
                },
                blur: function() {
                    this.data.useCancel || this.data.range.length || this._inputvalue || this.setData({
                        onlySearch: !0
                    }), this.triggerEvent("blur");
                },
                clearInput: function() {
                    this.setData({
                        focus: !0
                    }), this.triggerEvent("change", {
                        value: ""
                    });
                }
            }
        });
    }
});