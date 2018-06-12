Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    leadToHome: function() {
        wx.switchTab({
            url: "/pages/home/home"
        }), this.clickPingback({
            block: "wx_block_player_home",
            rseat: "wx_player_home"
        });
    },
    currentPage: function() {
        return getCurrentPages().length;
    }
};