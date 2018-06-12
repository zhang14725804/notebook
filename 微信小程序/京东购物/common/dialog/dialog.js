new (require("../../bases/component.js"))({
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        title: {
            type: String,
            value: ""
        },
        cancelText: {
            type: String,
            value: "取消"
        },
        confirmText: {
            type: String,
            value: "确认"
        },
        cancelTextColor: {
            type: String,
            value: "#333333"
        },
        confirmTextColor: {
            type: String,
            value: "#E93B3D"
        },
        showClose: {
            type: Boolean,
            value: !1
        },
        showCancel: {
            type: Boolean,
            value: !1
        },
        enableCancel: {
            type: Boolean,
            value: !0
        },
        enableConfirm: {
            type: Boolean,
            value: !0
        },
        moreButtons: {
            type: Array,
            value: []
        }
    },
    data: {
        showBottomMask: !1
    },
    methods: {
        _cancelTap: function() {
            this.setData({
                show: !1
            }), this.triggerEvent("dialogcancel");
        },
        _confirmTap: function() {
            this.setData({
                show: !1
            }), this.triggerEvent("dialogconfirm");
        },
        _moreButtonTap: function(t) {
            var e = t.currentTarget.dataset.index;
            this.setData({
                show: !1
            }), this.triggerEvent("dialogmorebtnstap", e);
        },
        _closeTap: function() {
            this.setData({
                show: !1
            }), this.triggerEvent("dialogclosebtntap");
        },
        _showMask: function() {
            var t = this, e = this.createSelectorQuery().in(this).select(".dialog_content");
            e && e.boundingClientRect(function(e) {
                e && e.height >= 220 && t.setData({
                    showBottomMask: !0
                });
            }).exec();
        }
    },
    ready: function() {
        this._showMask();
    }
});