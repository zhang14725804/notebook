Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../actions/index"));

exports.default = {
    switchDesc: function() {
        this.store.dispatch(e.default.switchDesc());
    }
};