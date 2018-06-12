Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./Event.js"));

exports.default = Component({
    behaviors: [],
    properties: {
        tabIndex: Number,
        componentId: {
            type: String,
            value: ""
        }
    },
    data: {
        activeKey: 0,
        width: 0
    },
    attached: function() {
        var e = this, a = this.data.componentId;
        t.default.emit("tab-create-" + a, {
            key: this.data.tabIndex
        }), t.default.on("to-label-switch-" + a, function(t) {
            e.setData({
                activeKey: t
            });
        }), t.default.on("label-width-" + a, function(t) {
            e.setData({
                width: t
            });
        });
    },
    moved: function() {
        t.default.removeListener();
    },
    methods: {
        onSwitch: function() {
            t.default.emit("from-label-switch-" + this.data.componentId, this.data.tabIndex);
        }
    }
});