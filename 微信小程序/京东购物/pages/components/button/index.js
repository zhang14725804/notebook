var e = require("./behavior");

new (require("../../../bases/component"))({
    behaviors: [ e ],
    properties: {
        size: {
            type: String,
            value: "large",
            observer: function(e, a) {
                this.initClassName({
                    size: e
                });
            }
        },
        type: {
            type: String,
            value: "primary",
            observer: function(e, a) {
                console.info("type", e, a), this.initClassName({
                    type: e
                });
            }
        },
        text: {
            type: String,
            value: ""
        },
        disable: {
            type: Boolean,
            value: !1,
            observer: function(e, a) {
                this.initClassName({
                    disable: e
                });
            }
        },
        full: {
            type: Boolean,
            value: !1,
            observer: function(e, a) {
                this.initClassName({
                    full: e
                });
            }
        }
    },
    data: {
        _className: "",
        hoverClassName: "",
        buttonWidth: ""
    },
    attached: function() {
        this.initClassName();
    },
    methods: {
        initClassName: function(e) {
            var a = "box", t = "", s = Object.assign({}, this.data, e), i = s.size, l = s.type, o = s.disable, r = s.full;
            a += " " + i + "-box", a += " " + l, "small" === i && r && (a += " full"), o ? (a += " " + l + "-disable", 
            a += " opacity-30") : (t = "default" === l ? i + "-" + l + "-hover" : l + "-hover", 
            t += " opacity-60"), "primary" !== l && (a += " " + i + "-box_border", "small" === i && (a += " opacity-70")), 
            this.setData({
                _className: a,
                hoverClassName: t
            });
        }
    }
});