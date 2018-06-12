function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

e(require("../../common/polyfill/promise"));

var t = e(require("../../components/load/loadActions"));

exports.default = Object.assign({
    showHideSearchLayout: function() {
        var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], t = arguments[1], o = arguments[2], n = {
            status: e,
            overflow: t,
            defaultSearch: !0,
            suggestSearch: !1
        };
        return {
            type: "SHOW_HIDE_SEARCHLAYOUT",
            options: Object.assign(n, o)
        };
    },
    initSearchLayout: function() {
        var e = {
            type: "INIT",
            searchHistory: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
            hotquery: arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
            focus: !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
            status: arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
            overflow: arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "",
            options: arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {}
        };
        return Object.assign({}, e);
    },
    showDefaultSearch: function() {
        return {
            type: "SHOW_DEFAULT_SEARCH",
            option: {
                defaultSearch: !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
                suggestSearch: arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
            }
        };
    },
    showSuggestSearch: function() {
        return {
            type: "SHOW_SUGGEST_SEARCH",
            option: {
                suggest: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []
            }
        };
    },
    setKeyWord: function(e, t) {
        return {
            type: "SET_SEARCH_INFO",
            option: {
                defaultSearch: e,
                suggestSearch: t,
                clearState: !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
                focus: !0,
                options: arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}
            }
        };
    },
    updateSearchState: function(e) {
        return {
            type: "UPDATE_SEARCH_STATE",
            option: e
        };
    },
    resetResults: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        return {
            type: "RESET_SEARCHRESULTS",
            pageNum: arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
            resultlist: e,
            isFinal: !1,
            isEmpty: !1
        };
    }
}, t.default);