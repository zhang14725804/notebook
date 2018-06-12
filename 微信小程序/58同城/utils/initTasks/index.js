module.exports = {
    start: function(i) {
        [ require("./im") ].forEach(function(t) {
            t.init && t.init(i);
        });
    }
};