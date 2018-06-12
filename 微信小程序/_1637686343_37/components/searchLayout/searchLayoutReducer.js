function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e) {
    return Object.assign({}, t, e.options);
}

function s() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1], s = {
        searchHistory: {
            list: e.searchHistory,
            title: "搜索历史"
        },
        hotquery: {
            list: e.hotquery,
            title: "热门搜索"
        },
        defaultSearch: !0,
        suggestSearch: !1,
        clearState: !0,
        overflow: e.overflow,
        status: e.status || !1,
        focus: e.focus,
        page: "",
        showResult: !1,
        showcancel: !0,
        suggest: [],
        search: {},
        fixed: !0
    };
    e.options;
    return Object.assign({}, t, s, e.options);
}

function r(t, e) {
    return Object.assign({}, t, e.option);
}

function n() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1], s = t && t.resultlist || [];
    return s.map(function(t, e) {
        return t;
    }), s = s.concat(e.resultlist), Object.assign({}, t, {
        pageNum: e.pageNum,
        resultlist: s,
        isFinal: e.isFinal,
        invalid: e.invalid
    });
}

function i() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1];
    return Object.assign({}, t, e.option);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.searchLayout = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = arguments[1];
    switch (n.type) {
      case "INIT":
        return s(t, n);

      case "SHOW_HIDE_SEARCHLAYOUT":
        return e(t, n);

      case "SHOW_DEFAULT_SEARCH":
        return Object.assign({}, t, n.option);

      case "SHOW_SUGGEST_SEARCH":
        return r(t, n);

      case "CHANGE_INPUT_CLEAR_STATE":
      case "SET_SEARCH_INFO":
      case "UPDATE_SEARCH_STATE":
        return Object.assign({}, t, n.option);

      default:
        return t;
    }
}, exports.scrollBodyHeight = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
    if ("INIT" === arguments[1].type && 0 === t) {
        var e = wx.getSystemInfoSync().windowHeight, s = u.default.searchInputBoxRpx;
        return e - a.default.getPxByRpx(s);
    }
    return t;
}, exports.searchResults = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1];
    switch (e.type) {
      case "SET":
        return {
            invalid: !1,
            isFinal: !1,
            resultlist: [],
            pageNum: 1
        };

      case "LOAD_SEARCHRESULTS":
        return n(t, e);

      case "RESET_SEARCHRESULTS":
        return Object.assign({}, t, {
            pageNum: e.pageNum,
            resultlist: e.resultlist
        });

      case "CHANGE_SEARCHRESULTS":
        return i(t, e);

      default:
        return t;
    }
};

var u = t(require("config")), a = t(require("../../common/utils/util"));