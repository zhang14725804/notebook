var e = require("../netdiisk_requestapi/reportAction.js"), a = {
    index: {
        navTab0: {
            type: "wx_sharetab_click",
            value: "首页共享文件tab"
        },
        navTab1: {
            type: "wx_netdisktab_click",
            value: "首页网盘文件tab"
        },
        navTab2: {
            type: "wx_usercenter_click",
            value: "首页我的tab"
        },
        indexShare: {
            type: "wx_index_share",
            value: "首页右上角转发"
        },
        goLogin: {
            type: "wx_index_gologin",
            value: "空白页登录按钮"
        },
        deleteTemDir: {
            type: "wx_index_deletetemdir",
            value: "删除共享创建错误生成临时普通文件夹"
        },
        connectBtnClick: {
            type: "wx_index_connectbtn_click",
            value: "意见反馈按钮点击次数"
        }
    },
    file: {
        previewImg: {
            type: "wx_preview_img",
            value: "图片预览"
        },
        previewDocument: {
            type: "wx_preview_document",
            value: "文档预览"
        },
        previewOthers: {
            type: "wx_preview_others",
            value: "预览其它文件"
        },
        outDirLimit: {
            type: "wx_out_dirlimit",
            value: "页面层数超过限制"
        }
    },
    normal: {
        modifiedShareDirName: {
            type: "wx_normallist_modifename",
            value: "网盘目录更多按钮重命名"
        },
        modifiedShareDirNameSuccess: {
            type: "wx_normallist_modifename_success",
            value: "网盘目录更多按钮重命名成功"
        },
        createNewDir: {
            type: "wx_normaldir_createnewdir",
            value: "网盘目录内新建文件夹"
        },
        createNewDirSuccess: {
            type: "wx_normaldir_createnewdir_success",
            value: "网盘目录内新建文件夹成功"
        },
        batch_click: {
            type: "wx_normal_batch_click",
            value: "网盘目录内批量管理点击次数"
        },
        batch_pickall: {
            type: "wx_normal_batch_pickall",
            value: "网盘目录内批量管理全选"
        },
        batch_pickall_cancel: {
            type: "wx_normal_batch_pickall_cancel",
            value: "网盘目录内批量管理取消全选"
        },
        batch_delete: {
            type: "wx_normal_batch_delte",
            value: "网盘目录内批量管理删除"
        },
        batch_rename: {
            type: "wx_normal_batch_rename",
            value: "网盘目录内批量管理重命名"
        },
        list_delete: {
            type: "wx_normal_list_delete",
            value: "网盘目录内更多点击删除"
        },
        longtab_batch: {
            type: "wx_normal_longtab_batch",
            value: "网盘目录长按批量管理"
        },
        normalBtnMoreClick: {
            type: "wx_normalbtn_more_click",
            value: "网盘文件tab文件item更多按钮点击数"
        },
        normalBtnShareToClick: {
            type: "wx_normalbtn_shareto_click",
            value: "网盘文件tab共享给微信群按钮点击数"
        },
        normalBtnShareToSuccess: {
            type: "wx_normalbtn_shareto_success",
            value: "网盘文件tab共享给微信群发送成功"
        },
        normalBtnShareToGroup: {
            type: "wx_normalbtn_shareto_group",
            value: "网盘文件tab共享给微信群"
        },
        normalBtnShareToSingle: {
            type: "wx_normalbtn_shareto_single",
            value: "网盘文件tab共享给个人"
        },
        normalBtnShareToCreate: {
            type: "wx_normalbtn_shareto_create",
            value: "网盘文件tab共享给微信群无目录创建成功"
        },
        normalBtnShareToCopy: {
            type: "wx_normalbtn_shareto_copy",
            value: "网盘文件tab共享给微信群有目录复制成功"
        },
        visitnormalDir: {
            type: "wx_visit_normaldir",
            value: "网盘文件tab进入文件夹"
        },
        normalDirDetailShare: {
            type: "wx_normaldir_detailshare",
            value: "网盘文件tab文件夹详情右上角分享"
        },
        normalDirDetailShareToClick: {
            type: "wx_normaldir_detailshareto_click",
            value: "网盘文件tab文件夹详情点击+号共享次数"
        },
        normalDirDetailShareToSuccess: {
            type: "wx_normaldir_detailshareto_success",
            value: "网盘文件tab文件夹详情点击+号共享发送成功"
        },
        normalDirDetailShareToGroup: {
            type: "wx_normaldir_detailshareto_group",
            value: "网盘文件tab文件夹详情点击+号共享发到微信群"
        },
        normalDirDetailShareToSingle: {
            type: "wx_normaldir_detailshareto_single",
            value: "网盘文件tab文件夹详情点击+号共享发到个人"
        },
        normalDirDetailShareToCreateSuccess: {
            type: "wx_normaldir_detailshareto_createsuccess",
            value: "网盘文件tab文件夹详情点击+号共享无目录创建成功"
        },
        normalDirDetailShareToCopySuccess: {
            type: "wx_normaldir_detailshareto_copysuccess",
            value: "网盘文件tab文件夹详情点击+号共享有目录复制成功"
        },
        normalDirDetailAddFileBtnClick: {
            type: "wx_normaldirdetail_addfilebtn_click",
            value: "网盘文件tab文件夹详情添加文件按钮点击数"
        },
        normalDirDetailAddFileCloundupload: {
            type: "wx_normaldirdetail_addfile_cloundupload",
            value: "网盘文件tab文件夹详情网盘文件上传"
        },
        normalDirDetailAddFileLocalupload: {
            type: "wx_normaldirdetail_addfile_localupload",
            value: "网盘文件tab文件夹详情本地文件上传"
        },
        normalDirDetailAddFileClounduploadSuccess: {
            type: "wx_normaldirdetail_addfile_cloundupload_success",
            value: "网盘文件tab文件夹详情网盘文件上传成功"
        },
        normalDirDetailAddFileLocaluploadSuccess: {
            type: "wx_normaldirdetail_addfile_localupload_success",
            value: "网盘文件tab文件夹详情本地文件上传成功"
        }
    },
    share: {
        modifiedShareDirName: {
            type: "wx_sharelist_modifename",
            value: "共享目录更多按钮重命名"
        },
        modifiedShareDirNameSuccess: {
            type: "wx_sharelist_modifename_success",
            value: "共享目录更多按钮重命名成功"
        },
        createNewDir: {
            type: "wx_sharedir_createnewdir",
            value: "共享目录内新建文件夹"
        },
        createNewDirSuccess: {
            type: "wx_sharedir_createnewdir_success",
            value: "共享目录内新建文件夹成功"
        },
        batch_click: {
            type: "wx_share_batch_click",
            value: "共享目录内批量管理点击次数"
        },
        batch_pickall: {
            type: "wx_share_batch_pickall",
            value: "共享目录内批量管理全选"
        },
        batch_pickall_cancel: {
            type: "wx_share_batch_pickall_cancel",
            value: "共享目录内批量管理取消全选"
        },
        batch_delete: {
            type: "wx_share_batch_delte",
            value: "共享目录内批量管理删除"
        },
        batch_rename: {
            type: "wx_share_batch_rename",
            value: "共享目录内批量管理重命名"
        },
        detaillist_rename: {
            type: "wx_share_detaillist_rename",
            value: "共享目录内更多点击重命名"
        },
        setshare_rename: {
            type: "wx_share_setshare_rename",
            value: "共享目录内设置共享重命名"
        },
        longtab_batch: {
            type: "wx_share_longtab_batch",
            value: "共享目录长按批量管理"
        },
        createShareCancelname: {
            type: "wx_createshare_cancelname",
            value: "创建共享重命名取消操作"
        },
        createShareDefaultname: {
            type: "wx_createshare_defaultname",
            value: "默认文件名创建共享"
        },
        createShareChangename: {
            type: "wx_createshare_changename",
            value: "修改文件名创建共享"
        },
        joinShareSuccess: {
            type: "wx_joinshare_success",
            value: "加入共享成功"
        },
        joinSharefromTmplmsg: {
            type: "wx_joinshare_fromtmplmsg",
            value: "服务通知进入共享文件夹"
        },
        joinNormalToShare: {
            type: "wx_joinnormaltoshare",
            value: "加入普通文件夹转换共享目录"
        },
        shareToGroup: {
            type: "wx_sharetogroup",
            value: "共享tab共享到群"
        },
        shareToSingle: {
            type: "wx_sharetosingle",
            value: "共享tab共享到个人"
        },
        createShareToGroup: {
            type: "wx_createsharetogroup",
            value: "共享tab创建共享到群"
        },
        createShareToSingle: {
            type: "wx_createsharetosingle",
            value: "共享tab创建共享到个人"
        },
        createShareCancleSend: {
            type: "wx_createshare_canclesend",
            value: "共享tab创建共享临时会话返回操作"
        },
        joinSurlShare: {
            type: "wx_joinsurlshare",
            value: "通过app短链加入共享"
        },
        joinNormalShareSuccess: {
            type: "wx_joinnormalshare_success",
            value: "加入普通群共享成功"
        },
        joinWxShareSuccess: {
            type: "wx_joinwxshare_success",
            value: "加入微信群共享成功"
        },
        shareBtnMoreClick: {
            type: "wx_sharebtn_more_click",
            value: "共享文件tab文件更多按钮点击数"
        },
        shareBtnAddMemberClick: {
            type: "wx_sharebtn_addmember_click",
            value: "共享文件tab添加共享成员按钮点击数"
        },
        shareAddMemberSendSucess: {
            type: "wx_shareaddmember_sendsuccess",
            value: "共享文件tab添加共享成员发送成功数"
        },
        createShareBtnClick: {
            type: "wx_createsharebtn_click",
            value: "创建群共享按钮点击次数"
        },
        createShareSuccess: {
            type: "wx_createshare_success",
            value: "群内无目录创建共享成功"
        },
        createShareJoinSuccess: {
            type: "wx_createsharejoin_success",
            value: "群内有目录加入共享成功"
        },
        visitShareDir: {
            type: "wx_share_visitsharedir",
            value: "共享文件tab进入共享文件夹"
        },
        shareDirDetailShareClick: {
            type: "wx_sharedirdetail_share_click",
            value: "群共享详情右上角转发"
        },
        shareDirDetailAddMemberClick: {
            type: "wx_sharedirdetail_addmember_click",
            value: "点击+号添加共享成员点击数"
        },
        shareDirDetailAddMemberToGroup: {
            type: "wx_sharedirdetail_addmember_togroup",
            value: "点击+号添加共享成员到微信群"
        },
        shareDirDetailAddMemberToSingle: {
            type: "wx_sharedirdetail_addmember_tosingle",
            value: "点击+号添加共享成员到个人"
        },
        shareDirDetailAddMemberSuccess: {
            type: "wx_sharedirdetail_addmember_success",
            value: "点击+号添加共享成员发送成功数"
        },
        shareDirDetailAddMemberCreateSuccess: {
            type: "wx_sharedirdetail_addmember_createsuccess",
            value: "点击+号添加共享成员无目录创建共享成功"
        },
        shareDirDetailAddMemberJoinSuccess: {
            type: "wx_sharedirdetail_addmember_joinsuccess",
            value: "点击+号添加共享成员有目录加入共享成功"
        },
        shareDetailAddFileBtn: {
            type: "wx_sharedetail_addfilebtn_click",
            value: "共享文件夹详情添加文件按钮"
        },
        shareDetailAddFileClounduploadBtn: {
            type: "wx_sharedetail_cloundupload",
            value: "共享文件夹详情网盘文件上传"
        },
        shareDetailAddFileLocaluploadBtn: {
            type: "wx_sharedetail_localupload",
            value: "共享文件夹详情本地上传"
        },
        shareDetailAddFileClounduploadSuccess: {
            type: "wx_sharedetail_cloundupload_success",
            value: "共享文件夹详情网盘文件上传成功"
        },
        shareDetailAddFileLocaluploadSuccess: {
            type: "wx_sharedetail_localupload_success",
            value: "共享文件夹详情本地上传成功"
        },
        shareDetailSettingBtn: {
            type: "wx_sharedetail_settingbtn_click",
            value: "共享文件夹详情设置共享点击"
        },
        shareDetailSettingAddMemberClick: {
            type: "wx_sharedetailsetting_addmember_click",
            value: "共享设置页添加成员+号点击数"
        },
        shareDetailSettingAddMemberSuccess: {
            type: "wx_sharedetailsetting_addmember_success",
            value: "共享设置页添加成员+号发送成功"
        },
        shareDetailSettingAddMemberToGroup: {
            type: "wx_sharedetailsetting_addmember_togroup",
            value: "共享设置页添加成员+号发到微信群"
        },
        shareDetailSettingAddMemberToSingle: {
            type: "wx_sharedetailsetting_addmember_tosingle",
            value: "共享设置页添加成员+号发到个人"
        },
        shareDetailSettingAddMemberCreateSuccess: {
            type: "wx_sharedetailsetting_addmember_createsuccess",
            value: "共享设置页添加成员+号无目录创建成功"
        },
        shareDetailSettingAddMemberJoinSuccess: {
            type: "wx_sharedetailsetting_addmember_joinsuccess",
            value: "共享设置页添加成员+号有目录加入成功"
        }
    },
    common: {
        discover1001: {
            type: "wx_discover_1001",
            value: "发现栏打开小程序"
        },
        singleChat1007: {
            type: "wx_singlechat_1007",
            value: "单人聊天会话打开小程序卡片"
        },
        groupChat1008: {
            type: "wx_groupchat_1008",
            value: "群聊会话打开小程序卡片"
        },
        scanCode1011: {
            type: "wx_scancode_1011",
            value: "扫描二维码进入小程序"
        },
        pressImgCode1012: {
            type: "wx_pressimgcode_1012",
            value: "长按图片识别二维码"
        },
        albumCode1013: {
            type: "wx_albumcode_1013",
            value: "手机相册选取二维码"
        },
        tmplmsg1014: {
            type: "wx_tmplmsg_1014",
            value: "模板消息打开小程序"
        },
        withshareTicket1044: {
            type: "wx_shareTicket_1044",
            value: "带shareTicket的小程序消息卡片"
        },
        wechatmain1089: {
            type: "wx_wechatmain_1089",
            value: "微信聊天主界面下拉"
        }
    },
    author: {
        userInfoFirstSuccess: {
            type: "wx_userinfo_first_success",
            value: "进入小程序立即授权成功"
        },
        userInfoSetSuccess: {
            type: "wx_userinfo_set_success",
            value: "进入小程序设置授权成功总数"
        }
    },
    snapshoot: {
        joinShareFromSnapshoot: {
            type: "wx_joinshare_fromsnapshoot",
            value: "中间页卡片加入用户数"
        },
        joinShareFromSnapshootimage: {
            type: "wx_joinshare_fromsnapshoot_image",
            value: "中间页图片类型加入用户数"
        },
        joinShareFromSnapshootvideo: {
            type: "wx_joinshare_fromsnapshoot_video",
            value: "中间页视频类型加入用户数"
        },
        joinShareFromSnapshootempty: {
            type: "wx_joinshare_fromsnapshoot_empty",
            value: "中间页空文件夹加入用户数"
        },
        joinShareFromSnapshootsingle: {
            type: "wx_joinshare_fromsnapshoot_single",
            value: "中间页单文件加入用户数"
        },
        joinShareFromSnapshootmore: {
            type: "wx_joinshare_fromsnapshoot_more",
            value: "中间页多文件列表加入用户数"
        },
        snapshootclick: {
            type: "wx_snapshootclick",
            value: "中间页共享点击数"
        },
        snapshootvideo: {
            type: "wx_snapshootvideo",
            value: "视频中间页生成"
        },
        snapshootimage: {
            type: "wx_snapshootimage",
            value: "图片中间页生成"
        },
        snapshootmore: {
            type: "wx_snapshootmore",
            value: "多文件中间页生成"
        },
        snapshootsingle: {
            type: "wx_snapshootsingle",
            value: "单文件中间页生成"
        },
        snapshootempty: {
            type: "wx_snapshootempty",
            value: "空文件中间页生成"
        },
        snapshootSendvideo: {
            type: "wx_snapshootsend_video",
            value: "视频中间页发送"
        },
        snapshootSendimage: {
            type: "wx_snapshootsend_image",
            value: "图片中间页发送"
        },
        snapshootSendmore: {
            type: "wx_snapshootsend_more",
            value: "多文件中间页发送"
        },
        snapshootSendsingle: {
            type: "wx_snapshootsend_single",
            value: "单文件中间页发送"
        },
        snapshootSendempty: {
            type: "wx_snapshootsend_empty",
            value: "空文件中间页发送"
        },
        snapshootSendSuccessvideo: {
            type: "wx_snapshootsendsuccess_video",
            value: "视频中间页发送成功"
        },
        snapshootSendSuccessimage: {
            type: "wx_snapshootsendsuccess_image",
            value: "图片中间页发送成功"
        },
        snapshootSendSuccessmore: {
            type: "wx_snapshootsendsuccess_more",
            value: "多文件中间页发送成功"
        },
        snapshootSendSuccesssingle: {
            type: "wx_snapshootsendsuccess_single",
            value: "单文件中间页发送成功"
        },
        snapshootSendSuccessempty: {
            type: "wx_snapshootsendsuccess_empty",
            value: "空文件中间页发送成功"
        }
    }
}, t = wx.log = {
    register: function(a) {
        Object.keys(a).forEach(function(s) {
            var r = a[s], l = t[s] = {};
            Object.keys(r).forEach(function(a) {
                l[a] = {
                    send: function() {
                        (0, e.reportAction)(r[a]);
                    }
                };
            });
        });
    },
    send: function(a) {
        return (0, e.reportAction)(a);
    }
};

t.register(a);