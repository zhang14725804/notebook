function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

e(require("../../common/pingback/click"));

var r = e(require("../../common/user/user")), t = (e(require("../searchLayout/searchBind")), 
e(require("CommonSearch"))), i = e(require("SearchResultFormat")), a = (e(require("../../common/polyfill/promise")), 
e(require("../searchLayout/searchLayoutAction")), {
    category: "",
    timeLength: "0",
    releaseDate: "0"
}), n = null;

exports.default = {
    init: function(e) {
        a.category = "";
    },
    curPageIndex: 1,
    toSearch: function(e, i) {
        this.commonSearch = (0, t.default)({});
        var o = this;
        o.source = e.source || "", o.pos = e.pos || "", o.text = e.text || "", o.mode = e.sort || "", 
        this.commonSearch.setCategory("全部" == a.category ? "" : a.category), this.commonSearch.setTimeLength(a.timeLength), 
        this.commonSearch.setReleaseDate(a.releaseDate), this.commonSearch.setKey(e.keyword), 
        this.curPageIndex = e.pageNum || 1, this.commonSearch.setStart(this.curPageIndex), 
        this.commonSearch.setLimit(e.limit), this.commonSearch.setSortKey(e.sort), this.commonSearch.setChannelId(e.channel_id);
        var s = e.threeCategory || [];
        s = s.filter(function(e) {
            return "" !== e;
        }), this.commonSearch.setThreeCategory(s), n = new Date().getTime();
        var c = r.default.getAnonymousUid(), u = Object.assign({}, {
            u: c,
            qyid: c,
            pu: r.default.getUid(),
            video_allow_3rd: 1,
            intent_result_number: 10,
            intent_category_type: 1,
            category: "",
            vfrm: e.vfrm || "2-3-0-1",
            t: n,
            from: "weixin_mini_program"
        });
        return this.commonSearch.search(u).then(function(r) {
            var t = r;
            t.key = e.keyword;
            var i = Object.assign({}, t);
            return o.render(i);
        }, function(e) {
            reject(e);
        });
    },
    render: function(e) {
        return e.data && e.data.result_num ? this.renderHasResult(e) : this.renderNoResult(e);
    },
    renderHasResult: function(e) {
        var r = this, t = i.default.getSearchFormat({}).getData4PTmpl(e) || [], a = {};
        return a.invalid = e.invalid, a.isFinal = e.isFinal, a.list = t, a.pageNum = r.curPageIndex, 
        a.is_invalid_query = e.is_invalid_query, a.is_Normal = e.is_Normal, a.is_inNormal = e.is_inNormal, 
        a;
    },
    renderNoResult: function(e) {
        var r = this, t = {};
        return t.invalid = e.invalid, t.isFinal = e.isFinal, t.list = [], t.pageNum = r.curPageIndex, 
        t.is_invalid_query = e.is_invalid_query, t.is_Normal = e.is_Normal, t.is_inNormal = e.is_inNormal, 
        t;
    }
};