var t = require("../../../../bases/component.js"), e = require("../../utils.js");

new t({
    properties: {
        showTime: {
            type: Number,
            observer: function() {
                this.checkTips();
            }
        }
    },
    data: {
        tipsText: "",
        tipsPath: ""
    },
    methods: {
        checkTips: function() {
            var t = getApp().indexTips;
            this.setData({
                tipsText: t.text,
                tipsPath: t.path
            }), t.text && t.path && e.report("7486.3.1"), t.text = "", t.path = "";
        },
        onDisableTips: function(t) {
            var s = getApp().indexTips;
            s.text = "", s.path = "", this.setData({
                tipsPath: "",
                tipsText: ""
            }), e.report("7486.3.3");
        },
        onTapTips: function(t) {
            var s = t.currentTarget.dataset.path;
            this.$goto(s), e.report("7486.3.2");
        }
    }
});