function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _SimpleStore = require("./SimpleStore.js"), _SimpleStore2 = _interopRequireDefault(_SimpleStore);

exports.default = new _SimpleStore2.default({
    tabid: "",
    cityid: "0",
    localarea: "",
    category: "",
    sort: 0,
    isnew: 0,
    query: "",
    tabSecondSearch: ""
});