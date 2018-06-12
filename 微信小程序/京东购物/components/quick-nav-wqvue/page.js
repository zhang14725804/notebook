Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = {
    template: "#quick-nav",
    store: function(t) {
        return t && t.__esModule ? t : {
            default: t
        };
    }(require("./store")).default,
    props: {
        bottom: {
            type: Number,
            default: 100
        },
        wxappPageUrl: {
            type: String,
            default: ""
        }
    },
    watch: {
        wxappPageUrl: function(t) {
            var e = t;
            e && this.getPPmsData(e, this);
        }
    },
    methods: {
        toggleStatus: function() {
            var t = this, e = this.fold;
            e ? (this.showMask = !0, setTimeout(function() {
                t.fold = !e;
            }, 100)) : (this.fold = !e, setTimeout(function() {
                t.showMask = !1;
            }, 100));
        },
        navTo: function(t) {
            var e = this;
            setTimeout(function() {
                return e.toggleStatus();
            }, 500), this.$goto("/pages/h5/index", {
                url: t.currentTarget.dataset.tourl
            });
        }
    }
};

exports.default = t;