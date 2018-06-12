var rem_grid = 20;

module.exports = {
    rem: function rem(val) {
        var rem = eval(val) / rem_grid;
        return 0 == rem ? rem : rem / (0 * rem + 1) * 1 + "rem";
    }
};