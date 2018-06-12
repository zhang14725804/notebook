(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../../utils/ppdog"), c = a(b), d = require("../../utils/regenerator-runtime"), e = a(d);
    module.exports = {
        state: {
            D: "退市",
            Z: "暂时上市",
            P: "申购日",
            U: "待上市",
            I: "待发行",
            S: "停牌"
        }
    };
})();