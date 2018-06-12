module.exports = function(e, r, s) {
    if (e) switch (s) {
      case 4:
        return "由于平台限制，请在腾讯视频客户端用券观看";

      case 7:
        return "由于平台限制，请在腾讯视频客户端购买观看";
    } else if (r) switch (s) {
      case 5:
      case 6:
        return "VIP会员可免费观看";

      case 4:
        return "由于平台限制，请开通会员后在腾讯视频客户端用券观看";

      case 7:
        return "由于平台限制，请开通会员后在腾讯视频客户端购买观看";
    } else switch (s) {
      case 5:
      case 6:
        return "由于平台限制，请在腾讯视频客户端开通会员观看";

      case 4:
        return "由于平台限制，请在腾讯视频客户端开通会员用券观看";

      case 7:
        return "由于平台限制，请在腾讯视频客户端开通会员购买观看";
    }
};