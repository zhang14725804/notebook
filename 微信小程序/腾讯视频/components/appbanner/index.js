var e = require("../../module/message");

Component({
    properties: {
        cid: {
            type: String,
            value: "",
            observer: function() {
                this.makeScheme();
            }
        },
        vid: {
            type: String,
            value: "",
            observer: function() {
                this.makeScheme();
            }
        }
    },
    data: {
        show: !1,
        scheme: ""
    },
    methods: {
        makeScheme: function() {
            this.data.cid ? this.setData({
                scheme: "tenvideo2://?action=1&cover_id=" + this.data.cid + (this.data.vid ? "&video_id=" + this.data.vid : "")
            }) : this.data.vid && this.setData({
                scheme: "tenvideo2://?action=5&video_id=" + this.data.vid
            });
        }
    },
    attached: function() {
        var t = this;
        this.makeScheme(), e.on("App:Show", function() {
            var e = getApp().global.scene;
            1036 == e ? t.setData({
                show: !0
            }) : 1089 != e && 1090 != e && t.setData({
                show: !1
            });
        });
        var a = getApp().global.scene;
        1036 == a ? this.setData({
            show: !0
        }) : 1089 != a && 1090 != a && this.setData({
            show: !1
        });
    }
});