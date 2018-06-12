(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../../utils/ppdog"), c = a(b), d = require("../../utils/regenerator-runtime"), e = a(d);
    module.exports = {
        name: "notes",
        data: {
            isNoteHide: !0
        },
        props: {
            NoteData: ""
        },
        onLoad: function() {},
        onUnload: function() {},
        methods: {
            bindNoteHide: function() {
                var a = this.data.isNoteHide, b = !1;
                !1 === a && (b = !0), this.setData({
                    isNoteHide: b
                });
            },
            bindEditNote: function() {
                var a = this.parent.data.symbol;
                wx.navigateTo({
                    url: "../../pages/notes/notes?symbol=" + a
                });
            }
        }
    };
})();