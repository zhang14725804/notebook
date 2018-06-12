function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function a() {
    return t.default.album_channels_map;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function() {
    var e = function(e) {
        var a = e || {};
        this.param = {}, a.key && this.setKey(a.key), a.pageSize && (this.param.pageSize = a.pageSize), 
        i.default.init(e);
    };
    return e.prototype = {
        setKey: function(e) {
            var a = encodeURIComponent(e).replace(/%/g, "_");
            this.param.key = a;
        },
        setStart: function(e) {
            this.param.start = e;
        },
        setLimit: function(e) {
            this.param.pageSize = e;
        },
        setDomain: function(e) {
            this.param.domain = e;
        },
        setFrom: function(e) {
            this.param.from = e;
        },
        setCategory: function(e) {
            var t = a();
            this.param.ctgName = e, t[e] && (this.param.pos = 1);
        },
        setSortKey: function(e) {
            this.param.sortKey = e;
        },
        setPurchase: function(e) {
            this.param.purchase = e;
        },
        setIQiyiChupin: function(e) {
            this.param.is_qiyi_produced = e;
        },
        setThreeCategory: function(e) {
            if (delete this.param.is_qiyi_produced, Array.isArray(e)) {
                for (var a = e.length - 1; a >= 0; a--) "爱奇艺出品" == e[a] ? (e.splice(a, 1), this.param.is_qiyi_produced = 1) : e[a] += ";must";
                this.param.threeCategory = e.join(",");
            }
        },
        setYear: function(e) {
            this.param.year = e;
        },
        search: function(e) {
            var a = this.param || {}, t = {
                pageNum: this.param.start,
                mode: this.param.sortKey,
                ctgName: this.param.ctgName,
                threeCategory: this.param.threeCategory,
                pageSize: this.param.pageSize,
                type: this.param.type || "list",
                if: this.param.from || "html5",
                pos: this.param.pos,
                site: "iqiyi",
                qyid: "",
                access_play_control_platform: 15,
                pu: r.default.getUid(),
                u: r.default.getAnonymousUid(),
                from: "weixin_mini_program"
            };
            this.param.year && (t.market_release_date_level = this.param.year), this.param.is_qiyi_produced && (t.is_qiyi_produced = 1), 
            t.ispurchase = a.purchase, t.pos || (t.is_has_father_album = 0);
            for (var i in t) void 0 === t[i] && (t[i] = "");
            return t;
        }
    }, {
        getSearchListInstance: function(a) {
            return new e(a);
        }
    };
};

var t = e(require("../common/config")), r = e(require("../../../common/user/user")), i = e(require("../../../common/search/searchInterface"));