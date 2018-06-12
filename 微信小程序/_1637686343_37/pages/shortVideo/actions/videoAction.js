Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    init: function(e) {
        return Object.assign({
            type: "INIT"
        });
    },
    setUrl: function(e) {
        return {
            type: "SET_URL",
            url: e
        };
    }
};