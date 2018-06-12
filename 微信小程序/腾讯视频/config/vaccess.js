function e(e) {
    return function(t) {
        var o = t && t.data && t.data.data && t.data.data[e];
        return void 0 === o && (o = 555), o;
    };
}

module.exports = {
    video_detail: {
        method: "post"
    },
    search: {
        method: "post",
        needlogin: !1
    },
    search_rank: {
        method: "post",
        needlogin: !1
    },
    search_smart: {
        method: "post",
        needlogin: !1
    },
    new_login: {
        method: "post"
    },
    detail_video_list: {
        method: "post"
    },
    detail_cover_list: {
        method: "post"
    },
    detail_reco_module: {
        method: "post",
        needlogin: !0
    },
    circle_list: {
        method: "post",
        needlogin: !0
    },
    feed_info: {
        method: "get",
        needlogin: !0
    },
    circle_pub: {
        method: "post",
        needlogin: !0
    },
    circle_comment: {
        method: "post",
        needlogin: !0
    },
    circle_like: {
        method: "post",
        needlogin: !0
    },
    circle_del: {
        method: "post",
        needlogin: !0
    },
    circle_tipoff: {
        method: "post",
        needlogin: !0
    },
    channel_data: {
        method: "get",
        needlogin: !0,
        getBusicode: e("status")
    },
    history_list: {
        method: "get",
        needlogin: !0
    },
    history_add: {
        method: "post",
        needlogin: !0
    },
    history_del: {
        method: "post",
        needlogin: !0
    },
    attent_list: {
        method: "post",
        needlogin: !0
    },
    attent_modify: {
        method: "post",
        needlogin: !0
    },
    vlist_index: {
        method: "post"
    },
    vlist_data: {
        method: "post"
    },
    label_sec: {
        method: "post",
        needlogin: !0,
        getBusicode: e("status")
    },
    user_profile: {
        method: "post",
        needlogin: !0
    },
    search_sec: {
        method: "post",
        needlogin: !1
    },
    star_home: {
        method: "get",
        needlogin: !1
    },
    feedback: {
        method: "get",
        needlogin: !0
    },
    hot_videoline: {
        method: "get",
        needlogin: !0,
        getBusicode: e("errCode")
    },
    sec_videoline: {
        method: "get",
        needlogin: !0,
        getBusicode: e("errCode")
    },
    hot_video_insert: {
        method: "get",
        needlogin: !0,
        getBusicode: e("errCode")
    },
    vplus_list: {
        method: "get",
        needlogin: !1,
        getBusicode: e("errCode")
    },
    danmu: {
        method: "get"
    },
    hot_video_nav: {
        method: "get",
        getBusicode: e("errCode")
    },
    feedline_detail: {
        method: "get"
    },
    comm_before_live: {
        method: "get"
    },
    comm_of_chatroom: {
        method: "get"
    },
    comment_detail: {
        method: "get"
    },
    post_comment: {
        method: "post",
        needlogin: !0
    },
    live_detail: {
        method: "get"
    },
    live_poll: {
        method: "get",
        path: "fcgi"
    }
};