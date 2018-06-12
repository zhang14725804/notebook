var T = {
    DOMAIN: "https://wxapp.58.com",
    ACTIVITY_DOMAIN: "https://activity.58.com",
    IM_WX: "https://imwx.58.com",
    PATH_DOMAIN: "58.com",
    USER_LOGIN_PATH: "/user/login",
    USER_AUTO_LOGIN: "/user/wxalogin",
    USER_INFO: "/user/info",
    LOGIN_URL: "/user/thirdlogin",
    USER_LOCATION: "/user/location",
    CDN_PIC: "//pic1.58cdn.com.cn",
    CHEPHONE_PATH: "/phone/get",
    REFRESH_PATH: "/phone/refresh",
    CHECK_PATH: "/phone/vccheck",
    CITY_PATH: "/load/city",
    YOUXUAN_PATH: "/list/youxuan",
    CATE_PATH: "/load/cate",
    DETAIL_PATH: "/list/detail",
    FILTER_PATH: "/load/menu",
    LIST_PATH: "/list/info",
    ERSCAR_BRAND_PATH: "/load/scbrand",
    ERSCAR_BRAND_PRICE_PATH: "/load/scmenu",
    QUANZAHN_MENU_PATH: "/load/smenu",
    WX_LOGIN: "/log/do",
    GET_USER_PROFILE: "/user/wxprofile"
};

Object.assign(T, {
    index: {
        GET_DEFAULT_SEARCH_PATH: "/load/config",
        LOAD_SCAN: "/load/scan"
    },
    youxuan: {
        POST_LIST_PATH: T.ACTIVITY_DOMAIN + "/wxa/yx/ylist",
        SUB_LIST_PATH: T.ACTIVITY_DOMAIN + "/wxa/yx/slist",
        LIST_MORE_PATH: T.ACTIVITY_DOMAIN + "/wxa/yx/listmore",
        YX_LIST: T.ACTIVITY_DOMAIN + "/wxa/yx/ilist",
        GET_SUBID: T.ACTIVITY_DOMAIN + "/wxa/wxsub/jobsubid"
    },
    wenda: {
        QUESTION_LIST_PATH: T.ACTIVITY_DOMAIN + "/wxa/qa/qlist",
        ANSWER_LIST_PATH: T.ACTIVITY_DOMAIN + "/wxa/qa/alist",
        QUESTION_CONCERN_PATH: T.ACTIVITY_DOMAIN + "/wxa/qa/subscribe"
    },
    serviceSeekDetail: {
        ADD_LABEL_PATH: T.ACTIVITY_DOMAIN + "/wxa/demand/label",
        GET_VERTIFY_CODE_PATH: T.ACTIVITY_DOMAIN + "/wxa/demand/sendSMS",
        CHECK_VERTIFY_CODE_PATH: T.ACTIVITY_DOMAIN + "/wxa/demand/checkSMS",
        GET_LOCAL_LIST_PATH: T.ACTIVITY_DOMAIN + "/wxa/demand/locallist",
        FORM_SUBMIT_PATH: T.ACTIVITY_DOMAIN + "/wxa/demand/submit",
        GET_POSITION_LIST_PATH: T.ACTIVITY_DOMAIN + "/wxa/wxsub/zplist",
        GET_POSITION_LIST_PATH_SUB: T.ACTIVITY_DOMAIN + "/wxa/wxsub/catelist",
        GET_BANNER_STATUS: T.ACTIVITY_DOMAIN + "/wxa/demand/config",
        GET_INTENTION_LABLE: T.ACTIVITY_DOMAIN + "/wxa/demand/getLabel"
    },
    city: {
        GET_TOWN_LIST_PATH: T.ACTIVITY_DOMAIN + "/wxa/town/citylist",
        CITY_WEATHER: T.ACTIVITY_DOMAIN + "/wxa/weather/brief",
        GET_TOWN_LIST_BY_ID: T.ACTIVITY_DOMAIN + "/wxa/town/listbylevel"
    },
    detail: {
        STRIVE_ROMMATE: T.DOMAIN + "/list/roommate"
    },
    rommate: {
        ROMMATE_LIST: T.DOMAIN + "/list/rmlist"
    },
    friend: {
        LOVR_ALERT: T.ACTIVITY_DOMAIN + "/wxa/love/alert"
    },
    im: {
        MSG_COUNT: T.IM_WX + "/im/message/new/count"
    },
    HOTWORDS_URL: "/sou/hotword",
    SUGGEST_URL: "/sou/suggest",
    ITEMINFO_URL: "/sou/click",
    CITY_SUGGEST: "/sou/city"
}, {
    log: {
        track: "/log/track",
        click: "/log/click"
    }
}), module.exports = T;