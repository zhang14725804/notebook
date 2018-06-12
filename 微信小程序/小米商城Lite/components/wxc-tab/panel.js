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
        label: String,
        componentId: {
            type: String,
            value: ""
        }
    },
    data: {
        activeKey: 1,
        test: 0
    },
    attached: function() {
        var e = this;
        this.componentId = this.data.componentId, this.data.label && t.default.emit("tab-create-" + this.componentId, {
            key: this.data.tabIndex,
            label: this.data.label
        }), t.default.on("to-panel-switch-" + this.componentId, function(t) {
            e.setData({
                activeKey: t
            });
        });
    },
    methods: {}
});