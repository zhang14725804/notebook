module.exports = {
    pathHandlers: function(e, r, a, o) {
        if (!a.from || "sharelist" !== a.from && "filelist" !== a.from) !a.from || "creategroup" !== a.from && "sharetoweixingroup" !== a.from ? a.from && "sharecommonaddmember" === a.from || "sharedircommonaddmember" === a.from || "setsharecommonaddmember" === a.from ? (r.joinSharedir({
            uk: a.uk,
            fid: a.fid
        }), wx.log.share.joinNormalShareSuccess.send()) : "tmplmsg" === a.from ? (r.getDirDetail({
            uk: a.uk,
            fid: a.fid
        }), wx.log.share.joinSharefromTmplmsg.send()) : a.surl ? (wx.log.share.joinSurlShare.send(), 
        r.handleSurl(a.surl)) : wx.redirectTo({
            url: "/pages/netdisk_index/index"
        }) : (e.globalData.appOnshowData, a.from && "sharetoweixingroup" === a.from && (wx.log.snapshoot.joinShareFromSnapshoot.send(), 
        a.mod && wx.log.snapshoot["joinShareFromSnapshoot" + a.mod].send()), r.joinSharedir({
            uk: a.uk,
            fid: a.fid
        })); else {
            var i = e.globalData.shareDirData.currentDirData, m = i.isRoot, s = i.publicMeta, t = i.dirMeta;
            r.setData({
                sharedirData: {
                    isRoot: m,
                    dirMeta: t,
                    memberNum: s.memberNum,
                    avator: s.avator,
                    uname: s.uname,
                    fileName: t.server_filename,
                    updateTime: t.server_mtime,
                    path: t.path
                }
            }), o.fileListInit(e, r, "sharedir"), o.getFileListData(e, r, t.path);
        }
    }
};