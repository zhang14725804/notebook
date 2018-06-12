(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../utils/ppdog"), c = a(b), d = require("../utils/regenerator-runtime"), e = a(d);
    module.exports = function(a, b, c) {
        return console.log("我是建国, 我是一个测试的中间件"), c(a);
    };
})();