Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(e) {
    "undefined" != typeof console && "function" == typeof console.error && console.error(e);
    try {
        throw new Error(e);
    } catch (e) {}
};