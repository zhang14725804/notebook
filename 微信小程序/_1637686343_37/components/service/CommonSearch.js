function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    this.option = t || {}, this._data = {}, this.param = {}, this.option.key && this.setKey(t.key), 
    this.param.limit = this.option.limit || 18, this._url = r.default.interfaces.search;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

exports.default = function(t) {
    return new e(t);
};

var r = t(require("../config/config")), i = t(require("searchService"));

e.prototype = {
    setKey: function(t) {
        this.param.key = t;
    },
    getKey: function() {
        return this.param.key || "";
    },
    setTimeLength: function(t) {
        this.param.timeLength = t;
    },
    setReleaseDate: function(t) {
        this.param.releaseDate = t && "0" != t ? t : "";
    },
    setStart: function(t) {
        this.param.start = t;
    },
    setLimit: function(t) {
        this.param.limit = t || 20;
    },
    setDomain: function(t) {
        this.param.domain = t;
    },
    setFrom: function(t) {
        this.param.from = t;
    },
    setCategory: function(t) {
        this.param.category = t;
    },
    setSortKey: function(t) {
        this.param.sortKey = t || "";
    },
    setThreeCategory: function(t) {
        Array.isArray(t) && (this.param.threeCategory = encodeURIComponent(t.join(",")).replace(/%/g, "_"));
    },
    setChannelId: function(t) {
        this.param.channel_id = t || "";
    },
    formatData: function(t) {
        "object" == (void 0 === t ? "undefined" : a(t)) && t.code && t.data || (t = {
            code: 500,
            data: {}
        });
        var e = t.code, r = {
            data: {
                list: []
            }
        };
        if (!(t = t.data)) return r;
        var i = [], n = {}, o = 0;
        (r = {
            eventId: t.event_id,
            bkt: t.bkt,
            search_time: t.search_time,
            serverTime: t.server_time,
            term_query: t.term_query,
            invalid: !!t.is_invalid_query,
            intent_result_num: t.intent_result_num,
            real_query: t.real_query,
            index_layer: t.index_layer,
            scoring_mode: t.scoring_mode,
            intent_type: t.intent_type || "",
            graph_type: t.graph_type || "",
            data: {
                weight: [],
                terms: t.terms,
                result_num: t.result_num
            }
        }).isBubble = !1, t.docinfos && t.docinfos.forEach(function(e) {
            var a = e.albumDocInfo;
            a.is_from_intent = e.is_from_intent, 0 == o && a.circle_summaries && a.circle_summaries.length > 0 && (1 == a.videoDocType && !a.album_type && a.series && !a.is_from_intent && (r.isBubble = !0), 
            o++), a.page_num = t.page_num, a.eventId = t.event_id, a.channelId = a.channel && a.channel.split(",")[1], 
            a.s_qr = t.intent_type && t.intent_type > 0 ? 10 : 0;
            var s = a.videoDocType;
            if (4 != s && 1e3 != s && 7 != s && (101 != s || $.os.android && a.app && a.app.running_platform.split(",").indexOf("7") > -1)) {
                if (101 != s && 8 != s && 3 != s && 11 != s) {
                    var u = a.channel.split(",");
                    if (2 == u.length) {
                        var m = u[0];
                        /\D/g.test(m) && (n[m] = n[m] ? n[m] + 1 : 1);
                    }
                }
                a.doc_id = e.doc_id, a.sort = e.sort, a.pos = e.pos, i.push(a);
            }
        }), r.data.list = i;
        for (var s in n) r.data.weight.push({
            category: s,
            count: n[s]
        });
        return "A00004" == e ? r.is_invalid_query = !0 : "A00000" == e ? r.is_Normal = !0 : r.is_inNormal = !0, 
        r;
    },
    search: function(t) {
        return this.searchCore(t);
    },
    searchCore: function(t) {
        var e = this, a = Object.assign({
            channel_name: this.param.category,
            if: "html5",
            pageNum: e.param.start,
            pageSize: e.param.limit
        }, this.param, t);
        return (0, i.default)(a).then(function(r) {
            var i = e.formatData(r);
            Object.assign(e._data, i, {
                success: !0,
                keyword: a.key,
                vfrm: t.vfrm
            });
            var n = e.param.limit, o = e.param.start, s = i.data.result_num;
            return e._data.isFinal = !(o < Math.ceil(s / n)), e._data.first = "", e._data;
        });
    }
};