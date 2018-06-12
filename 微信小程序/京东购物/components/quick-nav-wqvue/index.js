var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./page"));

new (require("../../common/wqvue/index").WqComponent)(e.default, "quick-nav");