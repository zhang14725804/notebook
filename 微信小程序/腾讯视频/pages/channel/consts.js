var e = {
    100113: {
        name: "电视剧",
        subnav: [ {
            name: "偶像爱情",
            queries: "itype=12&sort=18&iyear=1&feature=1"
        }, {
            name: "宫斗权谋",
            queries: "itype=12&sort=18&iyear=1&feature=2"
        }, {
            name: "玄幻史诗",
            queries: "itype=12&sort=18&iyear=1&feature=3"
        }, {
            name: "全部分类",
            queries: "itype=12&sort=18&iyear=1&feature=-1"
        } ]
    },
    100109: {
        name: "综艺",
        subnav: [ {
            name: "真人秀",
            queries: "itype=58&sort=4"
        }, {
            name: "自制",
            queries: "itype=67&sort=4"
        }, {
            name: "音乐",
            queries: "itype=69&sort=4"
        }, {
            name: "脱口秀",
            queries: "itype=22&sort=4"
        }, {
            name: "全部分类",
            queries: "sort=4"
        } ]
    },
    100173: {
        name: "电影",
        subnav: [ {
            name: "院线",
            queries: "itype=1&sort=18&iyear=11"
        }, {
            name: "科幻",
            queries: "itype=12&sort=18&iyear=11"
        }, {
            name: "爱情",
            queries: "itype=5&sort=18&iyear=11"
        }, {
            name: "喜剧",
            queries: "itype=3&sort=18&iyear=11"
        }, {
            name: "全部分类",
            queries: "itype=99&sort=18&iyear=11"
        } ]
    },
    100119: {
        name: "动漫",
        subnav: [ {
            name: "国漫",
            queries: "iarea=1&sort=18"
        }, {
            name: "日漫",
            queries: "iarea=2&sort=18"
        }, {
            name: "搞笑",
            queries: "itype=1&sort=18"
        }, {
            name: "推理",
            queries: "itype=14&sort=18"
        }, {
            name: "全部分类",
            queries: "sort=18"
        } ]
    }
}, r = [ "100113", "100109", "100173", "100119" ], a = r.map(function(r) {
    return {
        name: e[r].name,
        id: r
    };
});

module.exports = {
    channelMap: e,
    channelNav: a,
    channelIds: r
};